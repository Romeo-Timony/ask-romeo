import type { Metadata } from 'next';
import { AskRomeoProjectPageContent } from '@/components/projects/ask-romeo-project-page-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Ask Romeo — диалоговое QA/AI-портфолио',
  description:
    'Ask Romeo — диалоговое портфолио Романа Тимошенко с FAQ-маршрутизацией, базой знаний, RAG и ответами, подкреплёнными источниками.',
  path: '/projects/ask-romeo',
  keywords: ['Ask Romeo', 'RAG-портфолио', 'QA-портфолио', 'AI-чат'],
});

export default function AskRomeoProjectPage() {
  return <AskRomeoProjectPageContent />;
}
