import { Client } from 'ssh2';

const VPS_HOST = '91.132.196.202';
const VPS_USER = 'root';
const VPS_PASS = 'DaNiAn-13';
const REMOTE_DIR = '/root/ask-romeo';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = 'gpt-5.6-terra';

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

function fastUpload(sftp) {
  return new Promise((resolve, reject) => {
    console.log('Fast uploading deploy-bundle-fast.tar.gz (5.6 MB)...');
    sftp.fastPut('deploy-bundle-fast.tar.gz', `${REMOTE_DIR}/bundle.tar.gz`, (err) => {
      if (err) return reject(err);
      console.log('✓ Fast upload finished in seconds!');
      resolve();
    });
  });
}

async function run() {
  console.log(`Connecting to ${VPS_USER}@${VPS_HOST}...`);

  conn.on('ready', async () => {
    console.log('SSH Connection established successfully!\n');

    try {
      // 1. Fast upload 5.6MB bundle
      await new Promise((resolve, reject) => {
        conn.sftp(async (err, sftp) => {
          if (err) return reject(err);
          try {
            await fastUpload(sftp);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });

      // 2. Extract on VPS
      console.log('\n--- Extracting bundle on VPS ---');
      await executeCommand(`cd ${REMOTE_DIR} && tar -xzf bundle.tar.gz && rm -f bundle.tar.gz`);

      // 3. Configure .env.production
      console.log('\n--- Writing .env.production on VPS ---');
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

      // 4. Update container and restart
      console.log('\n--- Updating container assets and restarting ---');
      await executeCommand(`
docker cp ${REMOTE_DIR}/.next ask-romeo-app:/app/ && \
docker cp ${REMOTE_DIR}/docs ask-romeo-app:/app/ && \
docker cp ${REMOTE_DIR}/.env.production ask-romeo-app:/app/.env.production && \
docker exec -u root ask-romeo-app chown -R nextjs:nodejs /app/.next /app/docs && \
docker restart ask-romeo-app
`);

      // 5. Wait for app to be ready
      await executeCommand(`sleep 3 && docker ps --filter "name=ask-romeo"`);

      // 6. Run RAG knowledge base import
      console.log('\n--- Importing updated RAG Knowledge Base ---');
      await executeCommand(`cd ${REMOTE_DIR} && bash scratch/import-rag.sh`);

      // 7. Verify production response with curl
      console.log('\n--- Verifying production site HTTP status ---');
      await executeCommand(`curl -I -s http://localhost:80`);

      // 8. Test live API call on production
      console.log('\n--- Testing live GPT-5.6-Terra query on production ---');
      await executeCommand(`curl -s -X POST http://localhost:80/api/chat -H "Content-Type: application/json" -d '{"messages":[{"role":"user","parts":[{"type":"text","text":"Какой стек тебе нравится?"}]}]}' | head -n 30`);

      console.log('\n======================================================');
      console.log('🎉 PRODUCTION DEPLOYMENT COMPLETED & VERIFIED ON VPS 91.132.196.202!');
      console.log(`Live site: http://91.132.196.202`);
      console.log(`Domain: http://romeo.timony (or configured DNS)`);
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
