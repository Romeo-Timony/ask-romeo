import type { Metadata } from 'next';
import { romeoProfile, romeoProjects } from '@/lib/romeo-profile';

export const siteUrl = 'http://91.132.196.202';
export const siteName = 'Ask Romeo';
export const defaultTitle = 'Romeo Timony — QA Engineer / Prompt Engineer';
export const defaultDescription =
  'AI-connected portfolio of Romeo Timony: QA Engineer / Prompt Engineer. Ask questions via chat, explore projects, skills, and workflow.';

export const seoKeywords = [
  'Romeo Timony',
  'Ask Romeo',
  'QA Engineer',
  'Prompt Engineer',
  'AI portfolio',
  'RAG portfolio',
  'Next.js',
  'OpenAI',
];

export const publicRoutes = [
  '/',
  '/ask',
  '/chat',
  '/about',
  '/projects',
  '/projects/ask-romeo',
  '/ai-director',
  '/ai-era-developer',
  '/faq/ai-competitiveness',
  '/privacy',
] as const;

export type PublicRoute = (typeof publicRoutes)[number];

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata({
  title,
  description = defaultDescription,
  path,
  keywords = [],
}: {
  title: string;
  description?: string;
  path: PublicRoute;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...seoKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url,
      siteName,
      title,
      description,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: defaultTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@Romeo-Timony',
      images: ['/twitter-image'],
    },
  };
}

export const sameAsLinks = [romeoProfile.github, romeoProfile.linkedin].filter(
  Boolean
);

export const featuredProjects = romeoProjects.slice(0, 4);

export const jsonLdGraph = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Romeo Timony',
    alternateName: ['Romeo-Timony', 'Ask Romeo'],
    url: siteUrl,
    jobTitle: 'Fullstack QA/AI engineer',
    description:
      'Romeo Timony is a QA Engineer / Prompt Engineer building AI-connected portfolio systems, Telegram assistants, and RAG workflows.',
    knowsAbout: [
      'QA engineering',
      'Prompt engineering',
      'RAG',
      'OpenAI',
      'n8n',
      'Telegram bots',
      'Next.js',
      'AI-assisted workflows',
    ],
    sameAs: sameAsLinks,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    inLanguage: ['ru', 'en'],
    publisher: {
      '@id': `${siteUrl}/#person`,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${siteUrl}/#askromeo`,
    name: 'Ask Romeo',
    applicationCategory: 'PortfolioApplication',
    operatingSystem: 'Web',
    url: siteUrl,
    description:
      'Ask Romeo is a conversational portfolio that answers questions about Romeo Timony through chat, static knowledge, and upcoming RAG sources.',
    creator: {
      '@id': `${siteUrl}/#person`,
    },
    keywords: [
      'RAG portfolio',
      'AI portfolio',
      'QA Engineer',
      'Prompt Engineer',
      'Next.js',
      'portfolio chatbot',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}/#featured-projects`,
    name: 'Featured Romeo projects',
    itemListElement: featuredProjects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: project.links[0]?.url ?? siteUrl,
        creator: {
          '@id': `${siteUrl}/#person`,
        },
      },
    })),
  },
];

export function getJsonLd() {
  return JSON.stringify(jsonLdGraph).replace(/</g, '\\u003c');
}
