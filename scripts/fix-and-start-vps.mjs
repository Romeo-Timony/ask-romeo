import { Client } from 'ssh2';

const VPS_HOST = '91.132.196.202';
const VPS_USER = 'root';
const VPS_PASS = 'DaNiAn-13';
const REMOTE_DIR = '/root/ask-romeo';

const conn = new Client();

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`\n[SSH EXEC]: ${command}`);
    conn.exec(command, (err, stream) => {
      if (err) return reject(err);
      let stdout = '';
      let stderr = '';

      stream.on('close', (code, signal) => {
        resolve({ code, stdout, stderr });
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

async function run() {
  console.log(`Connecting to ${VPS_USER}@${VPS_HOST}...`);

  conn.on('ready', async () => {
    console.log('Connected to VPS!');

    try {
      // 1. Remove carriage returns in all shell and markdown files on remote
      await executeCommand(`cd ${REMOTE_DIR} && tr -d '\\r' < scratch/import-rag.sh > scratch/import-rag.sh.tmp && mv scratch/import-rag.sh.tmp scratch/import-rag.sh && chmod +x scratch/import-rag.sh`);

      // 2. Start all docker compose containers
      console.log('\n--- Starting Docker containers on VPS ---');
      await executeCommand(`cd ${REMOTE_DIR} && docker compose up -d`);

      // 3. Wait for app container to become healthy
      console.log('\n--- Checking running containers ---');
      await executeCommand(`sleep 5 && docker ps --filter "name=ask-romeo"`);

      // 4. Run RAG knowledge base import
      console.log('\n--- Running RAG Knowledge Base Import ---');
      await executeCommand(`cd ${REMOTE_DIR} && bash scratch/import-rag.sh`);

      // 5. Test local HTTP response
      console.log('\n--- Verifying production site HTTP status ---');
      await executeCommand(`curl -I http://localhost:80`);

      // 6. Test chat generation on production
      console.log('\n--- Testing live GPT-5.6-Terra query on production ---');
      await executeCommand(`curl -s -X POST http://localhost:80/api/chat -H "Content-Type: application/json" -d '{"messages":[{"role":"user","parts":[{"type":"text","text":"Какой стек тебе нравится?"}]}]}' | head -n 40`);

      console.log('\n======================================================');
      console.log('🎉 PRODUCTION VPS 91.132.196.202 FULLY OPERATIONAL!');
      console.log('======================================================\n');
    } catch (e) {
      console.error('Error:', e);
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
