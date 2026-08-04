import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Ask Romeo',
    description:
      'Ask Romeo about projects, QA skills, AI workflow, experience, and collaboration through the conversational portfolio.',
    path: '/chat',
    keywords: ['Ask Romeo', 'portfolio Q&A', 'QA portfolio chat'],
  }),
  title: { absolute: 'Ask Romeo' },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
