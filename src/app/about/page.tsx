import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/about/about-page-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About Romeo',
  description:
    'Senior QA Engineer focused on software quality, test automation, and applying AI to engineering processes.',
  path: '/about',
  keywords: [
    'About Romeo',
    'Romeo Timony',
    'Senior QA Engineer',
    'Test Automation',
    'AI',
  ],
});

export default function AboutPage() {
  return <AboutPageContent />;
}
