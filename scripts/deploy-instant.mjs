import { Client } from 'ssh2';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const VPS_HOST = '91.132.196.202';
const VPS_USER = 'root';
const VPS_PASS = 'DaNiAn-13';
const REMOTE_DIR = '/root/ask-romeo';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = 'gpt-5.6-terra';

console.log('1. Packing local .next and docs into deploy-bundle.tar.gz...');
execSync('tar -czf deploy-bundle.tar.gz .next docs scripts scratch', { stdio: 'inherit' });

const conn = new Client();

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`\n[SSH EXEC]: ${command}`);
    conn.exec(command, (err, stream) => {
      if (err) return reject(err);
      let stdout = '';
      let stderr = '';

      stream.on('close', (code, signal) => {
        if (code !== 0) {
          console.error(`[SSH ERROR CODE ${code}]: ${stderr}`);
          resolve({ code, stdout, stderr });
        } else {
          resolve({ code: 0, stdout, stderr });
        }
      });

      stream.on('data', (data) => {
        process.stdout.write(data.toString());
        stdout += data.toString();
      });

      stream.stderr.on('data', (data) => {
        process.stderr.write(data.toString());
        stderr += data.toString();
      });
    });
  });
}

function uploadBundle(sftp) {
  return new Promise((resolve, reject) => {
    const remotePath = `${REMOTE_DIR}/deploy-bundle.tar.gz`;
    const localContent = readFileSync('deploy-bundle.tar.gz');

    console.log(`Uploading deploy-bundle.tar.gz (${(localContent.length / 1024 / 1024).toFixed(2)} MB)...`);
    sftp.writeFile(remotePath, localContent, (err) => {
      if (err) return reject(err);
      console.log('✓ Upload complete!');
      resolve();
    });
  });
}

async function run() {
  console.log(`Connecting to ${VPS_USER}@${VPS_HOST}...`);

  conn.on('ready', async () => {
    console.log('SSH Connection ready!\n');

    try {
      // 1. Upload bundle via SFTP
      await new Promise((resolve, reject) => {
        conn.sftp(async (err, sftp) => {
          if (err) return reject(err);
          try {
            await uploadBundle(sftp);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });

      // 2. Extract bundle on remote server
      console.log('\n--- Extracting bundle on VPS ---');
      await executeCommand(`cd ${REMOTE_DIR} && tar -xzf deploy-bundle.tar.gz`);

      // 3. Update .env.production
      console.log('\n--- Updating .env.production on VPS ---');
      await executeCommand(`
cat << 'EOF' > ${REMOTE_DIR}/.env.production
GITHUB_TOKEN=
OPENAI_API_KEY=${OPENAI_API_KEY}
OPENAI_MODEL=${OPENAI_MODEL}
NEXT_PUBLIC_APP_URL=http://91.132.196.202
NEXT_PUBLIC_ASKOOSU_DEBUG_UI_ENABLED=false
ASKOOSU_AI_PROVIDER=openai
DATABASE_URL=postgresql://ask_romeo:ask_romeo_password@ask-romeo-postgres:5432/ask_romeo
EOF
`);

      // 4. Copy updated build and files into container and restart
      console.log('\n--- Updating container assets and restarting ---');
      await executeCommand(`
docker cp ${REMOTE_DIR}/.next ask-romeo-app:/app/ && \
docker cp ${REMOTE_DIR}/docs ask-romeo-app:/app/ && \
docker cp ${REMOTE_DIR}/.env.production ask-romeo-app:/app/.env.production && \
docker exec -u root ask-romeo-app chown -R nextjs:nodejs /app/.next /app/docs && \
docker restart ask-romeo-app
`);

      // 5. Run RAG knowledge base import
      console.log('\n--- Importing RAG Knowledge Base in Database ---');
      await executeCommand(`cd ${REMOTE_DIR} && bash scratch/import-rag.sh`);

      // 6. Verify HTTP health
      console.log('\n--- Verifying production site HTTP status ---');
      await executeCommand(`curl -I -s http://localhost:80 || curl -I -s http://localhost:3000`);

      console.log('\n======================================================');
      console.log('🚀 INSTANT PRODUCTION DEPLOYMENT FINISHED ON VPS 91.132.196.202!');
      console.log(`Live site: http://91.132.196.202`);
      console.log(`Model: ${OPENAI_MODEL}`);
      console.log('======================================================\n');
    } catch (e) {
      console.error('Error during deployment:', e);
    } finally {
      conn.end();
    }
  });

  conn.connect({
    host: VPS_HOST,
    port: 22,
    username: VPS_USER,
    password: VPS_PASS,
  });
}

run();
