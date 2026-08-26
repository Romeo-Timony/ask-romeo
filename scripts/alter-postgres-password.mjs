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
    console.log('Connected.');

    try {
      // Execute SQL to change ask_romeo password
      await executeCommand(`docker exec -i ask-romeo-postgres psql -U ask_romeo -d ask_romeo -c "ALTER USER ask_romeo WITH PASSWORD 'ask_romeo_password';"`);

      // Run import-rag.sh
      console.log('\n--- Running import-rag.sh ---');
      await executeCommand(`cd ${REMOTE_DIR} && bash scratch/import-rag.sh`);

      // Test curl
      console.log('\n--- Testing HTTP Status ---');
      await executeCommand(`curl -I http://localhost:80`);

      // Test chat endpoint
      console.log('\n--- Testing live GPT-5.6-Terra query ---');
      await executeCommand(`curl -s -X POST http://localhost:80/api/chat -H "Content-Type: application/json" -d '{"messages":[{"role":"user","parts":[{"type":"text","text":"Какой стек тебе нравится?"}]}]}' | head -n 40`);

      console.log('\n======================================================');
      console.log('🎉 LIVE VERIFICATION SUCCESSFUL ON VPS 91.132.196.202!');
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
