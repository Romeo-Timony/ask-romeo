import type { Metadata } from 'next';
import { AiCompetitivenessPageContent } from '@/components/faq/ai-competitiveness-page-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'FAQ: AI Advantages in PM & QA',
  description:
    'Grounded answers on how AI accelerates Project Management and QA engineering while maintaining human accountability and release quality.',
  path: '/faq/ai-competitiveness',
  keywords: [
    'AI advantages FAQ',
    'Project Manager AI',
    'QA AI FAQ',
    'Fullstack QA',
    'Ask Romeo FAQ',
    'AI competitiveness',
  ],
});

export default function AiCompetitivenessFaqPage() {
  return <AiCompetitivenessPageContent />;
}
