async function testLive() {
  console.log('Sending question to http://91.132.196.202/api/chat ...');
  const res = await fetch('http://91.132.196.202/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{
        role: 'user',
        parts: [{ type: 'text', text: 'ты умеешь писать автотесты?' }]
      }]
    })
  });

  const raw = await res.text();
  const metadataMatch = raw.match(/data:\s*({.*"messageMetadata":.*})/);
  if (metadataMatch) {
    const meta = JSON.parse(metadataMatch[1]);
    console.log('\n--- MODEL & PROVIDER ---');
    console.log('Provider:', meta.messageMetadata.provider);
    console.log('Model:', meta.messageMetadata.model);
    console.log('\n--- GENERATED ANSWER ---');
    console.log(meta.messageMetadata.answer);

    // Assertions
    const ans = meta.messageMetadata.answer;
    const hasCount = /\b40\b/.test(ans);
    const hasInternalEndpoints = /\/api\/v3\//i.test(ans);

    console.log('\n--- VALIDATIONS ---');
    console.log('Mention of "40" autotests count:', hasCount ? 'FAIL ❌' : 'PASS ✅ (No count mentioned)');
    console.log('Internal endpoints present:', hasInternalEndpoints ? 'FAIL ❌' : 'PASS ✅ (No endpoints leaked)');
    console.log('Live Model is GPT-5.6-Terra:', meta.messageMetadata.model === 'gpt-5.6-terra' ? 'PASS ✅' : 'FAIL ❌');
  } else {
    console.log('Response:', raw);
  }
}

testLive();
