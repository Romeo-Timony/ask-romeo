import type { Metadata } from 'next';
import { AiDirectorPageContent } from '@/components/faq/ai-director-page-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Senior QA в эпоху AI',
  description:
    'Подход Романа Тимошенко к качеству: системное тестирование Web, Mobile, API и микросервисов, развитие QA-процессов и применение AI для анализа, автоматизации и контроля рисков.',
  path: '/ai-director',
  keywords: [
    'Senior QA',
    'AI в тестировании',
    'QA automation',
    'контроль качества ПО',
  ],
});

export default function AiDirectorPage() {
  return <AiDirectorPageContent />;
}
