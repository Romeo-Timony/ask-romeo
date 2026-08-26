import { Client } from 'ssh2';
import { readFileSync } from 'node:fs';

const VPS_HOST = '91.132.196.202';
const VPS_USER = 'root';
const VPS_PASS = 'DaNiAn-13';
const REMOTE_DIR = '/root/ask-romeo';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = 'gpt-5.6-terra';

const FILES_TO_SYNC = [
  'docs/rag/romeo-answer-guidance-en.md',
  'docs/rag/romeo-answer-guidance-ru.md',
  'docs/rag/romeo-past-work-experience-en.md',
  'docs/rag/romeo-past-work-experience-ru.md',
  'docs/QA_техническое_описание_проекта.md',
  'src/app/api/chat/route.ts',
  'src/app/api/chat/static-fallback.ts',
  'src/data/resume-project-skills.ts',
  'src/lib/ai/providers.ts',
  'src/lib/chat/conversation-intent.ts',
  'src/lib/rag/markdown-source.ts',
  'scripts/run-105-live-test.mjs',
  'scripts/interview_105_results.json',
];

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

function uploadFile(sftp, localRelPath) {
  return new Promise((resolve, reject) => {
    const remotePath = `${REMOTE_DIR}/${localRelPath}`.replace(/\\/g, '/');
    const localContent = readFileSync(localRelPath);

    sftp.writeFile(remotePath, localContent, (err) => {
      if (err) {
        console.error(`Failed to upload ${localRelPath}:`, err);
        return reject(err);
      }
      console.log(`✓ Uploaded: ${localRelPath} -> ${remotePath}`);
      resolve();
    });
  });
}

async function runDeploy() {
  console.log(`Connecting to ${VPS_USER}@${VPS_HOST}...`);

  conn.on('ready', async () => {
    console.log('SSH Connection established successfully!\n');

    try {
      // 1. Ensure remote directories exist
      console.log('Ensuring remote directories exist...');
      await executeCommand(`mkdir -p ${REMOTE_DIR}/docs/rag ${REMOTE_DIR}/src/app/api/chat ${REMOTE_DIR}/src/data ${REMOTE_DIR}/src/lib/ai ${REMOTE_DIR}/src/lib/chat ${REMOTE_DIR}/src/lib/rag ${REMOTE_DIR}/scripts`);

      // 2. Upload changed files via SFTP
      console.log('\n--- Uploading changed files to VPS ---');
      await new Promise((resolve, reject) => {
        conn.sftp(async (err, sftp) => {
          if (err) return reject(err);
          try {
            for (const f of FILES_TO_SYNC) {
              await uploadFile(sftp, f);
            }
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

      // 5. Wait for containers to start
      console.log('\n--- Checking running containers ---');
      await executeCommand(`docker ps --filter "name=ask-romeo"`);

      // 6. Run RAG import script inside container
      console.log('\n--- Importing updated RAG Knowledge Base ---');
      await executeCommand(`cd ${REMOTE_DIR} && bash scratch/import-rag.sh`);

      // 7. Test health check on production
      console.log('\n--- Verifying production site HTTP status ---');
      await executeCommand(`curl -I -s http://localhost:80`);

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
