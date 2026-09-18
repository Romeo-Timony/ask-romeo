import type { Metadata } from 'next';
import { ProjectsPageContent } from '@/components/projects/projects-page-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Projects — Project Manager / QA Engineer',
  description:
    'Commercial and engineering projects at the intersection of Project Management and QA: scope governance, requirements analysis, and stable releases.',
  path: '/projects',
  keywords: [
    'Romeo Timony projects',
    'Project Manager',
    'QA Engineer',
    'Fullstack QA',
    'Sminex Comfort',
    'Elme Messer',
    'DPD',
  ],
});

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
