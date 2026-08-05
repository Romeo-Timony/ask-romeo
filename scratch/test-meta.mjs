import { getSuggestedQuestionMeta } from '../src/lib/suggested-questions.js';
import { findFaqAnswerById } from '../src/lib/faq/answers.js';

console.log('Testing Meta retrieval:');
try {
  const meta = getSuggestedQuestionMeta('home.projects.top3', 'ru');
  console.log('RU Meta:', meta);
  
  if (meta?.faqId) {
    const faq = findFaqAnswerById(meta.faqId, 'ru');
    console.log('FAQ Answer found:', faq ? { id: faq.id, cacheMode: faq.cacheMode } : null);
  }
} catch (e) {
  console.error('Error:', e);
}
