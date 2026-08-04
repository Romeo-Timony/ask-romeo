import { getSuggestedQuestionText } from '@/lib/suggested-questions';

export const oosuProfile = {
  name: 'Romeo Timony (Роман Тимошенко)',
  handle: '@Romeo-Timony',
  title: 'Fullstack QA/AI engineer',
  titleEn: 'Fullstack QA/AI engineer',
  location: 'Удалённо',
  locationEn: 'Remote',
  residence: '',
  education: '',
  email: 'roman.timoshenko@gmail.com',
  telegram: 'https://t.me/romeo_timony',
  github: 'https://github.com/Romeo-Timony',
  linkedin: '',
  instagram: '',
  currentPortfolioUrl: 'http://91.132.196.202',
  currentPortfolioGithub: 'https://github.com/Romeo-Timony/ask-romeo',
  legacyPortfolioUrl: '',
  legacyPortfolioGithub: '',
  notionWikiUrl: '',
  notionSourceUrl: '',
  resumeKoUrl: '',
  resumeEnUrl: '',
  wikiSource: 'Static portfolio knowledge (WIP)',
  sourceSummary:
    'Romeo Timony — Fullstack QA Engineer with AI tooling. AI-connected portfolio with Ask chat and RAG (content in progress).',
} as const;

export const suggestedQuestions = {
  Portfolio: getSuggestedQuestionText('en', 'bestProjects'),
  Me: getSuggestedQuestionText('en', 'developerType'),
  Skills: getSuggestedQuestionText('en', 'techStack'),
  Process: getSuggestedQuestionText('en', 'conversationalPortfolio'),
  Contact: getSuggestedQuestionText('en', 'contactCollab'),
} as const;

export const oosuProjects = [
  {
    title: 'Ask Romeo',
    category: 'AI Portfolio',
    date: '2026',
    description:
      'AI-connected portfolio with conversational Ask UI, RAG knowledge base, and a centerpiece video visit card. Built with Next.js and OpenAI, deployed with Docker on a VPS.',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vercel AI SDK',
      'OpenAI',
      'RAG',
      'Docker',
    ],
    links: [
      {
        name: 'Live Site',
        url: oosuProfile.currentPortfolioUrl,
      },
      {
        name: 'GitHub',
        url: oosuProfile.currentPortfolioGithub,
      },
    ],
    images: [
      {
        src: '/oosuhada.png',
        alt: 'Ask Romeo project preview placeholder',
      },
    ],
  },
  {
    title: 'QA Assistant Telegram',
    category: 'AI / QA',
    date: '2025-2026',
    description:
      'Diploma project: QA Telegram Assistant with n8n, RAG, OpenAI, Postgres, and Langfuse.',
    techStack: ['Python', 'n8n', 'RAG', 'OpenAI', 'Postgres', 'Langfuse'],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/Romeo-Timony/qa-assistant-telegram',
      },
    ],
    images: [
      {
        src: '/oosuhada.png',
        alt: 'QA Assistant preview placeholder',
      },
    ],
  },
  {
    title: 'Onboard',
    category: 'AI Telegram',
    date: '2025',
    description: 'AI Telegram onboarding training bot.',
    techStack: ['Python', 'Telegram', 'AI'],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/Romeo-Timony/onboard',
      },
    ],
    images: [
      {
        src: '/oosuhada.png',
        alt: 'Onboard preview placeholder',
      },
    ],
  },
  {
    title: 'incoming_lids',
    category: 'Telegram Bot',
    date: '2025',
    description: 'Telegram bot for massage booking survey.',
    techStack: ['Python', 'Telegram'],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/Romeo-Timony/incoming_lids',
      },
    ],
    images: [
      {
        src: '/oosuhada.png',
        alt: 'incoming_lids preview placeholder',
      },
    ],
  },
  {
    title: 'pikabaka',
    category: 'Desktop Tool',
    date: '2025',
    description: 'Interview copilot Windows fork (Pika / Fuck HR).',
    techStack: ['TypeScript', 'Windows'],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/Romeo-Timony/pikabaka',
      },
    ],
    images: [
      {
        src: '/oosuhada.png',
        alt: 'pikabaka preview placeholder',
      },
    ],
  },
] as const;
