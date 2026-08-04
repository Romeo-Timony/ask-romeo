import type { Metadata } from 'next';
import { AiCompetitivenessPageContent } from '@/components/faq/ai-competitiveness-page-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'FAQ: AI Advantages in QA',
  description:
    'Short, grounded answers about how a Senior QA Engineer works with AI, keeps quality control, and uses Ask Romeo as a grounded portfolio.',
  path: '/faq/ai-competitiveness',
  keywords: [
    'AI advantages FAQ',
    'QA AI FAQ',
    'Ask Romeo FAQ',
    'AI competitiveness',
  ],
});

export default function AiCompetitivenessFaqPage() {
  return <AiCompetitivenessPageContent />;
}
