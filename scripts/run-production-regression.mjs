const PROD_URL = 'http://91.132.196.202';

const ROUTES_TO_TEST = [
  { path: '/', name: 'Homepage', expectStatus: 200 },
  { path: '/about', name: 'About Page', expectStatus: 200 },
  { path: '/chat', name: 'Chat Interface', expectStatus: 200 },
  { path: '/ask', name: 'Ask Interactive', expectStatus: 200 },
  { path: '/projects', name: 'Projects Overview', expectStatus: 200 },
  { path: '/projects/ask-romeo', name: 'Project Ask Romeo', expectStatus: 200 },
  { path: '/projects/askoosu', name: 'Project Askoosu Redirect/Page', expectStatus: 200 },
  { path: '/ai-director', name: 'AI Director Page', expectStatus: 200 },
  { path: '/ai-era-developer', name: 'AI Era Developer Page', expectStatus: 200 },
  { path: '/faq/ai-competitiveness', name: 'FAQ AI Competitiveness', expectStatus: 200 },
  { path: '/privacy', name: 'Privacy Policy', expectStatus: 200 },
  { path: '/api/health', name: 'Health API', expectStatus: 200 },
  { path: '/api/github-stars', name: 'GitHub Stars API', expectStatus: 200 },
  { path: '/robots.txt', name: 'Robots.txt', expectStatus: 200 },
  { path: '/sitemap.xml', name: 'Sitemap.xml', expectStatus: 200 },
];

const CHAT_QUESTIONS_TO_TEST = [
  {
    q: 'ты умеешь писать автотесты?',
    name: 'Autotests Capabilities & Experience',
    mustIncludeAny: ['Playwright', 'Python', 'pytest'],
    mustNotInclude: ['40 штук', '40 автотестов', '/api/v3/']
  },
  {
    q: 'Какой у тебя стек и опыт в Sminex?',
    name: 'Sminex Experience & Stack',
    mustIncludeAny: ['Sminex', 'QA', 'тестирован'],
    mustNotInclude: ['/api/v3/counters']
  },
  {
    q: 'С какими базами данных ты работал?',
    name: 'Database Experience',
    mustIncludeAny: ['PostgreSQL', 'Oracle', 'SQL'],
    mustNotInclude: []
  },
  {
    q: 'Расскажи про твой опыт с AI и LLM в тестировании',
    name: 'AI/LLM Testing Competence',
    mustIncludeAny: ['AI', 'LLM', 'RAG'],
    mustNotInclude: []
  },
  {
    q: 'Как ты относишься к переработкам и дежурствам?',
    name: 'Work Philosophy & Overtime',
    mustIncludeAny: ['переработ', 'дежурств', 'релиз'],
    mustNotInclude: []
  }
];

async function runRegression() {
  console.log('===========================================================');
  console.log(`🚀 STARTING COMPLETE PRODUCTION REGRESSION ON: ${PROD_URL}`);
  console.log('===========================================================\n');

  let passed = 0;
  let failed = 0;
  const results = [];

  // 1. Test Static & Dynamic Routes
  console.log('--- 1. Testing All Web Routes & Endpoints ---');
  for (const route of ROUTES_TO_TEST) {
    const url = `${PROD_URL}${route.path}`;
    const start = Date.now();
    try {
      const res = await fetch(url, { method: 'GET' });
      const duration = Date.now() - start;
      const statusOk = res.status === route.expectStatus;
      if (statusOk) {
        console.log(`✅ [${res.status}] ${route.name.padEnd(28)} ${url} (${duration}ms)`);
        passed++;
        results.push({ name: route.name, path: route.path, status: res.status, duration, pass: true });
      } else {
        console.error(`❌ [${res.status}] ${route.name.padEnd(28)} Expected: ${route.expectStatus}, Got: ${res.status}`);
        failed++;
        results.push({ name: route.name, path: route.path, status: res.status, duration, pass: false, error: `Status ${res.status}` });
      }
    } catch (e) {
      console.error(`❌ [ERR] ${route.name.padEnd(28)} ${e.message}`);
      failed++;
      results.push({ name: route.name, path: route.path, status: 'ERROR', pass: false, error: e.message });
    }
  }

  // 2. Test Live Chat Endpoint with GPT-5.6-Terra
  console.log('\n--- 2. Testing Live AI Chat with Model GPT-5.6-Terra ---');
  for (const testCase of CHAT_QUESTIONS_TO_TEST) {
    const start = Date.now();
    try {
      const res = await fetch(`${PROD_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', parts: [{ type: 'text', text: testCase.q }] }]
        })
      });

      const raw = await res.text();
      const duration = Date.now() - start;
      const metadataMatch = raw.match(/data:\s*({.*"messageMetadata":.*})/);

      if (!metadataMatch) {
        console.error(`❌ ${testCase.name}: No valid metadata in response (${res.status})`);
        failed++;
        results.push({ name: testCase.name, pass: false, error: 'Invalid response stream' });
        continue;
      }

      const meta = JSON.parse(metadataMatch[1]).messageMetadata;
      const answer = meta.answer || '';
      const model = meta.model;
      const provider = meta.provider;

      const hasRequired = testCase.mustIncludeAny.some(kw => answer.toLowerCase().includes(kw.toLowerCase()));
      const hasForbidden = testCase.mustNotInclude.some(kw => answer.toLowerCase().includes(kw.toLowerCase()));
      const isModelCorrect = model === 'gpt-5.6-terra';

      let testPass = res.status === 200 && isModelCorrect && hasRequired && !hasForbidden;

      if (testPass) {
        console.log(`✅ ${testCase.name.padEnd(35)} [${provider}/${model}] (${duration}ms)`);
        console.log(`   Response: "${answer.substring(0, 120).replace(/\n/g, ' ')}..."\n`);
        passed++;
        results.push({ name: testCase.name, model, duration, pass: true });
      } else {
        console.error(`❌ ${testCase.name} Validation failed:`);
        if (!isModelCorrect) console.error(`   - Expected model 'gpt-5.6-terra', got '${model}'`);
        if (!hasRequired) console.error(`   - Missing keywords: ${testCase.mustIncludeAny}`);
        if (hasForbidden) console.error(`   - Leaked forbidden content: ${testCase.mustNotInclude}`);
        failed++;
        results.push({ name: testCase.name, pass: false, error: 'Validation assertion failed' });
      }
    } catch (e) {
      console.error(`❌ ${testCase.name} Exception: ${e.message}`);
      failed++;
      results.push({ name: testCase.name, pass: false, error: e.message });
    }
  }

  console.log('===========================================================');
  console.log(`📊 FINAL REGRESSION RESULTS: ${passed} PASSED / ${passed + failed} TOTAL (${((passed / (passed + failed)) * 100).toFixed(0)}% SUCCESS)`);
  console.log('===========================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runRegression();
