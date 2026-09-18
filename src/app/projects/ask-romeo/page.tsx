import type { Metadata } from 'next';
import { AskRomeoProjectPageContent } from '@/components/projects/ask-romeo-project-page-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Ask Romeo — диалоговое портфолио Project Manager & QA',
  description:
    'Ask Romeo — диалоговое портфолио Романа Тимошенко: архитектура RAG, синтез Project Management и QA-инженерии, проверенная база знаний.',
  path: '/projects/ask-romeo',
  keywords: [
    'Ask Romeo',
    'Project Manager',
    'QA Engineer',
    'Fullstack QA',
    'RAG-портфолио',
    'AI-чат',
    'Next.js 15',
    'pgvector',
  ],
});

export default function AskRomeoProjectPage() {
  return <AskRomeoProjectPageContent />;
}
