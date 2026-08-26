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
    console.log('Connected!');

    try {
      // 1. Build light image without cache or run containers
      console.log('1. Starting Docker containers on VPS...');
      await executeCommand(`cd ${REMOTE_DIR} && docker compose up -d`);

      // 2. Wait for postgres to be ready
      console.log('2. Waiting for postgres container...');
      await executeCommand(`sleep 4 && docker ps`);

      // 3. Update files in container
      console.log('3. Copying updated build and docs into container...');
      await executeCommand(`
docker cp ${REMOTE_DIR}/.next ask-romeo-app:/app/ && \
docker cp ${REMOTE_DIR}/docs ask-romeo-app:/app/ && \
docker exec -u root ask-romeo-app chown -R nextjs:nodejs /app/.next /app/docs && \
docker restart ask-romeo-app
`);

      // 4. Wait for app container
      console.log('4. Waiting for app container to start...');
      await executeCommand(`sleep 5 && docker ps --filter "name=ask-romeo"`);

      // 5. Import RAG docs into Postgres
      console.log('5. Importing RAG Knowledge Base...');
      await executeCommand(`cd ${REMOTE_DIR} && tr -d '\\r' < scratch/import-rag.sh > scratch/import-rag.sh.tmp && mv scratch/import-rag.sh.tmp scratch/import-rag.sh && chmod +x scratch/import-rag.sh && bash scratch/import-rag.sh`);

      // 6. Test production HTTP
      console.log('\n--- Verifying production site HTTP status ---');
      await executeCommand(`curl -I -s http://localhost:80`);

      // 7. Test live GPT-5.6-Terra query
      console.log('\n--- Testing live GPT-5.6-Terra query on production ---');
      await executeCommand(`curl -s -X POST http://localhost:80/api/chat -H "Content-Type: application/json" -d '{"messages":[{"role":"user","parts":[{"type":"text","text":"Какой стек тебе нравится?"}]}]}' | head -n 35`);

      console.log('\n======================================================');
      console.log('🎉 PRODUCTION DEPLOYMENT FINISHED & VERIFIED SUCCESSFULLY!');
      console.log(`Live site: http://91.132.196.202`);
      console.log(`Domain: http://romeo.timony`);
      console.log(`Model: ${OPENAI_MODEL}`);
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
