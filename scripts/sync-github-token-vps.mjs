import { Client } from 'ssh2';
import { readFileSync } from 'node:fs';

const VPS_HOST = '91.132.196.202';
const VPS_USER = 'root';
const VPS_PASS = 'DaNiAn-13';
const REMOTE_DIR = '/root/ask-romeo';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
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
      // 1. Update .env.production on VPS
      console.log('1. Updating .env.production with GITHUB_TOKEN...');
      await executeCommand(`
cat << 'EOF' > ${REMOTE_DIR}/.env.production
GITHUB_TOKEN=${GITHUB_TOKEN}
OPENAI_API_KEY=${OPENAI_API_KEY}
OPENAI_MODEL=${OPENAI_MODEL}
NEXT_PUBLIC_APP_URL=http://91.132.196.202
NEXT_PUBLIC_ASKOOSU_DEBUG_UI_ENABLED=false
ASKOOSU_AI_PROVIDER=openai
ASKROMEO_RAG_STORE=postgres
ASKOOSU_RATE_LIMIT_STORE=postgres
ASKOOSU_RAG_AUTO_SYNC=false
ASKOOSU_FAQ_SEMANTIC_ROUTER_ENABLED=false
POSTGRES_USER=ask_romeo
POSTGRES_PASSWORD=ask_romeo_password
POSTGRES_DB=ask_romeo
DATABASE_URL=postgresql://ask_romeo:ask_romeo_password@postgres:5432/ask_romeo
EOF
chmod 644 ${REMOTE_DIR}/.env.production
`);

      // 2. Restart container to pick up GITHUB_TOKEN
      console.log('2. Restarting ask-romeo-app container...');
      await executeCommand(`docker restart ask-romeo-app && sleep 3`);

      // 3. Test GitHub Stars endpoint on VPS
      console.log('3. Testing /api/github-stars...');
      await executeCommand(`curl -s http://localhost:80/api/github-stars`);

      console.log('\n--- Finished Syncing GitHub Token ---');
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
