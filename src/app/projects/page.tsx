import type { Metadata } from 'next';
import { ProjectsPageContent } from '@/components/projects/projects-page-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Projects',
  description:
    'Selected commercial and engineering projects where Romeo Timony worked as Senior QA Engineer.',
  path: '/projects',
  keywords: [
    'Romeo Timony projects',
    'QA projects',
    'Sminex Comfort',
    'Elme Messer',
    'DPD',
  ],
});

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
