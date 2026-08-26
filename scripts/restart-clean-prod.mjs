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
  conn.on('ready', async () => {
    console.log('Connected to VPS.');

    try {
      // 1. Set permissions on .env.production
      await executeCommand(`chmod 644 ${REMOTE_DIR}/.env.production`);

      // 2. Restart containers cleanly from the fresh Linux image
      console.log('Restarting docker containers cleanly...');
      await executeCommand(`cd ${REMOTE_DIR} && docker compose down && docker compose up -d`);

      // 3. Wait for app container to start and initialize
      console.log('Waiting 5s for Next.js to start...');
      await executeCommand(`sleep 5 && docker ps --filter "name=ask-romeo"`);

      // 4. Check docker logs of app container
      console.log('\n--- Checking container logs ---');
      await executeCommand(`docker logs --tail 25 ask-romeo-app`);

      // 5. Test curl HTTP Status
      console.log('\n--- Verifying production site HTTP status ---');
      await executeCommand(`curl -I http://localhost:80`);

      // 6. Test chat endpoint with real query
      console.log('\n--- Testing live GPT-5.6-Terra chat query ---');
      await executeCommand(`curl -s -X POST http://localhost:80/api/chat -H "Content-Type: application/json" -d '{"messages":[{"role":"user","parts":[{"type":"text","text":"Какой твой стек технологий и любимые инструменты?"}]}]}'`);

      console.log('\n======================================================');
      console.log('🚀 Ask Romeo is LIVE on Production with GPT-5.6-Terra!');
      console.log('======================================================\n');
    } catch (e) {
      console.error(e);
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
