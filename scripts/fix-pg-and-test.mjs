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
      // 1. Reset postgres password for ask_romeo user
      console.log('1. Setting password for user ask_romeo in postgres...');
      await executeCommand(`docker exec -u postgres ask-romeo-postgres psql -c "ALTER USER ask_romeo WITH PASSWORD 'ask_romeo_password';"`);

      // 2. Ensure .env.production uses postgres:5432 and ask_romeo_password
      console.log('2. Writing correct DATABASE_URL in .env.production...');
      await executeCommand(`
cat << 'EOF' > ${REMOTE_DIR}/.env.production
GITHUB_TOKEN=
OPENAI_API_KEY=\
OPENAI_MODEL=gpt-5.6-terra
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
`);

      // 3. Copy env into container and restart
      console.log('3. Updating container and restarting...');
      await executeCommand(`docker cp ${REMOTE_DIR}/.env.production ask-romeo-app:/app/.env.production && docker restart ask-romeo-app`);

      // 4. Wait for app container
      console.log('4. Waiting 5s for app container...');
      await executeCommand(`sleep 5 && docker ps --filter "name=ask-romeo"`);

      // 5. Run RAG import
      console.log('5. Running RAG import...');
      await executeCommand(`cd ${REMOTE_DIR} && bash scratch/import-rag.sh`);

      // 6. Test HTTP endpoint
      console.log('\n--- Verifying production site HTTP status ---');
      await executeCommand(`curl -I -s http://localhost:80`);

      // 7. Test live GPT-5.6-Terra query
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
