import { readFileSync, writeFileSync } from 'node:fs';

const URL = 'http://localhost:3000/api/chat';
const MATRIX_PATH = 'C:/Users/user/.gemini/antigravity-ide/brain/9d860681-79f9-48d1-bf56-00f089bf1194/interview_qa_100_matrix.md';

function parseQuestionsFromMatrix(mdContent) {
  const lines = mdContent.split('\n');
  const questions = [];
  let currentBlock = 'General';
  let currentQuestion = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('## Блок ') || line.startsWith('## Block ')) {
      currentBlock = line.replace(/^##\s*/, '').trim();
    } else if (/^###\s+\d+\.\s+/.test(line)) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      const match = line.match(/^###\s+(\d+)\.\s+(.*)$/);
      currentQuestion = {
        number: parseInt(match[1], 10),
        query: match[2].trim(),
        block: currentBlock,
        target: '',
        expectedAnswer: '',
        risks: '',
        enhancement: '',
      };
    } else if (currentQuestion) {
      if (line.startsWith('- **Цель вопроса:**')) {
        currentQuestion.target = line.replace('- **Цель вопроса:**', '').trim();
      } else if (line.startsWith('- **Эталонный ответ:**')) {
        currentQuestion.expectedAnswer = line.replace('- **Эталонный ответ:**', '').trim();
      } else if (line.startsWith('- **Риски:**')) {
        currentQuestion.risks = line.replace('- **Риски:**', '').trim();
      } else if (line.startsWith('- **Усиление:**')) {
        currentQuestion.enhancement = line.replace('- **Усиление:**', '').trim();
      }
    }
  }

  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  return questions;
}

async function sendQuery(query) {
  const start = Date.now();
  let actualAnswer = '';
  let status = 0;
  let error = null;

  try {
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', parts: [{ type: 'text', text: query }] }],
      }),
    });

    status = res.status;
    const text = await res.text();
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ') && !line.includes('[DONE]')) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === 'text-delta' && data.delta) {
            actualAnswer += data.delta;
          }
        } catch {}
      }
    }
  } catch (err) {
    error = err.message;
  }

  const elapsed = Date.now() - start;
  return { status, actualAnswer, elapsed, error };
}

async function run() {
  console.log('Reading questions from matrix...');
  const content = readFileSync(MATRIX_PATH, 'utf-8');
  const questions = parseQuestionsFromMatrix(content);
  console.log(`Parsed ${questions.length} questions from matrix.\n`);

  const results = [];
  let passedCount = 0;
  let failedCount = 0;
  let totalLatency = 0;

  // Process in sequential chunks with controlled rate
  for (let idx = 0; idx < questions.length; idx++) {
    const q = questions[idx];
    process.stdout.write(`[${idx + 1}/${questions.length}] Q${q.number}: "${q.query.slice(0, 45)}..." `);

    const res = await sendQuery(q.query);
    totalLatency += res.elapsed;

    // Checks
    const is200 = res.status === 200;
    const hasContent = res.actualAnswer.length > 50;
    const hasNdaLeak = /\/api\/v\d+\/counters|\/api\/v\d+\/readings/i.test(res.actualAnswer);
    const mentions40 = /\b40\s*(автотест|тест|сценари)/i.test(res.actualAnswer);
    
    // Overall Pass criteria
    const isPassed = is200 && hasContent && !hasNdaLeak && !mentions40;

    if (isPassed) {
      passedCount++;
      console.log(`-> PASSED ✅ (${res.elapsed}ms, ${res.actualAnswer.length} chars)`);
    } else {
      failedCount++;
      console.log(`-> FAILED ❌ (Status: ${res.status}, Len: ${res.actualAnswer.length}, NDA Leak: ${hasNdaLeak}, 40: ${mentions40})`);
    }

    results.push({
      ...q,
      status: res.status,
      elapsed: res.elapsed,
      actualAnswer: res.actualAnswer,
      hasNdaLeak,
      mentions40,
      isPassed,
      error: res.error,
    });

    // Small breathing pause between LLM calls
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log(`\n========================================`);
  console.log(`TOTAL QUESTIONS TESTED: ${questions.length}`);
  console.log(`PASSED: ${passedCount} (${Math.round((passedCount / questions.length) * 100)}%)`);
  console.log(`FAILED: ${failedCount}`);
  console.log(`AVERAGE LATENCY: ${Math.round(totalLatency / questions.length)} ms`);
  console.log(`========================================\n`);

  writeFileSync('scripts/interview_105_results.json', JSON.stringify(results, null, 2));
  console.log('Results saved to scripts/interview_105_results.json');
}

run();
