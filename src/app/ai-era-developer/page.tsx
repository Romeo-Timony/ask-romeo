import type { Metadata } from 'next';
import { AiEraDeveloperPageContent } from '@/components/faq/ai-era-developer-page-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'QA / AI: инженерный подход к качеству',
  description:
    'Как Romeo Timony сочетает QA-инженерию, тестовую автоматизацию, LLM и RAG, чтобы быстрее поставлять проверяемые и поддерживаемые решения.',
  path: '/ai-era-developer',
  keywords: [
    'QA инженер',
    'AI в разработке',
    'тестовая автоматизация',
    'LLM',
    'RAG',
    'quality engineering',
  ],
});

export default function AiEraDeveloperPage() {
  return <AiEraDeveloperPageContent />;
}
