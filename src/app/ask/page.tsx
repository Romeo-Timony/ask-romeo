import type { Metadata } from 'next';
import { AskPageContent } from '@/components/ask/ask-page-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Ask Romeo — Conversational QA / AI Portfolio',
  description:
    'Ask Romeo answers questions about software quality, test automation, AI tooling, commercial projects, and Romeo Timony’s QA approach.',
  path: '/ask',
  keywords: [
    'Ask Romeo',
    'QA portfolio chat',
    'AI testing',
    'conversational portfolio',
  ],
});

export default function AskPage() {
  return <AskPageContent />;
}
