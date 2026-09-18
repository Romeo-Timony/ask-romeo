import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/about/about-page-content';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About Romeo — Project Manager / QA Engineer',
  description:
    'Profile of Romeo Timony: Project Manager & QA Engineer focused on delivery predictability, software quality, and AI orchestration.',
  path: '/about',
  keywords: [
    'About Romeo',
    'Romeo Timony',
    'Project Manager',
    'QA Engineer',
    'Fullstack QA',
    'Quality Engineering',
    'Delivery Management',
    'AI',
  ],
});

export default function AboutPage() {
  return <AboutPageContent />;
}
