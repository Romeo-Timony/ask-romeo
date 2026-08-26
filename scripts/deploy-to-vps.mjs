import { Client } from 'ssh2';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

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

function sftpUploadDir(sftp, localDir, remoteDir) {
  return new Promise((resolve, reject) => {
    const items = readdirSync(localDir);

    function processNext(index) {
      if (index >= items.length) return resolve();
      const item = items[index];
      if (item === 'node_modules' || item === '.next' || item === '.git' || item === '.pnpm-store') {
        return processNext(index + 1);
      }

      const localPath = path.join(localDir, item);
      const remotePath = `${remoteDir}/${item}`.replace(/\\/g, '/');
      const stats = statSync(localPath);

      if (stats.isDirectory()) {
        sftp.mkdir(remotePath, (err) => {
          // ignore error if exists
          sftpUploadDir(sftp, localPath, remotePath)
            .then(() => processNext(index + 1))
            .catch(reject);
        });
      } else {
        sftp.fastPut(localPath, remotePath, (err) => {
          if (err) {
            console.error(`Error uploading ${localPath} -> ${remotePath}:`, err);
          } else {
            // uploaded
          }
          processNext(index + 1);
        });
      }
    }

    processNext(0);
  });
}

async function runDeploy() {
  console.log(`Connecting to ${VPS_USER}@${VPS_HOST}...`);

  conn.on('ready', async () => {
    console.log('SSH Connection established successfully!\n');

    try {
      // 1. Check existing remote directory
      const checkDir = await executeCommand(`mkdir -p ${REMOTE_DIR} && ls -la ${REMOTE_DIR}`);
      
      // 2. Upload files via SFTP
      console.log('\n--- Syncing project files to VPS via SFTP ---');
      await new Promise((resolve, reject) => {
        conn.sftp(async (err, sftp) => {
          if (err) return reject(err);
          try {
            await sftpUploadDir(sftp, process.cwd(), REMOTE_DIR);
            console.log('SFTP sync finished successfully!');
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });

      // 3. Configure .env.production on remote server
      console.log('\n--- Configuring .env.production on VPS ---');
      const configureEnvCmd = `
cat << 'EOF' > ${REMOTE_DIR}/.env.production
GITHUB_TOKEN=
OPENAI_API_KEY=${OPENAI_API_KEY}
OPENAI_MODEL=${OPENAI_MODEL}
NEXT_PUBLIC_APP_URL=http://91.132.196.202
NEXT_PUBLIC_ASKOOSU_DEBUG_UI_ENABLED=false
ASKOOSU_AI_PROVIDER=openai
DATABASE_URL=postgresql://ask_romeo:ask_romeo_password@ask-romeo-postgres:5432/ask_romeo
EOF
`;
      await executeCommand(configureEnvCmd);

      // 4. Rebuild and restart Docker containers
      console.log('\n--- Rebuilding and restarting Docker containers ---');
      await executeCommand(`cd ${REMOTE_DIR} && docker compose up -d --build`);

      // 5. Wait for containers to become healthy
      console.log('\n--- Waiting for app container to start ---');
      await executeCommand(`sleep 5 && docker ps --filter "name=ask-romeo"`);

      // 6. Run RAG import script inside container
      console.log('\n--- Importing updated RAG Knowledge Base ---');
      if (readFileSync('scratch/import-rag.sh')) {
        await executeCommand(`cd ${REMOTE_DIR} && bash scratch/import-rag.sh`);
      }

      // 7. Verify health check on production
      console.log('\n--- Verifying production site HTTP status ---');
      await executeCommand(`curl -I -s http://localhost:80 || curl -I -s http://localhost:3000`);

      console.log('\n======================================================');
      console.log('🚀 DEPLOYMENT COMPLETED SUCCESSFULLY ON VPS 91.132.196.202!');
      console.log(`Live site: http://91.132.196.202`);
      console.log(`Model: ${OPENAI_MODEL}`);
      console.log('======================================================\n');
    } catch (e) {
      console.error('Deployment error:', e);
    } finally {
      conn.end();
    }
  });

  conn.on('error', (err) => {
    console.error('SSH Connection error:', err);
  });

  conn.connect({
    host: VPS_HOST,
    port: 22,
    username: VPS_USER,
    password: VPS_PASS,
  });
}

runDeploy();
