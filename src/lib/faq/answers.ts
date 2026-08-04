import { romeoProfile } from '@/lib/romeo-profile';
import type { ChatLanguage } from '@/lib/i18n/detect-language';
import type { ChatAnswerSource } from '@/lib/chat/types';
import {
  resumeProjectSkillGroupsEn,
  resumeProjectSkillGroupsRu,
} from '@/data/resume-project-skills';
import { AI_ERA_COMPETITIVENESS_FAQ_ANSWERS } from './ai-era-competitiveness-answers';
import { RECRUITER_RISK_FAQ_ANSWERS } from './recruiter-risk-answers';

export type FaqCacheMode = 'direct_cache' | 'cache_rewrite' | 'rag_required';

export type FaqRenderLayout =
  | 'profile_hero'
  | 'project_showcase'
  | 'project_deep_dive'
  | 'skill_cloud'
  | 'experience_bridge'
  | 'timeline'
  | 'comparison_grid'
  | 'ai_workflow'
  | 'contact_card'
  | 'text_only';

export type FaqRenderSpec = {
  layout: FaqRenderLayout;
  density: 'compact' | 'standard' | 'immersive';
  leadVisual?: string;
  components: string[];
};

export type FaqVisualBlockType =
  | 'profileCard'
  | 'projectCards'
  | 'skillChips'
  | 'timeline'
  | 'comparisonTable'
  | 'statelessDiagram'
  | 'imageCard'
  | 'contactCard'
  | 'ctaButtons'
  | 'sourceBadges';

export type FaqVisualBlock = {
  type: FaqVisualBlockType;
  title?: string;
  dataKey?: string;
  items?: unknown[];
};

export type FaqMediaRef = {
  assetKey: string;
  kind: 'profile' | 'project' | 'screenshot' | 'diagram' | 'gallery';
  src: string;
  darkSrc?: string;
  mobileSrc?: string;
  mobileDarkSrc?: string;
  alt: string;
  caption?: string;
  status: 'ready' | 'todo' | 'optional';
};

export type FaqAnswerPart =
  | {
      type: 'markdown';
      contentKey: 'shortAnswer' | 'defaultAnswer' | 'detailedAnswer';
      content?: string;
    }
  | {
      type: 'component';
      component: string;
      dataKey?: string;
      blockType?: FaqVisualBlockType;
    }
  | {
      type: 'sourceBadges';
      sourceChunkIds: string[];
    };

export type FaqAnswer = {
  id: string;
  legacyIds?: string[];
  intentId: string;
  entityId: string;
  language: ChatLanguage;
  quickLabel: string;
  displayQuestion: string;
  alternativeDisplayQuestions?: string[];
  patterns: string[];
  cacheMode: FaqCacheMode;
  answerSource: ChatAnswerSource;
  skippedGroq: boolean;
  shortAnswer: string;
  defaultAnswer: string;
  detailedAnswer?: string;
  answer: string;
  renderSpec?: FaqRenderSpec;
  visualBlocks?: FaqVisualBlock[];
  mediaRefs?: FaqMediaRef[];
  sourceChunkIds: string[];
  visibility: 'public' | 'limited' | 'private';
  hasTodo: boolean;
  freshness: 'stable' | 'needs_update' | 'time_sensitive';
  guardrails?: string[];
  matchedEntityIds: string[];
  confidence: number;
};

type FaqAnswerInput = Omit<
  FaqAnswer,
  'answer' | 'cacheMode' | 'answerSource' | 'skippedGroq' | 'visibility'
> & {
  cacheMode?: FaqCacheMode;
  answerSource?: ChatAnswerSource;
  skippedGroq?: boolean;
  visibility?: FaqAnswer['visibility'];
};

const mediaRefs: FaqMediaRef[] = [
  {
    assetKey: 'profile.oosu.portrait',
    kind: 'profile',
    src: '/images/profile/romeo-timony-new.webp',
    alt: 'Romeo Timony portrait',
    status: 'ready',
  },
  {
    assetKey: 'project.askoosu.cover',
    kind: 'project',
    src: '/images/projects/ask-romeo-cover.webp',
    darkSrc: '/images/projects/ask-romeo-cover.webp',
    alt: 'Ask Romeo interface preview',
    status: 'ready',
  },
  {
    assetKey: 'project.sminex_comfort.cover',
    kind: 'project',
    src: '/images/projects/sminex-comfort-cover-new.webp',
    alt: 'Sminex Comfort interface preview',
    status: 'ready',
  },
  {
    assetKey: 'project.elme_messer.cover',
    kind: 'project',
    src: '/images/projects/elme-messer-cover.webp',
    alt: 'Elme Messer website preview',
    status: 'ready',
  },
  {
    assetKey: 'project.dpd.cover',
    kind: 'project',
    src: '/images/projects/dpd-cover-new.webp',
    alt: 'DPD website interface preview',
    status: 'ready',
  },
  {
    assetKey: 'project.aigram.cover',
    kind: 'project',
    src: '/images/projects/aigram-cover-light-desktop.webp',
    darkSrc: '/images/projects/aigram-cover-dark-desktop.webp',
    alt: 'Aigram project cover',
    status: 'ready',
  },
  {
    assetKey: 'project.sticks.cover',
    kind: 'project',
    src: '/images/projects/sticks-stones-cover-desktop.webp',
    mobileSrc: '/images/projects/sticks-stones-cover-mobile.webp',
    alt: 'Sticks and Stones project cover',
    status: 'ready',
  },
  {
    assetKey: 'project.portfoliooh.cover',
    kind: 'project',
    src: '/images/projects/portfolio-oh-cover-desktop.webp',
    mobileSrc: '/images/projects/portfolio-oh-cover-mobile.webp',
    alt: 'Portfoli-Oh 2025 portfolio preview',
    status: 'ready',
  },
  {
    assetKey: 'project.ezair.cover',
    kind: 'project',
    src: '/oosu-projects/ezair.webp',
    alt: 'EZ Air project preview',
    status: 'ready',
  },
  {
    assetKey: 'project.uncorked.cover',
    kind: 'project',
    src: '/oosu-projects/uncorked.webp',
    alt: 'Uncorked project preview',
    status: 'ready',
  },
  {
    assetKey: 'project.onjung.cover',
    kind: 'project',
    src: '/oosu-projects/onjung.webp',
    alt: 'Onjung project preview',
    status: 'ready',
  },
  {
    assetKey: 'project.nomad_market.cover',
    kind: 'project',
    src: '/oosu-projects/nomad-market.webp',
    alt: 'Nomad Market project preview',
    status: 'ready',
  },
  {
    assetKey: 'project.webtoon_translate.cover',
    kind: 'project',
    src: 'TODO_ASSET',
    alt: 'Webtoon AI Translate project preview',
    status: 'todo',
  },
  {
    assetKey: 'project.pyjavalingo.cover',
    kind: 'project',
    src: 'TODO_ASSET',
    alt: 'Pylingo and Javalingo project preview',
    status: 'todo',
  },
  {
    assetKey: 'life.oosu_salon.cover',
    kind: 'gallery',
    src: '/images/life/oosu-salon-desktop.webp',
    mobileSrc: '/images/life/oosu-salon-mobile.webp',
    alt: 'Romeo Salon visual memory',
    status: 'ready',
  },
  {
    assetKey: 'life.sensory_interests.cover',
    kind: 'gallery',
    src: '/images/life/sensory-interests-desktop.webp',
    mobileSrc: '/images/life/sensory-interests-mobile.webp',
    alt: 'Sensory interests visual reference',
    status: 'ready',
  },
];

const representativeProjectsKo = [
  {
    id: 'askoosu',
    title: 'Ask Romeo 2026',
    label: 'AI Portfolio',
    subtitle: 'AI-connected 대화형 포트폴리오',
    description:
      'Next.js 채팅 UI, Notion Wiki, RAG, Groq, PostgreSQL 검색 캐시를 연결한 현재 대표 프로젝트입니다.',
    image: 'project.askoosu.cover',
    tags: ['Next.js', 'RAG', 'Groq', 'Notion', 'PostgreSQL'],
    href: romeoProfile.currentPortfolioUrl,
  },
  {
    id: 'instagram_clone',
    title: 'Aigram',
    label: 'Fullstack SNS',
    subtitle: 'Instagram Clone 기반 1인 풀스택 SNS 프로젝트',
    description:
      'Spring Boot, PostgreSQL, React/Next.js, 검색과 AI 기능까지 연결하며 SNS 데이터 흐름을 익힌 프로젝트입니다.',
    image: 'project.aigram.cover',
    tags: ['Spring Boot', 'PostgreSQL', 'React', 'Search', 'AI'],
    href: 'https://aigram.oosu.dev',
  },
  {
    id: 'sticks_and_stones',
    title: 'Sticks & Stones',
    label: 'Real Migration',
    subtitle: '실서비스 레거시 리빌드',
    description:
      '기존 WordPress/PHP 기반 홈페이지를 TypeScript/Vite 기반으로 재구성한 실제 브랜드 사이트 작업입니다.',
    image: 'project.sticks.cover',
    tags: ['Vite', 'TypeScript', 'UX', 'Legacy rebuild'],
    href: 'https://stks.oosu.dev',
  },
];

const representativeProjectsEn = [
  {
    id: 'askoosu',
    title: 'Ask Romeo 2026',
    label: 'AI Portfolio',
    subtitle: 'AI-connected conversational portfolio',
    description:
      'The current flagship project connecting a Next.js chat UI, Notion Wiki, RAG, Groq, and PostgreSQL search cache.',
    image: 'project.askoosu.cover',
    tags: ['Next.js', 'RAG', 'Groq', 'Notion', 'PostgreSQL'],
    href: romeoProfile.currentPortfolioUrl,
  },
  {
    id: 'instagram_clone',
    title: 'Aigram',
    label: 'Fullstack SNS',
    subtitle: 'Solo fullstack SNS project inspired by Instagram Clone',
    description:
      'A project for learning SNS data flow across Spring Boot, PostgreSQL, React/Next.js, search, and AI features.',
    image: 'project.aigram.cover',
    tags: ['Spring Boot', 'PostgreSQL', 'React', 'Search', 'AI'],
    href: 'https://aigram.oosu.dev',
  },
  {
    id: 'sticks_and_stones',
    title: 'Sticks & Stones',
    label: 'Real Migration',
    subtitle: 'Real-service website rebuild',
    description:
      'A real brand-site rebuild that moved an older WordPress/PHP structure into a TypeScript/Vite frontend.',
    image: 'project.sticks.cover',
    tags: ['Vite', 'TypeScript', 'UX', 'Legacy rebuild'],
    href: 'https://stks.oosu.dev',
  },
];

const moreProjectsKo = [
  {
    id: 'ask_romeo',
    title: 'Ask Romeo',
    label: 'AI Portfolio',
    subtitle: 'AI-портфолио с диалоговым интерфейсом',
    description:
      'Интерактивное портфолио на Next.js с Ask UI, RAG-базой знаний и ответами о проектах и опыте Romeo.',
    image: 'project.askoosu.cover',
    tags: ['Next.js', 'React', 'TypeScript', 'RAG', 'OpenAI'],
    href: romeoProfile.currentPortfolioUrl,
  },
  {
    id: 'sminex_comfort',
    title: 'Sminex Comfort',
    subtitle: 'PropTech · web и mobile app',
    description:
      'QA веб- и мобильной платформы для жителей: пользовательские сценарии, API, интеграции внутренних сервисов и регрессия перед релизами.',
    image: 'project.sminex_comfort.cover',
    tags: ['Next.js', 'React', 'Webpack', 'Yandex Metrica'],
    href: 'https://comfort.sminex.com/',
  },
  {
    id: 'elme_messer',
    title: 'Elme Messer',
    subtitle: 'Enterprise · web и mobile app',
    description:
      'QA цифровых сервисов промышленного поставщика газов: каталог продукции, интернет-магазин, личный кабинет клиента, обмен документами и многоязычные пользовательские сценарии.',
    image: 'project.elme_messer.cover',
    tags: ['WordPress', 'jQuery', 'WPML', 'Autoptimize', 'Google Analytics'],
    href: 'https://elmemesser.lv/',
  },
  {
    id: 'dpd',
    title: 'DPD',
    subtitle: 'Логистика · web и mobile app',
    description:
      'QA логистических сценариев: оформление и отслеживание отправлений, API, интеграции и регрессия критичных процессов доставки.',
    image: 'project.dpd.cover',
    tags: ['WordPress', 'jQuery', 'Bootstrap', 'SiteOrigin', 'Slick'],
    href: 'https://dpd.ru/',
  },
];

const moreProjectsEn = [
  {
    id: 'ask_romeo',
    title: 'Ask Romeo',
    label: 'AI Portfolio',
    subtitle: 'AI-connected conversational portfolio',
    description:
      "An interactive Next.js portfolio with an Ask UI, RAG knowledge base, and grounded answers about Romeo's projects and experience.",
    image: 'project.askoosu.cover',
    tags: ['Next.js', 'React', 'TypeScript', 'RAG', 'OpenAI'],
    href: romeoProfile.currentPortfolioUrl,
  },
  {
    id: 'sminex_comfort',
    title: 'Sminex Comfort',
    subtitle: 'PropTech · web and mobile app',
    description:
      'QA for a resident web and mobile platform: user journeys, APIs, internal-service integrations, and release regression testing.',
    image: 'project.sminex_comfort.cover',
    tags: ['Next.js', 'React', 'Webpack', 'Yandex Metrica'],
    href: 'https://comfort.sminex.com/',
  },
  {
    id: 'elme_messer',
    title: 'Elme Messer',
    subtitle: 'Enterprise · web and mobile app',
    description:
      'QA for a digital industrial-gas supplier: product catalogue, web shop, customer account, document exchange, and multilingual customer journeys.',
    image: 'project.elme_messer.cover',
    tags: ['WordPress', 'jQuery', 'WPML', 'Autoptimize', 'Google Analytics'],
    href: 'https://elmemesser.lv/',
  },
  {
    id: 'dpd',
    title: 'DPD',
    subtitle: 'Logistics · web and mobile app',
    description:
      'QA for logistics scenarios: creating and tracking shipments, APIs, integrations, and regression of critical delivery flows.',
    image: 'project.dpd.cover',
    tags: ['WordPress', 'jQuery', 'Bootstrap', 'SiteOrigin', 'Slick'],
    href: 'https://dpd.ru/',
  },
];

const skillGroupsKo = [
  {
    group: 'Current Core Stack',
    skills: [
      { name: 'Next.js', proficiency: 'confident' },
      { name: 'React', proficiency: 'confident' },
      { name: 'TypeScript', proficiency: 'usable' },
      { name: 'Tailwind CSS', proficiency: 'confident' },
      { name: 'Spring Boot', proficiency: 'usable' },
      { name: 'PostgreSQL', proficiency: 'usable' },
      { name: 'Notion API', proficiency: 'usable' },
      { name: 'RAG', proficiency: 'learning' },
      { name: 'Groq', proficiency: 'usable' },
    ],
    evidence: [
      'Ask Romeo: Next.js, RAG, Groq, Notion API, PostgreSQL 연결 흐름',
      'Aigram: Spring Boot + PostgreSQL 기반 SNS 데이터 흐름',
      'Sticks & Stones: TypeScript/Vite 기반 실서비스 리빌드',
    ],
  },
  {
    group: 'Project-Proven Stack',
    skills: [
      { name: 'Flutter', proficiency: 'usable' },
      { name: 'Dart', proficiency: 'usable' },
      { name: 'Firebase', proficiency: 'usable' },
      { name: 'MySQL', proficiency: 'usable' },
      { name: 'Python', proficiency: 'usable' },
      { name: 'FastAPI', proficiency: 'learning' },
      { name: 'SQLite', proficiency: 'usable' },
      { name: 'Cloudinary', proficiency: 'learning' },
      { name: 'Meilisearch', proficiency: 'learning' },
      { name: 'Vite', proficiency: 'usable' },
      { name: 'GSAP', proficiency: 'usable' },
      { name: 'Three.js', proficiency: 'experimental' },
      { name: 'Lottie', proficiency: 'usable' },
    ],
    evidence: [
      'Onjung/Nomad Market: Flutter, Dart, Firebase 모바일 앱 흐름',
      'Webtoon AI Translate: Python/FastAPI, OCR, DeepL 실험',
      'Portfoli-Oh!: GSAP, Three.js, Lottie 인터랙션 실험',
    ],
  },
  {
    group: 'AI / Dev Tools',
    skills: [
      { name: 'Claude Code', proficiency: 'usable' },
      { name: 'OpenAI Codex', proficiency: 'confident' },
      { name: 'Gemini CLI', proficiency: 'usable' },
      { name: 'Groq', proficiency: 'usable' },
      { name: 'Notion API', proficiency: 'usable' },
      { name: 'Vercel AI SDK', proficiency: 'learning' },
      { name: 'DeepL', proficiency: 'experimental' },
      { name: 'OCR APIs', proficiency: 'experimental' },
    ],
    evidence: [
      'Ask Romeo: AI SDK, Groq, Notion RAG 답변 파이프라인',
      'Webtoon AI Translate: OCR/DeepL/Groq 기반 번역 후보 흐름',
      'daily dev workflow: Codex, Claude Code, Gemini CLI로 구현/검증 보조',
    ],
  },
  {
    group: 'Design / UX / Business',
    skills: [
      { name: 'Figma', proficiency: 'usable' },
      { name: 'UX/UI', proficiency: 'usable' },
      { name: 'Customer Research', proficiency: 'confident' },
      { name: 'POS Data Analysis', proficiency: 'usable' },
      { name: 'Brand Operation', proficiency: 'confident' },
      { name: 'Service Planning', proficiency: 'usable' },
    ],
    evidence: [
      'GfK Korea: 고객/시장 데이터를 읽는 업무 경험',
      'ROMEO SALON: 브랜드 운영과 고객 경험 감각',
      'UX/UI projects: 화면 흐름과 서비스 기획으로 연결',
    ],
  },
];

const skillGroupsEn = [
  {
    group: 'Current Core Stack',
    skills: [
      { name: 'Next.js', proficiency: 'confident' },
      { name: 'React', proficiency: 'confident' },
      { name: 'TypeScript', proficiency: 'usable' },
      { name: 'Tailwind CSS', proficiency: 'confident' },
      { name: 'Spring Boot', proficiency: 'usable' },
      { name: 'PostgreSQL', proficiency: 'usable' },
      { name: 'Notion API', proficiency: 'usable' },
      { name: 'RAG', proficiency: 'learning' },
      { name: 'Groq', proficiency: 'usable' },
    ],
    evidence: [
      'Ask Romeo: Next.js, RAG, Groq, Notion API, and PostgreSQL connected in one answer flow',
      'Aigram: Spring Boot and PostgreSQL in a fullstack SNS data flow',
      'Sticks & Stones: TypeScript/Vite used in a real service rebuild',
    ],
  },
  {
    group: 'Project-Proven Stack',
    skills: [
      { name: 'Flutter', proficiency: 'usable' },
      { name: 'Dart', proficiency: 'usable' },
      { name: 'Firebase', proficiency: 'usable' },
      { name: 'MySQL', proficiency: 'usable' },
      { name: 'Python', proficiency: 'usable' },
      { name: 'FastAPI', proficiency: 'learning' },
      { name: 'SQLite', proficiency: 'usable' },
      { name: 'Cloudinary', proficiency: 'learning' },
      { name: 'Meilisearch', proficiency: 'learning' },
      { name: 'Vite', proficiency: 'usable' },
      { name: 'GSAP', proficiency: 'usable' },
      { name: 'Three.js', proficiency: 'experimental' },
      { name: 'Lottie', proficiency: 'usable' },
    ],
    evidence: [
      'Onjung/Nomad Market: Flutter, Dart, and Firebase in mobile app flows',
      'Webtoon AI Translate: Python/FastAPI, OCR, and DeepL experiments',
      'Portfoli-Oh!: GSAP, Three.js, and Lottie interaction experiments',
    ],
  },
  {
    group: 'AI / Dev Tools',
    skills: [
      { name: 'Claude Code', proficiency: 'usable' },
      { name: 'OpenAI Codex', proficiency: 'confident' },
      { name: 'Gemini CLI', proficiency: 'usable' },
      { name: 'Groq', proficiency: 'usable' },
      { name: 'Notion API', proficiency: 'usable' },
      { name: 'Vercel AI SDK', proficiency: 'learning' },
      { name: 'DeepL', proficiency: 'experimental' },
      { name: 'OCR APIs', proficiency: 'experimental' },
    ],
    evidence: [
      'Ask Romeo: AI SDK, Groq, and Notion RAG in the answer pipeline',
      'Webtoon AI Translate: OCR/DeepL/Groq translation-candidate flow',
      'daily dev workflow: Codex, Claude Code, and Gemini CLI for implementation and verification support',
    ],
  },
  {
    group: 'Design / UX / Business',
    skills: [
      { name: 'Figma', proficiency: 'usable' },
      { name: 'UX/UI', proficiency: 'usable' },
      { name: 'Customer Research', proficiency: 'confident' },
      { name: 'POS Data Analysis', proficiency: 'usable' },
      { name: 'Brand Operation', proficiency: 'confident' },
      { name: 'Service Planning', proficiency: 'usable' },
    ],
    evidence: [
      'GfK Korea: customer and market-data reading experience',
      'ROMEO SALON: brand operation and customer-experience taste',
      'UX/UI projects: service planning connected to screen flows',
    ],
  },
];

const aiWorkflowKo = [
  {
    title: 'Plan',
    description:
      '요구사항을 작은 단위로 쪼개고, 답변 기준과 금지할 추측을 먼저 정리합니다.',
  },
  {
    title: 'Generate',
    description:
      'Claude Code, Codex, Gemini 같은 도구로 구현 초안과 대안을 빠르게 만듭니다.',
  },
  {
    title: 'Review',
    description:
      'AI가 만든 코드 흐름을 직접 읽고, 모르는 부분은 설명과 근거를 다시 확인합니다.',
  },
  {
    title: 'Test',
    description:
      '타입 체크, 빌드, 실행 로그, 문서 대조로 실제 동작을 검증합니다.',
  },
  {
    title: 'Ship',
    description:
      '사용자 경험과 운영 흐름 안에서 기능이 자연스럽게 작동하는지 확인합니다.',
  },
];

const aiWorkflowEn = [
  {
    title: 'Plan',
    description:
      'Break requirements into smaller steps and define answer rules and no-guess boundaries first.',
  },
  {
    title: 'Generate',
    description:
      'Use tools such as Claude Code, Codex, and Gemini to draft implementation options quickly.',
  },
  {
    title: 'Review',
    description:
      'Read generated code directly and ask for explanations or evidence where the flow is unclear.',
  },
  {
    title: 'Test',
    description:
      'Validate behavior with type checks, builds, logs, and documentation comparisons.',
  },
  {
    title: 'Ship',
    description:
      'Check whether the feature works naturally inside the user experience and operating flow.',
  },
];

const qaAiWorkflowRu = [
  {
    title: 'Контекст и риски',
    description:
      'Уточняю цель, сценарии, ограничения и риски. Формирую критерии приёмки и проверяемые допущения.',
  },
  {
    title: 'AI-гипотезы',
    description:
      'Codex, Claude Code и Gemini помогают разобрать задачу, подготовить варианты реализации, тест-кейсы и негативные сценарии.',
  },
  {
    title: 'Реализация и review',
    description:
      'Проверяю изменения в коде, контракты API, обработку ошибок и влияние на существующие пользовательские потоки.',
  },
  {
    title: 'QA-валидация',
    description:
      'Запускаю type-check, build, автотесты и ручные проверки. Сверяю логи, ответы API и граничные случаи.',
  },
  {
    title: 'Релиз и обратная связь',
    description:
      'Фиксирую результат, наблюдаю за поведением после релиза и превращаю найденные риски в новые проверки.',
  },
];

const qaAiWorkflowRuCopy = {
  shortAnswer:
    'Использую AI для ускорения анализа и подготовки проверок, а качество подтверждаю тестами, логами и ручным review.',
  defaultAnswer: [
    'AI в моём процессе — не замена QA, а инструмент для более быстрого анализа, подготовки гипотез и покрытия рисков.',
    '',
    'Codex, Claude Code и Gemini помогают декомпозировать задачу, изучить кодовую базу, предложить варианты реализации и составить тестовые сценарии. Затем я проверяю изменения как QA-инженер: читаю код, сверяю API-контракты, запускаю type-check, build и автотесты, анализирую логи и прохожу критичные пользовательские сценарии вручную.',
  ].join('\n'),
  detailedAnswer: [
    'Мой QA/AI-процесс строится вокруг доказуемого качества, а не вокруг доверия к сгенерированному коду.',
    '',
    'Сначала фиксирую цель, критерии приёмки, риски и запрещённые допущения. AI помогает быстрее собрать варианты, но не принимает решения за меня. На этапе реализации использую его для навигации по коду, идей по тестам, поиска edge cases и подготовки документации.',
    '',
    'После этого выполняю review изменений, проверяю ошибки и интеграции, запускаю статические проверки, сборку и тесты. Перед релизом прохожу пользовательские сценарии и контролирую результат по логам и обратной связи. Такой цикл позволяет ускоряться с AI, не теряя управляемость и ответственность за качество.',
  ].join('\n'),
};

const ragWorkflowKo = [
  {
    title: 'Chat UI',
    description: '방문자는 스크롤 대신 질문으로 포트폴리오 정보를 탐색합니다.',
  },
  {
    title: 'FAQ Cache',
    description: '반복 질문은 faqId와 intentId로 바로 캐시 답변을 반환합니다.',
  },
  {
    title: 'RAG Search',
    description:
      'FAQ로 충분하지 않은 질문은 Notion Wiki chunk와 PostgreSQL 검색 캐시를 조회합니다.',
  },
  {
    title: 'Model Layer',
    description:
      '필요한 경우에만 Groq 등 모델 생성을 사용하고, fallback과 근거 메타데이터를 남깁니다.',
  },
  {
    title: 'Rich Answer',
    description:
      '텍스트, 카드, 칩, 근거 badge를 함께 보여주는 포트폴리오형 답변으로 렌더링합니다.',
  },
];

const ragWorkflowEn = [
  {
    title: 'Chat UI',
    description:
      'Visitors explore portfolio information by asking instead of scrolling.',
  },
  {
    title: 'FAQ Cache',
    description:
      'Repeated questions return cached answers directly through faqId and intentId.',
  },
  {
    title: 'RAG Search',
    description:
      'Questions beyond FAQ coverage search Notion Wiki chunks and the PostgreSQL retrieval cache.',
  },
  {
    title: 'Model Layer',
    description:
      'Groq or another model is used only when needed, with fallback and evidence metadata.',
  },
  {
    title: 'Rich Answer',
    description:
      'Answers render as portfolio UI using text, cards, chips, and evidence badges.',
  },
];

const contactActionsKo = [
  { label: 'Email', href: `mailto:${romeoProfile.email}`, kind: 'email' },
  { label: 'Telegram', href: romeoProfile.telegram, kind: 'telegram' },
  { label: 'GitHub', href: romeoProfile.github, kind: 'github' },
  { label: 'LinkedIn', href: romeoProfile.linkedin, kind: 'linkedin' },
  { label: 'Instagram', href: romeoProfile.instagram, kind: 'instagram' },
  {
    label: 'Portfolio',
    href: romeoProfile.currentPortfolioUrl,
    kind: 'portfolio',
  },
];

const contactActionsEn = contactActionsKo;

const sharedGuardrails = [
  'Do not invent resume URLs',
  'Do not invent private repository links',
  'Do not invent performance metrics',
  'Treat TODO assets as unavailable until a real public file exists',
];

export const FAQ_ANSWERS: FaqAnswer[] = [
  ...AI_ERA_COMPETITIVENESS_FAQ_ANSWERS,
  ...RECRUITER_RISK_FAQ_ANSWERS,
  createFaqAnswer({
    id: 'faq.project.top_three.default',
    legacyIds: ['faq.projects.top3.summary'],
    intentId: 'project.representative',
    entityId: 'projects.representative',
    language: 'ru',
    quickLabel: 'Проекты',
    displayQuestion:
      'Покажи основные проекты Romeo и его опыт в QA.',
    patterns: [
      'проекты',
      'основные проекты',
      'три проекта',
      'покажи проекты',
      'проекты Romeo',
      'QA проекты',
      'Sminex Elme Messer DPD',
    ],
    shortAnswer:
      'В портфолио представлены три проекта: Sminex Comfort, Elme Messer и DPD.',
    defaultAnswer: [
      'В разделе собраны три проекта из QA-портфолио: Sminex Comfort, Elme Messer и DPD.',
      '',
      'Карточки показывают назначение бизнеса, QA-контекст, используемые технологии и ссылку на сайт.',
    ].join('\n'),
    renderSpec: {
      layout: 'project_showcase',
      density: 'immersive',
      leadVisual: 'ProjectShowcaseCards',
      components: ['ProjectShowcaseCards'],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Featured Projects',
        dataKey: 'projects.representative',
        items: moreProjectsKo.slice(1),
      },
      {
        type: 'projectCards',
        title: 'Дополнительно',
        dataKey: 'projects.wiki_featured',
        items: moreProjectsKo,
      },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.askoosu.overview',
      'project.sminex_comfort.overview',
      'project.elme_messer.overview',
      'project.dpd.overview',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: [
      'askoosu',
      'instagram_clone',
      'sticks_and_stones',
      'portfoli_oh',
      'onjung',
      'nomad_market',
      'webtoon_translate',
    ],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.project.top_three.default',
    legacyIds: ['faq.projects.top3.summary'],
    intentId: 'project.representative',
    entityId: 'projects.representative',
    language: 'en',
    quickLabel: 'Projects',
    displayQuestion:
      "Could you show Romeo's representative projects and how they connect to his growth?",
    patterns: [
      'projects',
      'project',
      'top projects',
      'project overview',
      "Can you show Romeo's top three projects at a glance?",
      "Could you show Romeo's representative projects and how they connect to his growth?",
      'representative projects',
      'best projects',
      "Which portfolio projects best show Romeo's growth as a developer?",
      "projects that show Romeo's growth",
      'Ask Romeo Instagram Clone Sticks & Stones',
    ],
    shortAnswer:
      'The featured projects are Ask Romeo, Aigram / Instagram Clone, and Sticks & Stones, with additional projects showing earlier growth and experiments.',
    defaultAnswer: [
      'Projects are a fun place to start. The clearest first three are Ask Romeo, Aigram, and Sticks & Stones.',
      '',
      'Ask Romeo reads as AI Portfolio, Aigram as Fullstack SNS, and Sticks & Stones as Real Migration. The cards keep the stack tags, related questions, and public links close by, while the more-projects rail lets visitors keep exploring Portfoli-Oh!, Onjung, Nomad Market, Webtoon AI Translate, and smaller experiments.',
    ].join('\n'),
    renderSpec: {
      layout: 'project_showcase',
      density: 'immersive',
      leadVisual: 'ProjectShowcaseCards',
      components: ['ProjectShowcaseCards'],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Featured Projects',
        dataKey: 'projects.representative',
        items: moreProjectsEn.slice(1),
      },
      {
        type: 'projectCards',
        title: 'Additional',
        dataKey: 'projects.wiki_featured',
        items: moreProjectsEn,
      },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.askoosu.overview',
      'project.sminex_comfort.overview',
      'project.elme_messer.overview',
      'project.dpd.overview',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: [
      'askoosu',
      'instagram_clone',
      'sticks_and_stones',
      'portfoli_oh',
      'onjung',
      'nomad_market',
      'webtoon_translate',
    ],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.skills.tech_stack.default',
    legacyIds: ['faq.tech_stack.level.default'],
    intentId: 'skills.tech_stack',
    entityId: 'skills.core',
    language: 'ru',
    quickLabel: '기술 스택',
    displayQuestion:
      '우수님은 어떤 기술 스택을 다루고, 각 기술은 어떤 프로젝트에서 써봤나요?',
    patterns: [
      '기술',
      '스택',
      '기술 스택',
      '우수님은 어떤 기술 스택을 다루고, 각 기술은 어떤 프로젝트에서 써봤나요?',
      '프론트엔드 백엔드 AI 기술',
      '쓸 줄 아는 기술',
      'tech stack',
    ],
    shortAnswer:
      'Навыки Romeo сгруппированы по проектам: Ask Romeo, Sminex, Elme Messer и DPD — с технологиями, QA-контекстом и подтверждёнными результатами.',
    defaultAnswer: [
      'Навыки сгруппированы по проектам, чтобы было видно не только название технологии, но и реальный контекст её применения.',
      '',
      'Ask Romeo показывает работу с AI/RAG и качеством ответов, Sminex — построение и масштабирование QA-процессов, Elme Messer — тестирование web-сервисов и интеграций, DPD — проверку логистической платформы и микросервисной архитектуры.',
    ].join('\n'),
    renderSpec: {
      layout: 'skill_cloud',
      density: 'standard',
      leadVisual: 'SkillChipGroup',
      components: ['SkillChipGroup'],
    },
    visualBlocks: [
      {
        type: 'skillChips',
        title: 'Навыки, подтверждённые опытом',
        dataKey: 'skills.core',
        items: resumeProjectSkillGroupsRu,
      },
    ],
    mediaRefs,
    sourceChunkIds: [
      'skills.qa_processes',
      'skills.requirements_shift_left',
      'skills.api_integrations',
      'skills.web_mobile_qa',
      'skills.regression_documentation',
      'skills.ai_qa_automation',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: [
      'skills',
      'askoosu',
      'instagram_clone',
      'sticks_and_stones',
      'onjung',
      'nomad_market',
      'webtoon_translate',
      'portfoli_oh',
    ],
    confidence: 0.97,
  }),
  createFaqAnswer({
    id: 'faq.skills.tech_stack.default',
    legacyIds: ['faq.tech_stack.level.default'],
    intentId: 'skills.tech_stack',
    entityId: 'skills.core',
    language: 'en',
    quickLabel: 'Tech stack',
    displayQuestion:
      'What technologies does Romeo use, and where has he applied them?',
    patterns: [
      'skills',
      'skill',
      'tech stack',
      'What technologies does Romeo use, and where has he applied them?',
      'frontend backend AI skills',
      'technical skills',
    ],
    shortAnswer:
      'Romeo’s current core stack is Next.js, React, TypeScript, Spring Boot, PostgreSQL, Notion API, RAG, and Groq, with wider project-proven experience across Flutter, FastAPI, GSAP, and more.',
    defaultAnswer: [
      'A tech stack is more useful when you can see where it was actually used. Ask Romeo groups skills by project evidence instead of presenting every keyword at the same level.',
      '',
      'The current emphasis is Next.js, React, TypeScript, Tailwind CSS, Spring Boot, PostgreSQL, Notion API, RAG, and Groq. Ask Romeo connects Next.js, AI SDK, Groq, Notion RAG, and PostgreSQL, while Aigram shows Spring Boot and PostgreSQL in a fullstack SNS flow. The answer separates confident, usable, learning, and experimental levels so the breadth does not sound inflated.',
    ].join('\n'),
    renderSpec: {
      layout: 'skill_cloud',
      density: 'standard',
      leadVisual: 'SkillChipGroup',
      components: ['SkillChipGroup'],
    },
    visualBlocks: [
      {
        type: 'skillChips',
        title: 'Skills by Evidence',
        dataKey: 'skills.core',
        items: resumeProjectSkillGroupsEn,
      },
    ],
    mediaRefs,
    sourceChunkIds: [
      'skills.qa_processes',
      'skills.requirements_shift_left',
      'skills.api_integrations',
      'skills.web_mobile_qa',
      'skills.regression_documentation',
      'skills.ai_qa_automation',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: [
      'skills',
      'askoosu',
      'instagram_clone',
      'sticks_and_stones',
      'onjung',
      'nomad_market',
      'webtoon_translate',
      'portfoli_oh',
    ],
    confidence: 0.97,
  }),
  createFaqAnswer({
    id: 'faq.contact.collaboration.default',
    legacyIds: ['contact.collab.ko', 'faq.contact.default'],
    intentId: 'contact.collaboration',
    entityId: 'contact.public',
    language: 'ru',
    quickLabel: '연락/협업',
    displayQuestion:
      '우수님에게 어떻게 연락할 수 있고, 어떤 협업을 열어두고 있나요?',
    patterns: [
      '연락',
      '연락/협업',
      '우수님에게 어떻게 연락할 수 있고, 어떤 협업을 열어두고 있나요?',
      '협업하거나 연락하려면 어떻게 해요?',
      '연락처',
      'contact',
      'github',
    ],
    shortAnswer:
      '우수에게 연락하려면 이메일, LinkedIn, GitHub, Instagram을 사용할 수 있습니다.',
    defaultAnswer: [
      '우수에게 연락하려면 이메일, LinkedIn, GitHub, Instagram이 가장 깔끔합니다. AI를 붙인 웹 제품, RAG/검색 UX, 풀스택 프로토타입처럼 “아이디어를 실제로 만져지는 화면까지 끌고 가는” 협업에 특히 잘 맞습니다.',
      '',
      `- Email: ${romeoProfile.email}`,
      `- GitHub: ${romeoProfile.github}`,
      `- LinkedIn: ${romeoProfile.linkedin}`,
      `- Instagram: ${romeoProfile.instagram}`,
      `- Portfolio: ${romeoProfile.currentPortfolioUrl}`,
    ].join('\n'),
    renderSpec: {
      layout: 'contact_card',
      density: 'standard',
      leadVisual: 'ContactCard',
      components: ['ContactCard'],
    },
    visualBlocks: [
      {
        type: 'contactCard',
        title: 'Contact Romeo',
        dataKey: 'contact.public',
        items: contactActionsKo,
      },
    ],
    mediaRefs,
    sourceChunkIds: [
      'profile.qa_summary',
      'profile.qa_specialization',
      'profile.collaboration',
      'profile.contact_channels',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['profile', 'contact'],
    confidence: 0.99,
  }),
  createFaqAnswer({
    id: 'faq.contact.collaboration.default',
    legacyIds: ['contact.collab.en', 'faq.contact.default'],
    intentId: 'contact.collaboration',
    entityId: 'contact.public',
    language: 'en',
    quickLabel: 'Contact',
    displayQuestion:
      'How can I reach Romeo, and what kind of collaboration is he open to?',
    patterns: [
      'contact',
      'contacts',
      'How can I reach Romeo, and what kind of collaboration is he open to?',
      'How can I get in touch or collaborate?',
      'contact oosu',
      'github link',
    ],
    shortAnswer:
      'You can reach Romeo by email, LinkedIn, GitHub, or Instagram.',
    defaultAnswer: [
      'Email, LinkedIn, GitHub, and Instagram are the clearest ways to reach Romeo. He is a good fit for AI-connected web products, RAG/search UX, and fullstack prototypes where an idea needs to become a working screen.',
      '',
      `- Email: ${romeoProfile.email}`,
      `- GitHub: ${romeoProfile.github}`,
      `- LinkedIn: ${romeoProfile.linkedin}`,
      `- Instagram: ${romeoProfile.instagram}`,
      `- Portfolio: ${romeoProfile.currentPortfolioUrl}`,
    ].join('\n'),
    renderSpec: {
      layout: 'contact_card',
      density: 'standard',
      leadVisual: 'ContactCard',
      components: ['ContactCard'],
    },
    visualBlocks: [
      {
        type: 'contactCard',
        title: 'Contact Romeo',
        dataKey: 'contact.public',
        items: contactActionsEn,
      },
    ],
    mediaRefs,
    sourceChunkIds: [
      'profile.qa_summary',
      'profile.qa_specialization',
      'profile.collaboration',
      'profile.contact_channels',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['profile', 'contact'],
    confidence: 0.99,
  }),
  createFaqAnswer({
    id: 'faq.ai_usage.workflow.default',
    legacyIds: ['ai.usage.ko', 'faq.ai_usage.default'],
    intentId: 'ai_usage.workflow',
    entityId: 'ai.workflow',
    language: 'ru',
    quickLabel: 'AI 활용',
    displayQuestion:
      '우수님은 Claude Code, Codex, Gemini 같은 AI 도구를 실제 개발에 어떻게 활용하나요?',
    patterns: [
      'AI 활용',
      'AI 활용법',
      'ai 활용법',
      'AI 쓰는 법',
      'AI 사용법',
      '우수의 AI 활용법',
      '우수 AI 활용법',
      'AI 도구를 어떻게 활용하나요?',
      'AI를 어떻게 쓰나요?',
      'AI를 어떻게 사용하나요?',
      'AI로 어떻게 개발하나요?',
      '우수님은 Claude Code, Codex, Gemini 같은 AI 도구를 실제 개발에 어떻게 활용하나요?',
      'Claude Code Gemini CLI Codex',
      'ai 실제 개발 활용',
    ],
    shortAnswer:
      '우수는 AI를 기획, 구현, 디버깅, 문서화를 빠르게 연결하는 개발 파트너처럼 사용합니다.',
    defaultAnswer: [
      '우수는 AI를 단순 질문 도구가 아니라 개발 파트너에 가깝게 사용합니다.',
      '',
      'Claude Code, Gemini CLI, Codex 같은 도구로 요구사항을 쪼개고, 코드 구조를 탐색하고, 구현·검증·문서화를 반복합니다. 다만 AI 결과물을 그대로 믿기보다 코드 흐름을 직접 읽고, 타입 체크와 빌드, 로그, 공식 문서 대조로 검증하는 방식을 중요하게 봅니다.',
    ].join('\n'),
    detailedAnswer: [
      '우수의 AI 활용은 “AI가 대신 만든다”보다 “AI와 함께 더 빠르게 구조화하고, 사람이 검증한다”에 가깝습니다.',
      '',
      '처음에는 요구사항을 작은 단위로 쪼개고, 답변 기준과 금지할 추측을 먼저 정리합니다. 이 단계에서 Claude Code, Codex, Gemini 같은 도구는 대안을 빠르게 펼쳐보는 역할을 합니다.',
      '',
      '구현 단계에서는 코드 초안, 리팩터링 방향, 디버깅 가설, 문서화 초안을 AI와 함께 만들지만, 결과물을 그대로 붙이는 방식으로 끝내지 않습니다. 코드 흐름을 직접 읽고 타입 체크, 빌드, 실행 로그, 공식 문서 대조로 실제 동작을 확인합니다.',
      '',
      'Ask Romeo 자체도 그 방식을 보여주는 프로젝트입니다. 단순 챗봇이 아니라 FAQ cache, Notion Wiki, RAG, source badge, feedback loop를 연결해 “AI 답변이 어디에 근거하는지”까지 제품 흐름 안에 넣고 있습니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'ai_workflow',
      density: 'standard',
      leadVisual: 'AIWorkflowSteps',
      components: ['AIWorkflowSteps'],
    },
    visualBlocks: [
      {
        type: 'statelessDiagram',
        title: 'AI-assisted Development Workflow',
        dataKey: 'ai.workflow',
        items: aiWorkflowKo,
      },
    ],
    sourceChunkIds: [
      'ai.tools.current',
      'ai.workflow.validation',
      'project.askoosu.overview',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['ai.workflow', 'askoosu'],
    confidence: 0.96,
  }),
  createFaqAnswer({
    id: 'faq.ai_usage.workflow.default',
    legacyIds: ['ai.usage.en', 'faq.ai_usage.default'],
    intentId: 'ai_usage.workflow',
    entityId: 'ai.workflow',
    language: 'en',
    quickLabel: 'AI workflow',
    displayQuestion:
      'How does Romeo actually use tools like Claude Code, Codex, and Gemini in development?',
    patterns: [
      'AI workflow',
      'AI usage',
      'AI usage workflow',
      'How does Romeo use AI?',
      'How does Romeo use AI tools?',
      'How does Romeo actually use tools like Claude Code, Codex, and Gemini in development?',
      'How do you actually use AI in development?',
      'ai tools development',
    ],
    shortAnswer:
      'Romeo uses AI to connect planning, implementation, debugging, and documentation faster while keeping human review in charge.',
    defaultAnswer: [
      'Romeo uses AI less like a search box and more like a development partner.',
      '',
      'Tools such as Claude Code, Gemini CLI, and Codex help break down requirements, inspect code structure, implement changes, verify behavior, and document decisions. The important habit is not trusting generated output automatically: Romeo still reads code flow, runs checks, compares logs, and verifies against documentation.',
    ].join('\n'),
    detailedAnswer: [
      'Romeo’s AI workflow is closer to “structure faster, then verify harder” than “let AI build it for me.”',
      '',
      'At the planning stage, he breaks requirements into smaller units and defines the quality bar before asking AI tools for options. Claude Code, Codex, and Gemini are useful because they expose implementation paths quickly.',
      '',
      'During implementation, AI can draft code, suggest refactors, form debugging hypotheses, and help with documentation. But the final responsibility stays human: Romeo reads the code flow, runs type checks and builds, compares logs, and checks official docs when behavior is uncertain.',
      '',
      'Ask Romeo is the concrete proof of that workflow. It is not only a chat UI; it connects FAQ cache, Notion Wiki, RAG retrieval, source badges, and feedback loops so the answer experience remains grounded instead of becoming free-form AI copy.',
    ].join('\n'),
    renderSpec: {
      layout: 'ai_workflow',
      density: 'standard',
      leadVisual: 'AIWorkflowSteps',
      components: ['AIWorkflowSteps'],
    },
    visualBlocks: [
      {
        type: 'statelessDiagram',
        title: 'AI-assisted Development Workflow',
        dataKey: 'ai.workflow',
        items: aiWorkflowEn,
      },
    ],
    sourceChunkIds: [
      'ai.tools.current',
      'ai.workflow.validation',
      'project.askoosu.overview',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['ai.workflow', 'askoosu'],
    confidence: 0.96,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.rag.default',
    intentId: 'project.askoosu.rag',
    entityId: 'askoosu',
    language: 'ru',
    quickLabel: 'RAG 구조',
    displayQuestion:
      'Ask Romeo 안에서 Notion, RAG, Groq, PostgreSQL은 어떻게 연결되나요?',
    patterns: [
      'RAG 구조',
      'Ask Romeo 안에서 Notion, RAG, Groq, PostgreSQL은 어떻게 연결되나요?',
      'Ask Romeo RAG',
      'Notion RAG Groq PostgreSQL',
      '포트폴리오를 왜 대화형으로 만들었어요?',
    ],
    shortAnswer:
      'Ask Romeo는 채팅 UI, FAQ 캐시, Notion Wiki/RAG, PostgreSQL 검색 캐시, Groq 생성 모델을 질문 성격에 따라 연결합니다.',
    defaultAnswer: [
      'Ask Romeo는 방문자의 질문을 먼저 FAQ Answer Cache로 확인하고, 반복 질문이면 Groq 호출 없이 바로 답변합니다.',
      '',
      'FAQ로 충분하지 않은 질문은 Notion Wiki 기반 chunk와 PostgreSQL 검색 캐시를 통해 근거를 찾고, 필요한 경우에만 Groq 같은 모델 생성으로 넘어갑니다. 답변에는 source chunk id, confidence, TODO 여부 같은 메타데이터를 붙여 UI에서 근거와 fallback 상태를 확인할 수 있게 합니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'ai_workflow',
      density: 'immersive',
      leadVisual: 'AIWorkflowSteps',
      components: ['AIWorkflowSteps', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'statelessDiagram',
        title: 'Ask Romeo Answer Flow',
        dataKey: 'askoosu.rag.workflow',
        items: ragWorkflowKo,
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'project.askoosu.architecture',
      'rag.routing',
      'faq.answer_cache',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'rag'],
    confidence: 0.96,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.rag.default',
    intentId: 'project.askoosu.rag',
    entityId: 'askoosu',
    language: 'en',
    quickLabel: 'RAG system',
    displayQuestion:
      'How do Notion, RAG, Groq, and PostgreSQL work together inside Ask Romeo?',
    patterns: [
      'RAG system',
      'How do Notion, RAG, Groq, and PostgreSQL work together inside Ask Romeo?',
      'Ask Romeo RAG',
      'Notion RAG Groq PostgreSQL',
      'Why build this portfolio as a conversation?',
    ],
    shortAnswer:
      'Ask Romeo connects chat UI, FAQ cache, Notion Wiki/RAG, PostgreSQL retrieval cache, and Groq generation depending on the question type.',
    defaultAnswer: [
      'Ask Romeo checks the FAQ Answer Cache first, so repeated questions can return a grounded answer without calling Groq.',
      '',
      'When the FAQ is not enough, it searches Notion Wiki chunks through a PostgreSQL-backed retrieval cache and only then uses a model such as Groq when generation is needed. The answer carries metadata such as source chunk IDs, confidence, and TODO state so the UI can show evidence and fallback status.',
    ].join('\n'),
    renderSpec: {
      layout: 'ai_workflow',
      density: 'immersive',
      leadVisual: 'AIWorkflowSteps',
      components: ['AIWorkflowSteps', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'statelessDiagram',
        title: 'Ask Romeo Answer Flow',
        dataKey: 'askoosu.rag.workflow',
        items: ragWorkflowEn,
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'project.askoosu.architecture',
      'rag.routing',
      'faq.answer_cache',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'rag'],
    confidence: 0.96,
  }),
  createFaqAnswer({
    id: 'faq.profile.intro.default',
    legacyIds: ['profile.intro.ko'],
    intentId: 'profile.intro',
    entityId: 'profile.summary',
    language: 'ru',
    quickLabel: 'Кто ты?',
    displayQuestion:
      'Кто такой Romeo и чем он занимается? Расскажи коротко о себе.',
    patterns: [
      'Кто ты?',
      'Кто такой Romeo',
      'Расскажи коротко о себе',
      'кто такой romeo и чем он занимается',
      'расскажи о себе',
      'Who are you?',
    ],
    shortAnswer:
      'Romeo Timony — Fullstack QA/AI engineer. Специализируется на качестве ПО, автоматизации тестирования и внедрении AI в инженерные процессы.',
    defaultAnswer: [
      'Специализируюсь на современных веб-приложениях, автоматизации тестирования и внедрении AI в процессы разработки.',
      '',
      'Работаю на стыке frontend, backend и quality engineering — проектирую архитектуру, надёжные API, автоматизацию и применяю LLM, RAG и AI-ассистентов, чтобы быстрее и увереннее выпускать продукт.',
      '',
      'Предпочитаю инженерный подход: сначала понять задачу, затем выбрать самое простое и надёжное решение, которое легко поддерживать и масштабировать.',
    ].join('\n'),
    renderSpec: {
      layout: 'profile_hero',
      density: 'standard',
      leadVisual: 'ProfileHeroCard',
      components: ['ProfileHeroCard'],
    },
    visualBlocks: [
      { type: 'profileCard', title: 'Romeo Timony', dataKey: 'profile.summary' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'profile.summary',
      'profile.strengths',
      'project.askoosu.overview',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['profile', 'career'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.profile.intro.default',
    legacyIds: ['profile.intro.en'],
    intentId: 'profile.intro',
    entityId: 'profile.summary',
    language: 'en',
    quickLabel: 'Who are you?',
    displayQuestion:
      'Who is Romeo, and what kind of engineer is he? Give a short intro.',
    patterns: [
      'Who are you?',
      'Who is Romeo',
      'About Romeo',
      'what kind of engineer is Romeo',
      'candidate overview',
      'tell me about yourself',
    ],
    shortAnswer:
      'Romeo Timony is a Fullstack QA/AI engineer focused on software quality, test automation, and integrating AI into engineering workflows.',
    defaultAnswer: [
      'I specialize in modern web apps, test automation, and integrating AI into development workflows.',
      '',
      'I work at the intersection of frontend, backend, and quality engineering — designing architectures, reliable APIs, automation, and applying LLM, RAG, and AI assistants to ship faster with confidence.',
      '',
      'I prefer an engineering approach: understand the problem first, then choose the simplest reliable solution that is easy to maintain and scale.',
    ].join('\n'),
    renderSpec: {
      layout: 'profile_hero',
      density: 'standard',
      leadVisual: 'ProfileHeroCard',
      components: ['ProfileHeroCard'],
    },
    visualBlocks: [
      { type: 'profileCard', title: 'Romeo Timony', dataKey: 'profile.summary' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'profile.summary',
      'profile.strengths',
      'project.askoosu.overview',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['profile', 'career'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.career.oosu_salon_closed.default',
    legacyIds: ['career.oosu_salon_closed.ko'],
    intentId: 'career.oosu_salon_closed',
    entityId: 'career.oosu_salon',
    language: 'ru',
    quickLabel: '우수살롱',
    displayQuestion: '와인바는 왜 그만뒀나요?',
    patterns: [
      '와인바는 왜 그만뒀지',
      '와인바 왜 그만뒀나요',
      '우수살롱은 왜 닫았나요',
      '우수살롱 왜 닫았어',
      '폐업 이유',
      '창업 경험은 어떻게 끝났나요',
    ],
    shortAnswer:
      '우수살롱은 단순한 실패담이라기보다, 오프라인 운영의 한계와 사용자 경험을 직접 배운 시간입니다. 이후 개발은 더 확장 가능하고 반복 가능한 방식으로 문제를 해결하기 위한 선택이었습니다.',
    defaultAnswer: [
      '좋은 질문입니다. 와인바를 그만둔 이유를 단순히 "사업 실패"로만 보는 건 정확하지 않습니다. 우수살롱은 고객 경험, 브랜드, 공간, 메뉴, 운영 리스크를 직접 배운 시간이었고, 동시에 오프라인 비즈니스가 시간과 장소에 얼마나 강하게 묶이는지도 체감한 경험이었습니다.',
      '',
      '운영 후반에는 반복적인 운영 부담과 시장 변화가 겹치면서, 같은 에너지를 더 확장 가능하고 자동화 가능한 문제 해결에 쓰고 싶다는 판단이 커졌습니다. 그래서 개발은 도피가 아니라, 사용자의 문제를 더 반복 가능하고 확장 가능한 방식으로 풀기 위한 전환에 가까웠습니다.',
      '',
      '제품 개발 관점에서는 이 경험이 여전히 남아 있습니다. 어떤 문장이 신뢰를 주는지, 어떤 경험이 다시 방문하게 만드는지, 운영 리스크가 실제 비즈니스에 어떻게 영향을 주는지를 더 현실적으로 보게 만들었기 때문입니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'experience_bridge',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'career.oosu_salon',
      'career.oosu_salon_closed',
      'career.transition',
      'project.uncorked',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      ...sharedGuardrails,
      'Do not frame Romeo Salon only as failure. Connect it to user, brand, service, and operating-risk learning.',
      'Avoid private medical details or emotional storytelling unless the user explicitly asks.',
    ],
    matchedEntityIds: ['career', 'career.oosu_salon', 'project.uncorked'],
    confidence: 0.95,
  }),
  createFaqAnswer({
    id: 'faq.career.oosu_salon_closed.default',
    legacyIds: ['career.oosu_salon_closed.en'],
    intentId: 'career.oosu_salon_closed',
    entityId: 'career.oosu_salon',
    language: 'en',
    quickLabel: 'Romeo Salon',
    displayQuestion: 'Why did Romeo close the wine bar?',
    patterns: [
      'Why did Romeo close the wine bar?',
      'Why did Romeo stop Romeo Salon?',
      'Why did Romeo Salon close?',
      'wine bar career story',
      'why did the business end',
    ],
    shortAnswer:
      'Romeo Salon is not just an unrelated business story. It was where Romeo learned customer experience, brand operation, service constraints, and operating risk before moving toward more scalable software work.',
    defaultAnswer: [
      'That is a fair question. Romeo does not frame the wine bar only as a failed business. Romeo Salon was a period of learning customer experience, brand, space, menu, and operating risk directly, while also seeing how strongly an offline business can be tied to time and place.',
      '',
      'In the later stage, repetitive operating pressure and market changes made it clearer that he wanted to solve problems in a more scalable and repeatable way. Programming was not an escape from that experience. It was a move toward building systems that can keep working beyond one physical location.',
      '',
      'That background still matters in product work. It helps Romeo read which message feels trustworthy, what kind of experience makes people return, and how operating risk affects a real service.',
    ].join('\n'),
    renderSpec: {
      layout: 'experience_bridge',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'career.oosu_salon',
      'career.oosu_salon_closed',
      'career.transition',
      'project.uncorked',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      ...sharedGuardrails,
      'Do not frame Romeo Salon only as failure. Connect it to user, brand, service, and operating-risk learning.',
      'Avoid private medical details or emotional storytelling unless the user explicitly asks.',
    ],
    matchedEntityIds: ['career', 'career.oosu_salon', 'project.uncorked'],
    confidence: 0.95,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.overview.default',
    legacyIds: ['project.askoosu.ko'],
    intentId: 'project.askoosu.overview',
    entityId: 'askoosu',
    language: 'ru',
    quickLabel: 'Ask Romeo',
    displayQuestion:
      'Ask Romeo는 어떤 문제의식에서 시작했고, 왜 대화형 포트폴리오로 만들었나요?',
    patterns: [
      'Ask Romeo',
      'Ask Romeo 프로젝트를 설명해줘',
      'Ask Romeo는 어떤 문제의식에서 시작했고, 왜 대화형 포트폴리오로 만들었나요?',
      'askoosu 설명',
      'ask oosu 프로젝트',
    ],
    shortAnswer:
      'Ask Romeo는 방문자가 스크롤 대신 질문으로 우수의 프로젝트와 기술 스택을 탐색하는 AI-connected 대화형 포트폴리오입니다.',
    defaultAnswer: [
      'Ask Romeo는 우수의 2026 대화형 AI 포트폴리오입니다.',
      '',
      `방문자는 ${romeoProfile.currentPortfolioUrl}에서 스크롤 대신 질문으로 프로젝트와 경험을 탐색할 수 있습니다. 구조는 Next.js App Router 기반 프론트엔드와 API Route Handler, Notion Wiki, PostgreSQL RAG cache, Groq 생성 모델을 연결한 형태입니다.`,
      '',
      '핵심 의도는 포트폴리오가 단순 소개 페이지가 아니라, 프론트엔드·백엔드·DB·AI orchestration·홈서버 배포 역량을 한 화면에서 증명하는 것입니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'project_deep_dive',
      density: 'standard',
      leadVisual: 'ProjectDeepDivePanel',
      components: [
        'ProjectDeepDivePanel',
        'AIWorkflowSteps',
        'SourceBadgeList',
      ],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Ask Romeo',
        dataKey: 'project.askoosu',
        items: [representativeProjectsKo[0]],
      },
      {
        type: 'statelessDiagram',
        title: 'Answer Flow',
        dataKey: 'askoosu.rag.workflow',
        items: ragWorkflowKo,
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.askoosu.overview',
      'project.askoosu.architecture',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.overview.default',
    legacyIds: ['project.askoosu.en'],
    intentId: 'project.askoosu.overview',
    entityId: 'askoosu',
    language: 'en',
    quickLabel: 'Ask Romeo',
    displayQuestion:
      'What problem led to Ask Romeo, and why did Romeo build it as a conversational portfolio?',
    patterns: [
      'Ask Romeo',
      'Explain the Ask Romeo project',
      'What problem led to Ask Romeo, and why did Romeo build it as a conversational portfolio?',
      'what is askoosu',
    ],
    shortAnswer:
      'Ask Romeo is an AI-connected conversational portfolio where visitors explore projects and skills by asking questions instead of scrolling.',
    defaultAnswer: [
      'Ask Romeo is Romeo’s 2026 conversational AI portfolio.',
      '',
      `At ${romeoProfile.currentPortfolioUrl}, visitors can explore projects and experience by asking questions instead of scrolling through a static portfolio. The system connects a Next.js App Router frontend, API Route Handlers, a Notion Wiki, PostgreSQL-backed RAG cache, and Groq generation.`,
      '',
      'The point is to make the portfolio itself demonstrate frontend, backend, database, AI orchestration, and home-server deployment ability.',
    ].join('\n'),
    renderSpec: {
      layout: 'project_deep_dive',
      density: 'standard',
      leadVisual: 'ProjectDeepDivePanel',
      components: [
        'ProjectDeepDivePanel',
        'AIWorkflowSteps',
        'SourceBadgeList',
      ],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Ask Romeo',
        dataKey: 'project.askoosu',
        items: [representativeProjectsEn[0]],
      },
      {
        type: 'statelessDiagram',
        title: 'Answer Flow',
        dataKey: 'askoosu.rag.workflow',
        items: ragWorkflowEn,
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.askoosu.overview',
      'project.askoosu.architecture',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.project.instagram.learned.default',
    legacyIds: ['project.instagram.ko'],
    intentId: 'project.instagram.learned',
    entityId: 'instagram_clone',
    language: 'ru',
    quickLabel: 'Aigram',
    displayQuestion:
      'Instagram Clone을 혼자 만들면서 풀스택 개발에 대해 무엇을 배웠나요?',
    patterns: [
      'Instagram Clone',
      'Instagram Clone에서 뭘 배웠나요?',
      'Instagram Clone을 혼자 만들면서 풀스택 개발에 대해 무엇을 배웠나요?',
      'instagram clone 배운 점',
      '인스타그램 클론',
    ],
    shortAnswer:
      'Instagram Clone은 우수가 SNS의 데이터/API/UI 흐름을 풀스택으로 직접 연결해본 프로젝트입니다.',
    defaultAnswer: [
      'Instagram Clone은 우수가 SNS의 핵심 흐름을 풀스택으로 직접 연결해 본 프로젝트입니다.',
      '',
      '피드, 팔로우, 댓글 같은 기능을 만들면서 React UI만이 아니라 Spring Boot API, PostgreSQL 데이터 구조, 배포된 프론트와 백엔드의 연결까지 경험했습니다. 그래서 “화면을 잘 만드는 개발자”에서 “데이터와 API 흐름까지 생각하는 개발자”로 확장하는 근거가 됩니다.',
      '',
      'Live: https://aigram.oosu.dev',
    ].join('\n'),
    renderSpec: {
      layout: 'project_deep_dive',
      density: 'standard',
      leadVisual: 'ProjectDeepDivePanel',
      components: ['ProjectDeepDivePanel', 'SkillChipGroup', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Aigram',
        dataKey: 'project.instagram_clone',
        items: [representativeProjectsKo[1]],
      },
      {
        type: 'skillChips',
        title: 'Fullstack Evidence',
        dataKey: 'skills.fullstack',
        items: [skillGroupsKo[1]],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.instagram_clone.overview',
      'project.instagram_clone.learned',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['instagram_clone'],
    confidence: 0.96,
  }),
  createFaqAnswer({
    id: 'faq.project.instagram.learned.default',
    legacyIds: ['project.instagram.en'],
    intentId: 'project.instagram.learned',
    entityId: 'instagram_clone',
    language: 'en',
    quickLabel: 'Aigram',
    displayQuestion:
      'What did building Instagram Clone teach Romeo about fullstack development?',
    patterns: [
      'Instagram Clone',
      'What did you learn from Instagram Clone?',
      'What did building Instagram Clone teach Romeo about fullstack development?',
      'instagram clone learning',
    ],
    shortAnswer:
      'Instagram Clone shows Romeo connecting SNS data, API, and UI flows as a solo fullstack project.',
    defaultAnswer: [
      'Instagram Clone shows Romeo’s fullstack practice around core SNS flows.',
      '',
      'By building feed, follow, and comment features, he worked across React UI, Spring Boot APIs, PostgreSQL data structure, and deployed frontend/backend connectivity. It is evidence that he is moving beyond frontend-only work into product and system flow.',
      '',
      'Live: https://aigram.oosu.dev',
    ].join('\n'),
    renderSpec: {
      layout: 'project_deep_dive',
      density: 'standard',
      leadVisual: 'ProjectDeepDivePanel',
      components: ['ProjectDeepDivePanel', 'SkillChipGroup', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Aigram',
        dataKey: 'project.instagram_clone',
        items: [representativeProjectsEn[1]],
      },
      {
        type: 'skillChips',
        title: 'Fullstack Evidence',
        dataKey: 'skills.fullstack',
        items: [skillGroupsEn[1]],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.instagram_clone.overview',
      'project.instagram_clone.learned',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['instagram_clone'],
    confidence: 0.96,
  }),
  createFaqAnswer({
    id: 'faq.project.sticks.importance.default',
    legacyIds: ['project.sticks.ko'],
    intentId: 'project.sticks.importance',
    entityId: 'sticks_and_stones',
    language: 'ru',
    quickLabel: 'Sticks & Stones',
    displayQuestion:
      'Sticks & Stones 프로젝트가 우수님의 포트폴리오에서 중요한 이유는 무엇인가요?',
    patterns: [
      'Sticks & Stones',
      'Sticks & Stones 프로젝트가 왜 중요한가요?',
      'Sticks & Stones 프로젝트가 우수님의 포트폴리오에서 중요한 이유는 무엇인가요?',
      'sticks stones 중요',
      '스틱스앤스톤스',
    ],
    shortAnswer:
      'Sticks & Stones는 실서비스 브랜드 사이트를 현대적인 프론트엔드로 옮긴 경험이라는 점에서 중요합니다.',
    defaultAnswer: [
      'Sticks & Stones는 실서비스 마이그레이션 경험이라는 점에서 중요합니다.',
      '',
      '단순 연습 프로젝트가 아니라 기존 WordPress 기반 홈페이지를 TypeScript/Vite 기반으로 옮기며, 실제 브랜드 사이트의 구조와 배포를 다룬 작업입니다. 그래서 우수가 “실제 사용자와 운영 맥락이 있는 웹사이트”를 다뤄봤다는 근거가 됩니다.',
      '',
      'Live: https://stks.oosu.dev',
    ].join('\n'),
    renderSpec: {
      layout: 'project_deep_dive',
      density: 'standard',
      leadVisual: 'ProjectDeepDivePanel',
      components: ['ProjectDeepDivePanel', 'ImageCard', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Sticks & Stones',
        dataKey: 'project.sticks_and_stones',
        items: [representativeProjectsKo[2]],
      },
      {
        type: 'imageCard',
        title: 'Project image',
        items: [
          {
            image: 'project.sticks.cover',
            caption: 'Project screenshot asset pending',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: ['project.sticks_and_stones.overview'],
    hasTodo: true,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['sticks_and_stones'],
    confidence: 0.96,
  }),
  createFaqAnswer({
    id: 'faq.project.sticks.importance.default',
    legacyIds: ['project.sticks.en'],
    intentId: 'project.sticks.importance',
    entityId: 'sticks_and_stones',
    language: 'en',
    quickLabel: 'Sticks & Stones',
    displayQuestion:
      "Why does the Sticks & Stones project matter in Romeo's portfolio?",
    patterns: [
      'Sticks & Stones',
      'Why does the Sticks & Stones project matter?',
      "Why does the Sticks & Stones project matter in Romeo's portfolio?",
      'sticks and stones project',
    ],
    shortAnswer:
      'Sticks & Stones matters because it is real-service migration work, not just a practice project.',
    defaultAnswer: [
      'Sticks & Stones matters because it is real service migration work, not just a practice project.',
      '',
      'Romeo migrated a WordPress-based company homepage into a TypeScript/Vite frontend, handling the structure and deployment of a real brand site. It shows practical web delivery in an operational context.',
      '',
      'Live: https://stks.oosu.dev',
    ].join('\n'),
    renderSpec: {
      layout: 'project_deep_dive',
      density: 'standard',
      leadVisual: 'ProjectDeepDivePanel',
      components: ['ProjectDeepDivePanel', 'ImageCard', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Sticks & Stones',
        dataKey: 'project.sticks_and_stones',
        items: [representativeProjectsEn[2]],
      },
      {
        type: 'imageCard',
        title: 'Project image',
        items: [
          {
            image: 'project.sticks.cover',
            caption: 'Project screenshot asset pending',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: ['project.sticks_and_stones.overview'],
    hasTodo: true,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['sticks_and_stones'],
    confidence: 0.96,
  }),
  createFaqAnswer({
    id: 'faq.project.portfoliooh_vs_askoosu.default',
    intentId: 'project.portfoliooh_vs_askoosu',
    entityId: 'portfoli_oh',
    language: 'ru',
    quickLabel: 'Portfoli-Oh! vs Ask Romeo',
    displayQuestion: 'Portfoli-Oh!와 Ask Romeo는 어떤 점이 다른가요?',
    patterns: [
      'Portfoli-Oh!와 Ask Romeo는 어떤 점이 다른가요?',
      'Portfoli-Oh!의 한계가 Ask Romeo로 어떻게 이어졌나요?',
      'portfoli-oh askoosu 차이',
      'old portfolio vs Ask Romeo',
      'before after portfolio',
    ],
    shortAnswer:
      'Portfoli-Oh!는 인터랙션 중심의 프론트엔드 아카이브였고, Ask Romeo는 질문 중심의 AI/RAG 포트폴리오입니다.',
    defaultAnswer: [
      'Portfoli-Oh!는 우수가 프론트엔드 인터랙션을 많이 실험했던 2025 포트폴리오이고, Ask Romeo는 그 경험을 바탕으로 만든 2026 대화형 AI 포트폴리오입니다.',
      '',
      'Portfoli-Oh!에서는 GSAP, Three.js, Lottie, 커스텀 커서, JSON 키워드 매칭 챗봇처럼 “보여줄 수 있는 것”을 많이 넣었습니다. 배운 점은 컸지만 기능이 늘수록 방문자가 무엇을 봐야 하는지 흐름이 흐려질 수 있다는 한계도 보였습니다.',
      '',
      'Ask Romeo는 그 반성에서 출발해 “더 많이 보여주기”보다 “더 빨리 묻고 찾게 하기”를 우선합니다. 그래서 FAQ cache, Notion Wiki, RAG, source badge, contextual quick question처럼 정보 구조와 답변 신뢰도를 중심에 둡니다.',
    ].join('\n'),
    detailedAnswer: [
      'Portfoli-Oh!와 Ask Romeo의 차이는 단순히 2025 포트폴리오와 2026 포트폴리오의 차이가 아니라, 우수의 제품 사고가 어떻게 바뀌었는지를 보여줍니다.',
      '',
      'Portfoli-Oh!는 프론트엔드 학습 아카이브에 가까웠습니다. 애니메이션, 3D, 하이라이터, JSON 챗봇 등 여러 인터랙션을 넣으면서 구현 경험을 쌓았지만, 데이터가 커질수록 JSON 기반 챗봇 유지보수가 어려워지고 방문자 입장에서는 탐색 방향이 흐려지는 문제가 생겼습니다.',
      '',
      'Ask Romeo는 그 문제를 정보 구조로 다시 푼 프로젝트입니다. 방문자가 특정 섹션을 오래 스크롤하지 않아도 질문으로 바로 들어가고, FAQ cache와 RAG가 질문 성격에 맞게 답변을 라우팅합니다. 그래서 Ask Romeo는 “인터랙션을 많이 만든 포트폴리오”가 아니라 “질문과 근거로 탐색하는 포트폴리오”에 가깝습니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'comparison_grid',
      density: 'standard',
      leadVisual: 'ComparisonGrid',
      components: ['ComparisonGrid', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'comparisonTable',
        title: 'Portfoli-Oh! → Ask Romeo',
        dataKey: 'project.portfoliooh_vs_askoosu',
        items: [
          {
            leftTitle: 'Portfoli-Oh! 2025',
            rightTitle: 'Ask Romeo 2026',
            rows: [
              {
                label: '중심',
                left: '인터랙션과 프론트엔드 실험',
                right: '질문 중심 정보 탐색',
              },
              {
                label: '답변 구조',
                left: 'JSON 키워드 매칭 챗봇',
                right: 'FAQ cache + Notion RAG',
              },
              {
                label: '배운 점',
                left: '기능이 많아질수록 흐름이 흐려질 수 있음',
                right: '맥락형 질문과 근거 표시가 더 중요함',
              },
            ],
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.portfolio_oh.story',
      'project.askoosu.fact',
      'rag.answer_routing',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['portfoli_oh', 'askoosu'],
    confidence: 0.97,
  }),
  createFaqAnswer({
    id: 'faq.project.portfoliooh_vs_askoosu.default',
    intentId: 'project.portfoliooh_vs_askoosu',
    entityId: 'portfoli_oh',
    language: 'en',
    quickLabel: 'Portfoli-Oh! vs Ask Romeo',
    displayQuestion: 'What is the difference between Portfoli-Oh! and Ask Romeo?',
    patterns: [
      'What is the difference between Portfoli-Oh! and Ask Romeo?',
      'How did the limits of Portfoli-Oh! lead to Ask Romeo?',
      'portfoli-oh askoosu difference',
      'old portfolio vs Ask Romeo',
      'before after portfolio',
    ],
    shortAnswer:
      'Portfoli-Oh! was an interaction-heavy frontend archive; Ask Romeo is a question-first AI/RAG portfolio.',
    defaultAnswer: [
      'Portfoli-Oh! was Romeo’s 2025 portfolio for experimenting with frontend interactions, while Ask Romeo is the 2026 conversational AI portfolio built from those lessons.',
      '',
      'Portfoli-Oh! included GSAP, Three.js, Lottie, a custom cursor, highlighting, and a JSON keyword-matching chatbot. It was valuable as a learning archive, but it also showed that too many features can make visitors lose direction.',
      '',
      'Ask Romeo starts from that reflection. Instead of adding more visual effects, it focuses on helping visitors ask, find, and trust answers faster through FAQ cache, Notion Wiki, RAG, source badges, and contextual quick questions.',
    ].join('\n'),
    detailedAnswer: [
      'The difference between Portfoli-Oh! and Ask Romeo is also a difference in product thinking.',
      '',
      'Portfoli-Oh! was closer to a frontend learning archive. Romeo tried animation, 3D, highlighting, and a JSON chatbot, which created useful implementation experience. But as the content grew, the JSON chatbot became harder to maintain and the visitor journey became less clear.',
      '',
      'Ask Romeo reframes that problem as information architecture. Visitors can ask instead of scrolling through every section, and the system routes questions through FAQ cache and RAG depending on the intent. That makes Ask Romeo less about showing every possible interaction and more about conversational discovery with evidence.',
    ].join('\n'),
    renderSpec: {
      layout: 'comparison_grid',
      density: 'standard',
      leadVisual: 'ComparisonGrid',
      components: ['ComparisonGrid', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'comparisonTable',
        title: 'Portfoli-Oh! → Ask Romeo',
        dataKey: 'project.portfoliooh_vs_askoosu',
        items: [
          {
            leftTitle: 'Portfoli-Oh! 2025',
            rightTitle: 'Ask Romeo 2026',
            rows: [
              {
                label: 'Center',
                left: 'Interaction and frontend experiments',
                right: 'Question-first information discovery',
              },
              {
                label: 'Answer model',
                left: 'JSON keyword-matching chatbot',
                right: 'FAQ cache + Notion RAG',
              },
              {
                label: 'Lesson',
                left: 'Too many features can blur the visitor flow',
                right: 'Contextual questions and evidence matter more',
              },
            ],
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.portfolio_oh.story',
      'project.askoosu.fact',
      'rag.answer_routing',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['portfoli_oh', 'askoosu'],
    confidence: 0.97,
  }),
  createFaqAnswer({
    id: 'faq.portfolio.creator.default',
    intentId: 'portfolio.creator',
    entityId: 'project.askoosu',
    language: 'ru',
    quickLabel: '제작자',
    displayQuestion: '이 포트폴리오는 누가 만들었어?',
    patterns: [
      '이 포트폴리오는 누가 만들었어?',
      '이 포트폴리오 사이트는 누가 만들었어?',
      '이 포트폴리오 사이트 누가 만들었어?',
      '이 사이트 누가 만들었어?',
      '이 웹사이트 누가 만들었어?',
      '이 포트폴리오 제작자',
      '이 포트폴리오 만든 사람',
      '포트폴리오 만든 사람 누구야?',
      '포트폴리오 사이트 제작자',
      '포트폴리오 사이트 만든 사람',
      '사이트 제작자 누구야?',
      '웹사이트 제작자 누구야?',
      '만든 사람 누구야?',
      '개발자는 누구야?',
      '누가 개발했어?',
      'Ask Romeo 누가 만들었어?',
      'oosu.dev 누가 만들었어?',
    ],
    shortAnswer: 'Ask Romeo는 Romeo Timony이 직접 기획하고 개발했습니다.',
    defaultAnswer: [
      '이 포트폴리오 Ask Romeo는 Romeo Timony이 직접 기획하고 개발한 AI-connected conversational portfolio입니다. 정적인 포트폴리오를 단순히 보여주는 방식이 아니라, 방문자가 질문을 통해 프로젝트, 기술 스택, 커리어, 협업 가능성을 탐색할 수 있도록 만든 대화형 포트폴리오입니다.',
      '',
      '기술적으로는 Next.js 기반 채팅 UI, FAQ answer cache, Notion Wiki/RAG 구조, PostgreSQL 검색 캐시, Groq 기반 답변 생성을 연결하는 방향으로 설계되었습니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'profile_hero',
      density: 'standard',
      leadVisual: 'ProfileHeroCard',
      components: ['MarkdownBlock', 'SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    mediaRefs,
    sourceChunkIds: [
      'profile.summary',
      'project.askoosu.overview',
      'project.askoosu.story',
      'project.portfolio_oh.story',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['profile.summary', 'project.askoosu'],
    confidence: 0.99,
  }),
  createFaqAnswer({
    id: 'faq.portfolio.creator.default',
    intentId: 'portfolio.creator',
    entityId: 'project.askoosu',
    language: 'en',
    quickLabel: 'Creator',
    displayQuestion: 'Who made this portfolio?',
    patterns: [
      'who made this portfolio?',
      'who built this portfolio?',
      'who made this portfolio site?',
      'who built this portfolio site?',
      'who made this site?',
      'who built this site?',
      'who created this website?',
      'who created this portfolio website?',
      'who developed Ask Romeo?',
      'who is the creator of this portfolio?',
      'who is the creator of this site?',
      'who made oosu.dev?',
      'who built Ask Romeo?',
    ],
    shortAnswer: 'Ask Romeo was planned and built by Romeo Timony.',
    defaultAnswer: [
      'Ask Romeo was planned and built by Romeo Timony as an AI-connected conversational portfolio. Instead of making visitors scroll through a static portfolio, it lets them ask questions and explore projects, skills, career background, and collaboration fit through chat.',
      '',
      'Technically, it connects a Next.js chat UI, FAQ answer cache, Notion Wiki/RAG structure, PostgreSQL search cache, and Groq-based answer generation.',
    ].join('\n'),
    renderSpec: {
      layout: 'profile_hero',
      density: 'standard',
      leadVisual: 'ProfileHeroCard',
      components: ['MarkdownBlock', 'SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    mediaRefs,
    sourceChunkIds: [
      'profile.summary',
      'project.askoosu.overview',
      'project.askoosu.story',
      'project.portfolio_oh.story',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['profile.summary', 'project.askoosu'],
    confidence: 0.99,
  }),
  createFaqAnswer({
    id: 'faq.profile.business_to_dev.default',
    legacyIds: ['business.connection.ko'],
    intentId: 'profile.business_to_dev',
    entityId: 'career.business_to_dev',
    language: 'ru',
    quickLabel: '비즈니스 → 개발',
    displayQuestion:
      '비즈니스와 고객 경험은 우수님의 개발 방식에 어떻게 연결되나요?',
    patterns: [
      '비즈니스 → 개발',
      '비즈니스와 고객 경험은 우수님의 개발 방식에 어떻게 연결되나요?',
      '비즈니스 경험이 개발에 어떻게 연결되나요?',
      '경영학 개발 도움',
      '우수살롱 개발 연결',
    ],
    shortAnswer:
      '비즈니스 경험은 우수가 무엇을 만들지, 왜 그렇게 설계해야 하는지 판단하는 데 연결됩니다.',
    defaultAnswer: [
      '우수의 비즈니스 경험은 개발에서 “무엇을 만들지”와 “왜 그렇게 설계해야 하는지”를 판단하는 데 연결됩니다.',
      '',
      '경영학 배경, GfK Korea의 POS 데이터 분석 컨설팅, 우수살롱 운영 경험은 사용자·시장·운영 관점에서 문제를 보는 힘을 줬습니다. 그래서 기능 구현만 보는 것이 아니라 서비스 구조, 우선순위, 실제 사용 맥락을 함께 생각하는 편입니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'experience_bridge',
      density: 'standard',
      leadVisual: 'ExperienceBridgeDiagram',
      components: [
        'ExperienceBridgeDiagram',
        'SkillChipGroup',
        'SourceBadgeList',
      ],
    },
    visualBlocks: [
      {
        type: 'statelessDiagram',
        title: 'Experience Bridge',
        dataKey: 'career.bridge',
        items: [
          {
            title: 'Customer / Market',
            description: '고객과 시장을 읽는 관점',
          },
          { title: 'UX / Service', description: '경험 흐름과 우선순위 정리' },
          {
            title: 'Fullstack / AI',
            description: '질문, 데이터, API, 답변을 연결',
          },
        ],
      },
      {
        type: 'skillChips',
        title: 'Bridge Skills',
        dataKey: 'skills.business',
        items: [skillGroupsKo[3]],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'career.business_background',
      'career.oosu_salon',
      'profile.strengths',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['career', 'oosu_salon'],
    confidence: 0.94,
  }),
  createFaqAnswer({
    id: 'faq.profile.business_to_dev.default',
    legacyIds: ['business.connection.en'],
    intentId: 'profile.business_to_dev',
    entityId: 'career.business_to_dev',
    language: 'en',
    quickLabel: 'Business to dev',
    displayQuestion:
      "How does Romeo's business and customer experience background shape the way he builds products?",
    patterns: [
      'Business to dev',
      "How does Romeo's business and customer experience background shape the way he builds products?",
      'How does business experience connect to development?',
      'business background development',
    ],
    shortAnswer:
      "Romeo's business background helps him decide what to build and why a product should be structured that way.",
    defaultAnswer: [
      'Romeo’s business background helps him think about what to build and why a product should be structured a certain way.',
      '',
      'His business major, POS data consulting experience at GfK Korea, and Romeo Salon operation experience give him a user, market, and operations lens. That makes him look beyond implementation details toward service structure, priority, and real usage context.',
    ].join('\n'),
    renderSpec: {
      layout: 'experience_bridge',
      density: 'standard',
      leadVisual: 'ExperienceBridgeDiagram',
      components: [
        'ExperienceBridgeDiagram',
        'SkillChipGroup',
        'SourceBadgeList',
      ],
    },
    visualBlocks: [
      {
        type: 'statelessDiagram',
        title: 'Experience Bridge',
        dataKey: 'career.bridge',
        items: [
          {
            title: 'Customer / Market',
            description: 'Understanding people and market context',
          },
          {
            title: 'UX / Service',
            description: 'Structuring journeys and priorities',
          },
          {
            title: 'Fullstack / AI',
            description: 'Connecting questions, data, APIs, and answers',
          },
        ],
      },
      {
        type: 'skillChips',
        title: 'Bridge Skills',
        dataKey: 'skills.business',
        items: [skillGroupsEn[3]],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'career.business_background',
      'career.oosu_salon',
      'profile.strengths',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['career', 'oosu_salon'],
    confidence: 0.94,
  }),
  createFaqAnswer({
    id: 'faq.profile.public_life_notes.default',
    legacyIds: ['fun.public_notes.ko'],
    intentId: 'profile.public_life_notes',
    entityId: 'profile.public_life_notes',
    language: 'ru',
    quickLabel: '작업 취향',
    displayQuestion:
      '우수님의 작업 성향이나 공개 가능한 취향을 가볍게 알려줄 수 있나요?',
    patterns: [
      '작업 취향',
      '취미',
      '취향',
      'Fun',
      '우수님 취미',
      '우수님은 어떤 취향이 있어요?',
      '우수님의 작업 성향이나 공개 가능한 취향을 가볍게 알려줄 수 있나요?',
      '우수살롱',
      '일하는 스타일',
    ],
    shortAnswer:
      '우수의 Fun 영역은 사생활보다 공개 가능한 작업 성향과 감각적인 인터페이스 취향을 중심으로 다룹니다.',
    defaultAnswer: [
      'Fun 쪽으로 살짝 새면, 우수는 새로운 도구나 감각적인 인터페이스를 만져보는 걸 꽤 좋아하는 편이에요.',
      '',
      '다만 이 Wiki에서는 사적인 정보가 아니라 공개 가능한 작업 취향까지만 다룹니다. ROMEO SALON 운영 경험, 시각적인 실험, 도구를 실제 흐름으로 연결하려는 습관은 프로젝트를 풀어가는 방식과도 이어져요. 더 유용한 이야기는 “이 사람이 프로젝트를 어떻게 구조화하나?” 쪽에서 이어가볼게요.',
    ].join('\n'),
    renderSpec: {
      layout: 'experience_bridge',
      density: 'standard',
      leadVisual: 'ImageCard',
      components: ['ImageCard', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'imageCard',
        title: 'Public Life Notes',
        dataKey: 'profile.public_life_notes',
        items: [
          {
            image: 'life.oosu_salon.cover',
            caption:
              'ROMEO SALON 운영 경험은 고객 경험과 서비스 감각으로 이어집니다.',
          },
          {
            image: 'life.sensory_interests.cover',
            caption:
              '감각적인 인터페이스와 도구 실험을 프로젝트 맥락으로 연결합니다.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'career.oosu_salon',
      'profile.public_interests',
      'profile.strengths',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['profile', 'career', 'oosu_salon'],
    confidence: 0.91,
  }),
  createFaqAnswer({
    id: 'faq.profile.public_life_notes.default',
    legacyIds: ['fun.public_notes.en'],
    intentId: 'profile.public_life_notes',
    entityId: 'profile.public_life_notes',
    language: 'en',
    quickLabel: 'Work taste',
    displayQuestion:
      'Can you share Romeo’s working style or public personal interests lightly?',
    patterns: [
      'fun',
      'hobbies',
      'work taste',
      'working style',
      'public interests',
      'Can you share Romeo’s working style or public personal interests lightly?',
      'oosu salon',
    ],
    shortAnswer:
      'The Fun area should stay around public working taste and interface curiosity, not private life.',
    defaultAnswer: [
      'A light Fun detour: Romeo seems drawn to new tools, tactile interfaces, and visual experiments.',
      '',
      'This Wiki keeps that public and work-adjacent. ROMEO SALON, sensory UI references, and tooling experiments are useful because they explain how Romeo approaches projects: not as abstract tech lists, but as experiences someone has to actually touch and understand.',
    ].join('\n'),
    renderSpec: {
      layout: 'experience_bridge',
      density: 'standard',
      leadVisual: 'ImageCard',
      components: ['ImageCard', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'imageCard',
        title: 'Public Life Notes',
        dataKey: 'profile.public_life_notes',
        items: [
          {
            image: 'life.oosu_salon.cover',
            caption:
              'ROMEO SALON connects to customer experience and service taste.',
          },
          {
            image: 'life.sensory_interests.cover',
            caption:
              'Visual interface and tool experiments feed back into project work.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'career.oosu_salon',
      'profile.public_interests',
      'profile.strengths',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['profile', 'career', 'oosu_salon'],
    confidence: 0.91,
  }),
  createFaqAnswer({
    id: 'faq.link.resume.default',
    legacyIds: ['resume.url.ko'],
    intentId: 'link.resume',
    entityId: 'contact.resume',
    language: 'ru',
    quickLabel: '이력서',
    displayQuestion: '이력서나 경력 정보를 볼 수 있는 링크가 준비되어 있나요?',
    patterns: [
      '이력서',
      '이력서나 경력 정보를 볼 수 있는 링크가 준비되어 있나요?',
      '이력서 URL 알려줘',
      '이력서 링크',
      'resume url',
      'cv',
    ],
    shortAnswer: '현재 공개 이력서 URL은 아직 준비 중입니다.',
    defaultAnswer:
      '현재 공개 이력서 URL은 아직 준비 중입니다. 공개 가능한 한국어/영어 이력서 링크가 준비되면 Ask Romeo와 Notion Wiki에 연결할 예정입니다.',
    renderSpec: {
      layout: 'contact_card',
      density: 'compact',
      leadVisual: 'ContactCard',
      components: ['ContactCard', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'contactCard',
        title: 'Public contact only',
        dataKey: 'contact.public',
        items: contactActionsKo,
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: ['profile.links.resume_policy'],
    hasTodo: true,
    freshness: 'needs_update',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['profile', 'career'],
    confidence: 0.99,
  }),
  createFaqAnswer({
    id: 'faq.link.resume.default',
    legacyIds: ['resume.url.en'],
    intentId: 'link.resume',
    entityId: 'contact.resume',
    language: 'en',
    quickLabel: 'Resume',
    displayQuestion:
      "Is Romeo's resume or detailed career profile ready to share?",
    patterns: [
      'resume',
      "Is Romeo's resume or detailed career profile ready to share?",
      'resume URL',
      'resume link',
      'CV link',
    ],
    shortAnswer: 'The public resume URL is not available yet.',
    defaultAnswer:
      'The public resume URL is not available yet. Once Korean and English resume links are ready, they will be connected to Ask Romeo and the Notion Wiki.',
    renderSpec: {
      layout: 'contact_card',
      density: 'compact',
      leadVisual: 'ContactCard',
      components: ['ContactCard', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'contactCard',
        title: 'Public contact only',
        dataKey: 'contact.public',
        items: contactActionsEn,
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: ['profile.links.resume_policy'],
    hasTodo: true,
    freshness: 'needs_update',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['profile', 'career'],
    confidence: 0.99,
  }),
  createFaqAnswer({
    id: 'faq.link.live_url.default',
    legacyIds: ['live-url.policy.ko'],
    intentId: 'link.live_url',
    entityId: 'links.public',
    language: 'ru',
    quickLabel: '라이브 URL',
    displayQuestion:
      '지금 바로 확인할 수 있는 포트폴리오나 프로젝트 링크가 있나요?',
    patterns: [
      '라이브 URL',
      '지금 바로 확인할 수 있는 포트폴리오나 프로젝트 링크가 있나요?',
      '라이브 URL이 없는 프로젝트는 어떻게 답해야 하나요?',
      '라이브 URL 없는 프로젝트',
      'private 프로젝트',
    ],
    shortAnswer:
      '바로 확인 가능한 공개 링크는 Ask Romeo, Instagram Clone, Sticks & Stones, Portfoli-Oh! 중심으로 안내할 수 있습니다.',
    defaultAnswer: [
      '바로 확인할 수 있는 공개 링크는 확인된 것만 안내합니다.',
      '',
      `- Ask Romeo: ${romeoProfile.currentPortfolioUrl}`,
      '- Instagram Clone: https://aigram.oosu.dev',
      '- Sticks & Stones: https://stks.oosu.dev',
      `- Portfoli-Oh!: ${romeoProfile.legacyPortfolioUrl}`,
      '',
      '라이브 URL이 없는 프로젝트는 배포된 것처럼 단정하지 않고, 공개 여부나 준비 중 상태를 그대로 말하는 것이 원칙입니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'contact_card',
      density: 'standard',
      leadVisual: 'ProjectShowcaseCards',
      components: ['ProjectShowcaseCards', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Live links',
        dataKey: 'projects.public_links',
        items: representativeProjectsKo,
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: ['project.links.public', 'policy.live_url'],
    hasTodo: false,
    freshness: 'time_sensitive',
    guardrails: sharedGuardrails,
    matchedEntityIds: [
      'askoosu',
      'instagram_clone',
      'sticks_and_stones',
      'policy.guardrail',
    ],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.link.live_url.default',
    legacyIds: ['live-url.policy.en'],
    intentId: 'link.live_url',
    entityId: 'links.public',
    language: 'en',
    quickLabel: 'Live links',
    displayQuestion: 'Which portfolio or project links can I open right now?',
    patterns: [
      'Live links',
      'Which portfolio or project links can I open right now?',
      'How should you answer projects without live URLs?',
      'project without live url',
      'private project',
    ],
    shortAnswer:
      'Verified public links can be shared for Ask Romeo, Instagram Clone, Sticks & Stones, and Portfoli-Oh!.',
    defaultAnswer: [
      'Only verified public links should be shown as live.',
      '',
      `- Ask Romeo: ${romeoProfile.currentPortfolioUrl}`,
      '- Instagram Clone: https://aigram.oosu.dev',
      '- Sticks & Stones: https://stks.oosu.dev',
      `- Portfoli-Oh!: ${romeoProfile.legacyPortfolioUrl}`,
      '',
      'Projects without live URLs should not be described as deployed. TODO, needs_review, or private evidence should stay unconfirmed.',
    ].join('\n'),
    renderSpec: {
      layout: 'contact_card',
      density: 'standard',
      leadVisual: 'ProjectShowcaseCards',
      components: ['ProjectShowcaseCards', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Live links',
        dataKey: 'projects.public_links',
        items: representativeProjectsEn,
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: ['project.links.public', 'policy.live_url'],
    hasTodo: false,
    freshness: 'time_sensitive',
    guardrails: sharedGuardrails,
    matchedEntityIds: [
      'askoosu',
      'instagram_clone',
      'sticks_and_stones',
      'policy.guardrail',
    ],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.visual_ui.default',
    intentId: 'project.askoosu.visual_ui',
    entityId: 'askoosu',
    language: 'ru',
    quickLabel: 'UI/UX 방향',
    displayQuestion: 'Ask Romeo의 UI/UX는 어떤 방향으로 설계했나요?',
    patterns: [
      'Ask Romeo의 UI는 어떻게 설계했나요?',
      'Ask Romeo UI UX 방향',
      '대화형 포트폴리오 UX 설명',
      'Ask Romeo visual ui',
      'Ask Romeo design direction',
    ],
    shortAnswer:
      'Ask Romeo의 UI/UX는 긴 포트폴리오를 읽게 하기보다 궁금한 것을 바로 묻게 하는 방향으로 설계했습니다.',
    defaultAnswer: [
      'Ask Romeo의 UI/UX는 정적인 포트폴리오를 대화형 정보 탐색 경험으로 바꾸는 방향으로 설계되었습니다.',
      '',
      '핵심은 사용자가 긴 스크롤 페이지를 읽는 대신, 궁금한 것을 바로 질문하고 빠르게 답에 도달하게 만드는 것입니다. 그래서 중심 인터페이스는 채팅이지만, 답변이 전부 텍스트로만 끝나지 않도록 추천 질문, 프로젝트 카드, source/confidence badge, quick action 같은 시각 블록을 함께 두는 방향으로 보고 있습니다.',
      '',
      'Portfoli-Oh!를 만들면서 인터랙션이 많아질수록 사용자가 길을 잃을 수 있다는 점을 배웠기 때문에, Ask Romeo에서는 “더 화려하게”보다 “더 빨리 이해되게”를 우선합니다.',
    ].join('\n'),
    detailedAnswer: [
      'Ask Romeo의 UI/UX 방향은 세 가지 원칙으로 정리할 수 있습니다.',
      '',
      '첫째, 질문 중심 탐색입니다. 방문자가 About, Projects, Skills를 순서대로 읽지 않아도 궁금한 질문 하나로 바로 원하는 맥락에 들어갈 수 있어야 합니다.',
      '',
      '둘째, 텍스트와 시각 블록을 섞은 답변입니다. 대표 프로젝트, 기술 스택, 연락/협업, Ask Romeo 구조 같은 질문은 카드, 칩, 단계형 다이어그램으로 보여줄 때 이해가 더 빠릅니다.',
      '',
      '셋째, 과한 인터랙션보다 명확한 정보 위계입니다. Ask Romeo는 “보기 좋은 포트폴리오”보다 “질문하기 쉬운 포트폴리오”에 가깝습니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'project_deep_dive',
      density: 'standard',
      leadVisual: 'AIWorkflowSteps',
      components: ['AIWorkflowSteps', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'statelessDiagram',
        title: 'Ask Romeo UI Principles',
        dataKey: 'askoosu.ui_principles',
        items: [
          {
            title: '질문 중심 탐색',
            description: '긴 스크롤 대신 질문 하나로 원하는 맥락에 진입합니다.',
          },
          {
            title: '텍스트 + 시각 블록',
            description:
              '답변마다 카드, 칩, badge를 조합해 이해 속도를 높입니다.',
          },
          {
            title: '정보 위계 우선',
            description: '효과보다 빠른 이해와 명확한 탐색 흐름을 우선합니다.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'project.askoosu.fact',
      'project.askoosu.story',
      'project.askoosu.rag_principles',
      'project.portfolio_oh.story',
      'ui.answer_experience',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'portfoli_oh'],
    confidence: 0.97,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.visual_ui.default',
    intentId: 'project.askoosu.visual_ui',
    entityId: 'askoosu',
    language: 'en',
    quickLabel: 'UI/UX direction',
    displayQuestion: 'What was the UI/UX direction behind Ask Romeo?',
    patterns: [
      'What was the UI direction of Ask Romeo?',
      'Ask Romeo UI UX',
      'conversational portfolio UX',
      'Ask Romeo visual ui',
      'Ask Romeo design direction',
    ],
    shortAnswer:
      'Ask Romeo is designed around letting people ask immediately rather than making them read a long portfolio.',
    defaultAnswer: [
      'Ask Romeo’s UI/UX is designed to turn a static portfolio into a conversational information-discovery experience.',
      '',
      'The goal is to help visitors reach answers quickly by asking natural questions instead of scrolling through long sections. Chat is the main interface, but the answer experience should not be text-only: recommended questions, project cards, source/confidence badges, and quick actions should support understanding.',
      '',
      'Portfoli-Oh! taught that too many interactions can make people lose their way, so Ask Romeo prioritizes “easier to understand faster” over “more flashy.”',
    ].join('\n'),
    detailedAnswer: [
      'The UI/UX direction of Ask Romeo has three principles.',
      '',
      'First, question-first navigation. Visitors should not need to read About, Projects, and Skills in a fixed order.',
      '',
      'Second, blended text and visual answer blocks. High-value answers are easier to understand as cards, chips, badges, or step diagrams.',
      '',
      'Third, clear information hierarchy over excessive interaction. Ask Romeo is meant to be a portfolio that is easy to ask, not just easy to look at.',
    ].join('\n'),
    renderSpec: {
      layout: 'project_deep_dive',
      density: 'standard',
      leadVisual: 'AIWorkflowSteps',
      components: ['AIWorkflowSteps', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'statelessDiagram',
        title: 'Ask Romeo UI Principles',
        dataKey: 'askoosu.ui_principles',
        items: [
          {
            title: 'Question-first navigation',
            description:
              'A visitor can enter the right context through one question.',
          },
          {
            title: 'Text + visual blocks',
            description:
              'Cards, chips, and badges make answers easier to scan.',
          },
          {
            title: 'Hierarchy first',
            description:
              'The interface prioritizes understanding over visual spectacle.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'project.askoosu.fact',
      'project.askoosu.story',
      'project.askoosu.rag_principles',
      'project.portfolio_oh.story',
      'ui.answer_experience',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'portfoli_oh'],
    confidence: 0.97,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.deployment.default',
    intentId: 'project.askoosu.deployment',
    entityId: 'askoosu',
    language: 'ru',
    quickLabel: '배포 / 운영',
    displayQuestion: 'Ask Romeo는 어떻게 배포하고 운영하나요?',
    patterns: [
      'Ask Romeo 배포',
      'Ask Romeo는 어디서 돌아가나요?',
      '포트폴리오 운영 구조',
      'deployment of Ask Romeo',
      'home server 배포',
    ],
    shortAnswer:
      'Ask Romeo는 oosu.dev를 canonical live URL로 두고, Notion Wiki 원본과 Next.js 앱, RAG 캐시, 답변 생성을 연결하는 구조를 지향합니다.',
    defaultAnswer: [
      'Ask Romeo는 `https://oosu.dev`를 canonical live URL로 두고 운영하는 방향입니다.',
      '',
      '콘텐츠 원본은 Notion Wiki이고, 서비스 레이어에서는 Next.js 기반 프론트엔드와 API route handler, RAG 검색 캐시용 데이터 저장소, Groq 기반 답변 생성을 연결합니다. 운영 관점에서는 Notion 내용을 주기적으로 sync해 chunk를 갱신하고, 자주 묻는 질문은 FAQ cache로 먼저 처리해 API 비용과 응답 지연을 줄입니다.',
    ].join('\n'),
    detailedAnswer: [
      'Ask Romeo의 배포/운영 구조는 네 층으로 볼 수 있습니다.',
      '',
      '첫째, Notion Wiki를 편집 가능한 콘텐츠 원본으로 둡니다. 둘째, Next.js 앱이 채팅 UI, 추천 질문, 시각 답변 블록, API route handler를 담당합니다.',
      '',
      '셋째, `/api/rag/sync`, `/api/rag/search`, `/api/chat`이 FAQ cache, RAG, Groq 흐름을 조립합니다. 넷째, 외부에는 `oosu.dev` 같은 canonical URL을 우선 노출하고 홈서버와 Cloudflare Tunnel 구조를 기준으로 접근성을 확보합니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'ai_workflow',
      density: 'standard',
      leadVisual: 'AIWorkflowSteps',
      components: ['AIWorkflowSteps', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'statelessDiagram',
        title: 'Deployment / Ops Layers',
        dataKey: 'askoosu.deployment',
        items: [
          {
            title: 'Content source',
            description: 'Notion Wiki를 원본 CMS로 사용합니다.',
          },
          {
            title: 'App layer',
            description: 'Next.js UI와 API route handler가 요청을 처리합니다.',
          },
          {
            title: 'Data / RAG',
            description:
              'PostgreSQL 검색 캐시와 source chunk metadata를 활용합니다.',
          },
          {
            title: 'Domain / Infra',
            description:
              'oosu.dev canonical URL과 홈서버 운영 원칙을 따릅니다.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'links.public',
      'rag.frontend_backend_db',
      'rag.notion_sync.rules',
      'rag.groq.guardrails',
      'project.askoosu.fact',
    ],
    hasTodo: false,
    freshness: 'time_sensitive',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'rag'],
    confidence: 0.94,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.deployment.default',
    intentId: 'project.askoosu.deployment',
    entityId: 'askoosu',
    language: 'en',
    quickLabel: 'Deployment',
    displayQuestion: 'How is Ask Romeo deployed and operated?',
    patterns: [
      'How is Ask Romeo deployed?',
      'Where does Ask Romeo run?',
      'portfolio deployment',
      'deployment of Ask Romeo',
      'home server deployment',
    ],
    shortAnswer:
      'Ask Romeo uses oosu.dev as the canonical public URL and connects Notion Wiki, the Next.js app, retrieval cache, and answer generation around it.',
    defaultAnswer: [
      'Ask Romeo is intended to run with `https://oosu.dev` as the canonical live URL.',
      '',
      'The original content lives in Notion Wiki, while the service layer connects a Next.js frontend, route handlers, a retrieval/cache data layer, and Groq-based answer generation. Operationally, Notion content should be synced into chunks, and frequently asked questions should be handled by the FAQ cache first to reduce cost and latency.',
    ].join('\n'),
    detailedAnswer: [
      'The deployment and operations model of Ask Romeo can be understood in four layers.',
      '',
      'First, Notion Wiki is the editable source of truth. Second, the Next.js app handles chat UI, suggested questions, visual answer blocks, and route handlers.',
      '',
      'Third, `/api/rag/sync`, `/api/rag/search`, and `/api/chat` assemble FAQ cache, RAG, and Groq. Fourth, the public experience should prioritize a canonical domain such as `oosu.dev`, with a home-server and Cloudflare Tunnel style approach for clean access.',
    ].join('\n'),
    renderSpec: {
      layout: 'ai_workflow',
      density: 'standard',
      leadVisual: 'AIWorkflowSteps',
      components: ['AIWorkflowSteps', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'statelessDiagram',
        title: 'Deployment / Ops Layers',
        dataKey: 'askoosu.deployment',
        items: [
          {
            title: 'Content source',
            description: 'Notion Wiki acts as the editable CMS.',
          },
          {
            title: 'App layer',
            description: 'Next.js UI and route handlers process requests.',
          },
          {
            title: 'Data / RAG',
            description:
              'PostgreSQL retrieval cache and source metadata support answers.',
          },
          {
            title: 'Domain / Infra',
            description:
              'The public experience centers on the oosu.dev canonical URL.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'links.public',
      'rag.frontend_backend_db',
      'rag.notion_sync.rules',
      'rag.groq.guardrails',
      'project.askoosu.fact',
    ],
    hasTodo: false,
    freshness: 'time_sensitive',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'rag'],
    confidence: 0.94,
  }),
  createFaqAnswer({
    id: 'faq.tech.rag_vs_faq_cache.default',
    intentId: 'tech.rag_vs_faq_cache',
    entityId: 'rag',
    language: 'ru',
    quickLabel: 'RAG vs Cache',
    displayQuestion: 'FAQ cache와 RAG는 어떻게 역할이 다른가요?',
    patterns: [
      'FAQ cache와 RAG 차이',
      'cache랑 rag는 뭐가 달라요?',
      '왜 둘 다 필요해요?',
      'faq cache vs rag',
      'retrieval vs cache',
    ],
    shortAnswer:
      'FAQ cache는 반복 질문에 검증된 답을 바로 반환하고, RAG는 고정하기 어려운 질문에 관련 chunk를 검색해 답을 조립합니다.',
    defaultAnswer: [
      'FAQ cache와 RAG는 역할이 다릅니다.',
      '',
      'FAQ cache는 반복적으로 자주 들어오고 답변 형태가 안정적인 질문에 대해 Groq 호출 없이 바로 모범답안을 반환하는 구조입니다. 반면 RAG는 질문이 더 구체적이거나 조합형일 때 Notion Wiki chunk를 검색해 근거를 모은 뒤 답을 조립합니다.',
      '',
      '즉, FAQ cache는 속도와 비용 절감, RAG는 유연성과 근거 검색을 담당합니다.',
    ].join('\n'),
    detailedAnswer: [
      'Ask Romeo에서 FAQ cache와 RAG는 경쟁 관계가 아니라 역할 분담 관계입니다.',
      '',
      'FAQ cache는 모범답안 뱅크에 가깝습니다. FAQ ID, intent, patterns, short/default/detailed answer를 미리 관리하고 높은 confidence로 매칭되면 바로 반환합니다.',
      '',
      'RAG는 근거 검색 기반 설명 엔진에 가깝습니다. 질문이 길거나 여러 개념을 엮으면 관련 source chunk를 먼저 찾고 그 근거를 기반으로 답을 만듭니다. 그래서 실제 라우팅은 FAQ cache first, RAG next가 적절합니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'comparison_grid',
      density: 'standard',
      leadVisual: 'ComparisonGrid',
      components: ['ComparisonGrid', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'comparisonTable',
        title: 'FAQ cache vs RAG',
        dataKey: 'tech.rag_vs_cache',
        items: [
          {
            leftTitle: 'FAQ cache',
            rightTitle: 'RAG',
            rows: [
              {
                label: '역할',
                left: '반복 질문의 모범답안 반환',
                right: '관련 chunk 검색 후 답변 조립',
              },
              {
                label: '강점',
                left: '빠름, 저비용, 톤 안정',
                right: '유연함, 근거 기반, 조합 질문 대응',
              },
              {
                label: '사용 시점',
                left: '대표 프로젝트, 연락, 자기소개',
                right: '상세 기술, 비교, follow-up',
              },
            ],
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'rag.architecture.overview',
      'faq.cache.rules',
      'rag.answer_routing',
      'rag.groq.guardrails',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['rag', 'faq_cache'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.tech.rag_vs_faq_cache.default',
    intentId: 'tech.rag_vs_faq_cache',
    entityId: 'rag',
    language: 'en',
    quickLabel: 'RAG vs Cache',
    displayQuestion: 'What is the difference between FAQ cache and RAG?',
    patterns: [
      'Difference between FAQ cache and RAG',
      'cache vs rag',
      'Why do you need both?',
      'faq cache vs rag',
      'retrieval vs cache',
    ],
    shortAnswer:
      'FAQ cache returns verified answers for repeated questions, while RAG retrieves chunks and composes grounded answers for flexible questions.',
    defaultAnswer: [
      'FAQ cache and RAG serve different roles.',
      '',
      'FAQ cache is for repeated, stable questions and can return a prepared answer directly without calling Groq. RAG is used when a question is more specific or compositional: it retrieves relevant Notion Wiki chunks first and then assembles the answer.',
      '',
      'Cache is mainly for speed and cost reduction; RAG is for flexibility and evidence retrieval.',
    ].join('\n'),
    detailedAnswer: [
      'In Ask Romeo, FAQ cache and RAG are complementary.',
      '',
      'FAQ cache is closer to a model answer bank. Each cached item has an FAQ ID, intent, patterns, and answer variants. When a user question matches with high confidence, the system returns it immediately.',
      '',
      'RAG is closer to an evidence-driven explanation engine. Longer or compositional questions retrieve relevant source chunks before answer assembly. The best routing rule is therefore FAQ cache first, RAG next.',
    ].join('\n'),
    renderSpec: {
      layout: 'comparison_grid',
      density: 'standard',
      leadVisual: 'ComparisonGrid',
      components: ['ComparisonGrid', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'comparisonTable',
        title: 'FAQ cache vs RAG',
        dataKey: 'tech.rag_vs_cache',
        items: [
          {
            leftTitle: 'FAQ cache',
            rightTitle: 'RAG',
            rows: [
              {
                label: 'Role',
                left: 'Returns prepared answers for repeated questions',
                right: 'Retrieves chunks and assembles grounded answers',
              },
              {
                label: 'Strength',
                left: 'Fast, low-cost, stable tone',
                right: 'Flexible, evidence-based, handles follow-ups',
              },
              {
                label: 'Best for',
                left: 'Top projects, contact, intro',
                right: 'Technical detail, comparison, contextual questions',
              },
            ],
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'rag.architecture.overview',
      'faq.cache.rules',
      'rag.answer_routing',
      'rag.groq.guardrails',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['rag', 'faq_cache'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.tech.springboot.postgresql.default',
    intentId: 'tech.springboot_postgresql',
    entityId: 'tech',
    language: 'ru',
    quickLabel: 'Spring/PostgreSQL',
    displayQuestion: 'Spring Boot와 PostgreSQL은 어떤 프로젝트에서 사용했나요?',
    patterns: [
      'Spring Boot 어디에 썼어요?',
      'PostgreSQL 사용 프로젝트',
      'Spring Boot와 PostgreSQL',
      'backend stack',
      'what projects used spring boot and postgresql',
    ],
    shortAnswer:
      'Spring Boot와 PostgreSQL은 Instagram Clone에서 함께 사용했고, Ask Romeo에서는 PostgreSQL을 RAG 검색 캐시 구조로 활용합니다.',
    defaultAnswer: [
      'Spring Boot와 PostgreSQL을 가장 본격적으로 다룬 프로젝트는 Instagram Clone입니다.',
      '',
      '이 프로젝트에서 Spring Boot 백엔드와 PostgreSQL을 기반으로 사용자, 게시글, 댓글, 팔로우, 검색 같은 SNS의 관계형 데이터 흐름을 설계하고 구현했습니다.',
      '',
      'PostgreSQL은 Ask Romeo에서도 중요합니다. Ask Romeo에서는 Notion Wiki에서 가져온 chunk를 저장하고 검색하는 RAG 캐시 구조를 PostgreSQL/pgvector 확장 가능 구조로 연결하는 방향을 보고 있습니다.',
    ].join('\n'),
    detailedAnswer: [
      'Spring Boot와 PostgreSQL은 우수의 백엔드 성장 흐름을 보여주는 기술 조합입니다.',
      '',
      'Instagram Clone에서는 Spring Boot, PostgreSQL, REST API를 기반으로 SNS 서비스의 핵심 도메인을 다뤘습니다. 사용자 계정, 게시물, 댓글, 팔로우 관계, 검색, 인증 같은 기능을 연결하면서 데이터 모델링과 API 설계가 얼마나 중요한지 체감한 프로젝트입니다.',
      '',
      'Ask Romeo에서는 PostgreSQL이 전통적인 CRUD보다 지식 chunk, metadata, source id, feedback log를 저장하고 retrieval cache로 활용하는 역할에 가깝습니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'project_showcase',
      density: 'standard',
      leadVisual: 'ProjectShowcaseCards',
      components: ['ProjectShowcaseCards', 'SkillChipGroup', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Backend / DB Usage',
        dataKey: 'tech.springboot_postgresql.projects',
        items: [
          representativeProjectsKo[1],
          {
            ...representativeProjectsKo[0],
            subtitle: 'PostgreSQL 기반 RAG 검색 캐시',
          },
        ],
      },
      {
        type: 'skillChips',
        title: 'Backend / Data Stack',
        dataKey: 'skills.backend',
        items: [skillGroupsKo[1], skillGroupsKo[2]],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.instagram_clone.fact',
      'project.instagram_clone.story',
      'project.askoosu.fact',
      'rag.db.blueprint',
      'skills.backend',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['instagram_clone', 'askoosu', 'tech'],
    confidence: 0.97,
  }),
  createFaqAnswer({
    id: 'faq.tech.springboot.postgresql.default',
    intentId: 'tech.springboot_postgresql',
    entityId: 'tech',
    language: 'en',
    quickLabel: 'Spring/PostgreSQL',
    displayQuestion: 'Which projects used Spring Boot and PostgreSQL?',
    patterns: [
      'Where did you use Spring Boot?',
      'PostgreSQL projects',
      'Spring Boot and PostgreSQL',
      'backend stack',
      'what projects used spring boot and postgresql',
    ],
    shortAnswer:
      'The clearest Spring Boot and PostgreSQL project is Instagram Clone. PostgreSQL also matters in Ask Romeo as a retrieval/cache data layer.',
    defaultAnswer: [
      'The project where Spring Boot and PostgreSQL were used together most clearly is Instagram Clone.',
      '',
      'In that project, Spring Boot and PostgreSQL were used to design and implement the relational flow behind users, posts, comments, follows, and search. PostgreSQL is also important in Ask Romeo, where it supports a retrieval/cache-oriented data structure for RAG.',
    ].join('\n'),
    detailedAnswer: [
      'Spring Boot and PostgreSQL together show an important part of Romeo’s backend growth.',
      '',
      'In Instagram Clone, Spring Boot, PostgreSQL, and REST API were used to build the core domain of an SNS product. Users, posts, comments, follows, search, and auth required data modeling and API design.',
      '',
      'In Ask Romeo, PostgreSQL plays a different role: storing knowledge chunks, metadata, source IDs, and feedback logs for retrieval-oriented AI architecture.',
    ].join('\n'),
    renderSpec: {
      layout: 'project_showcase',
      density: 'standard',
      leadVisual: 'ProjectShowcaseCards',
      components: ['ProjectShowcaseCards', 'SkillChipGroup', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'projectCards',
        title: 'Backend / DB Usage',
        dataKey: 'tech.springboot_postgresql.projects',
        items: [
          representativeProjectsEn[1],
          {
            ...representativeProjectsEn[0],
            subtitle: 'PostgreSQL-backed RAG retrieval cache',
          },
        ],
      },
      {
        type: 'skillChips',
        title: 'Backend / Data Stack',
        dataKey: 'skills.backend',
        items: [skillGroupsEn[1], skillGroupsEn[2]],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.instagram_clone.fact',
      'project.instagram_clone.story',
      'project.askoosu.fact',
      'rag.db.blueprint',
      'skills.backend',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['instagram_clone', 'askoosu', 'tech'],
    confidence: 0.97,
  }),
  createFaqAnswer({
    id: 'faq.recruiter.first_30_days.default',
    intentId: 'recruiter.first_30_days',
    entityId: 'recruiter',
    language: 'ru',
    quickLabel: 'First 30 days',
    displayQuestion: '입사 후 첫 30일 동안 어떻게 기여할 수 있나요?',
    patterns: [
      '입사 후 30일',
      '첫 달에 어떻게 기여할 수 있나요?',
      'onboarding plan',
      'first 30 days contribution',
      '처음 합류하면 뭘 할 수 있어요',
    ],
    shortAnswer:
      '첫 30일에는 도메인과 제품 흐름을 빠르게 이해하고, 작은 개선부터 바로 실행에 옮기는 방식으로 기여할 수 있습니다.',
    defaultAnswer: [
      '입사 후 첫 30일에는 무리하게 큰 변화를 만들기보다, 팀의 제품 맥락과 사용자 흐름을 빠르게 이해하고 바로 개선 가능한 지점을 찾는 방식으로 기여할 수 있습니다.',
      '',
      '우수는 새로운 도구나 구조를 빠르게 익히고 작은 기능이나 UX 개선, 문서화, 문제 구조화부터 실행하는 데 강점이 있습니다. 첫 달의 역할은 “모든 걸 바꾸는 사람”이라기보다 “빠르게 이해하고 바로 도움이 되는 사람”에 가깝습니다.',
    ].join('\n'),
    detailedAnswer: [
      '첫 30일 기여 방식은 세 단계입니다.',
      '',
      '0-10일에는 제품을 직접 써보고 사용자 여정, 핵심 지표, 팀이 중요하게 보는 문제를 파악합니다.',
      '',
      '10-20일에는 정보 구조, 마이크로카피, 작은 프론트엔드 개선, 간단한 API 연동, 문서화 같은 작은 결과물을 만듭니다.',
      '',
      '20-30일에는 AI, 검색, 추천, 운영 효율화와 연결될 수 있는 확장 포인트를 제안합니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'timeline',
      density: 'standard',
      leadVisual: 'CareerTimeline',
      components: ['CareerTimeline', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'timeline',
        title: 'First 30 days',
        dataKey: 'recruiter.first_30_days',
        items: [
          {
            title: '0-10일',
            description: '제품과 도메인, 사용자 흐름을 빠르게 흡수합니다.',
          },
          {
            title: '10-20일',
            description: '작은 UX/프론트엔드/문서화 개선을 바로 실행합니다.',
          },
          {
            title: '20-30일',
            description:
              'AI/search/운영 효율화 확장 포인트를 구조화해 제안합니다.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'profile.strengths',
      'profile.collaboration',
      'career.target_role',
      'project.askoosu.fact',
      'project.instagram_clone.fact',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['recruiter', 'profile', 'career'],
    confidence: 0.96,
  }),
  createFaqAnswer({
    id: 'faq.recruiter.first_30_days.default',
    intentId: 'recruiter.first_30_days',
    entityId: 'recruiter',
    language: 'en',
    quickLabel: 'First 30 days',
    displayQuestion: 'How could you contribute in your first 30 days?',
    patterns: [
      'First 30 days',
      'How would you contribute in your first month?',
      'onboarding plan',
      'first 30 days contribution',
      'what would you do first',
    ],
    shortAnswer:
      'In the first 30 days, Romeo could learn the product and domain quickly, then ship small improvements right away.',
    defaultAnswer: [
      'In the first 30 days, the best contribution would not be trying to change everything at once, but understanding the product context and user flow quickly, then finding areas that can be improved immediately.',
      '',
      'Romeo is strong at learning new tools and structures fast, and turning that understanding into small execution such as UX fixes, documentation, FAQ/help structure, or a small feature.',
    ].join('\n'),
    detailedAnswer: [
      'Romeo’s contribution in the first 30 days can be divided into three stages.',
      '',
      '0-10 days: absorb context by using the product, understanding the user journey, and learning the team’s important problems.',
      '',
      '10-20 days: ship small improvements such as microcopy, layout, information hierarchy, frontend components, simple API integration, or documentation.',
      '',
      '20-30 days: propose extension points around AI, search, recommendation, or operational efficiency.',
    ].join('\n'),
    renderSpec: {
      layout: 'timeline',
      density: 'standard',
      leadVisual: 'CareerTimeline',
      components: ['CareerTimeline', 'SourceBadgeList'],
    },
    visualBlocks: [
      {
        type: 'timeline',
        title: 'First 30 days',
        dataKey: 'recruiter.first_30_days',
        items: [
          {
            title: '0-10 days',
            description: 'Absorb product, domain, and user-flow context.',
          },
          {
            title: '10-20 days',
            description:
              'Ship small UX, frontend, API, or documentation improvements.',
          },
          {
            title: '20-30 days',
            description: 'Propose AI/search/operations extension points.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'profile.strengths',
      'profile.collaboration',
      'career.target_role',
      'project.askoosu.fact',
      'project.instagram_clone.fact',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['recruiter', 'profile', 'career'],
    confidence: 0.96,
  }),
  createFaqAnswer({
    id: 'faq.collaboration.project_yes.default',
    intentId: 'collaboration.project_yes',
    entityId: 'collaboration',
    language: 'ru',
    quickLabel: 'Say yes project',
    displayQuestion: '어떤 프로젝트라면 바로 함께하고 싶나요?',
    patterns: [
      '어떤 프로젝트에 관심 있어요?',
      '바로 하고 싶은 프로젝트',
      'what projects would make you say yes',
      '어떤 팀과 잘 맞나요?',
    ],
    shortAnswer:
      'AI가 실제 사용자 경험 안에 들어가고, 문제 정의와 구현이 함께 필요한 프로젝트라면 바로 관심이 갑니다.',
    defaultAnswer: [
      '바로 함께하고 싶어지는 프로젝트는 “AI가 실제로 사용자 경험을 바꾸는 프로젝트”입니다.',
      '',
      '단순히 모델을 붙여보는 데서 끝나는 게 아니라, 사용자가 더 빨리 찾고, 덜 헤매고, 더 나은 결정을 하게 만드는 흐름이 있는 제품에 특히 끌립니다. 그래서 RAG/search, AI application development, 풀스택 웹서비스, 사용자 질문이 많은 제품, 운영 효율을 높이는 도구형 서비스에 관심이 큽니다.',
    ].join('\n'),
    detailedAnswer: [
      '바로 yes 하고 싶은 프로젝트에는 세 가지 공통점이 있습니다.',
      '',
      '첫째, AI가 실제 서비스 경험 안에 들어가 있어야 합니다. 둘째, 문제 정의와 구현이 동시에 중요해야 합니다. 셋째, 산업/제조 데이터, 고객 경험, 검색/지식관리, 내부 도구처럼 현실 문제와 연결되어 있으면 더 좋습니다.',
    ].join('\n'),
    renderSpec: {
      layout: 'contact_card',
      density: 'standard',
      leadVisual: 'ContactCard',
      components: ['ContactCard', 'SkillChipGroup', 'CtaButtons'],
    },
    visualBlocks: [
      {
        type: 'contactCard',
        title: 'Collaboration Fit',
        dataKey: 'collaboration.project_yes',
        items: contactActionsKo,
      },
      {
        type: 'skillChips',
        title: 'Project types',
        dataKey: 'collaboration.project_types',
        items: [
          {
            group: 'Say yes areas',
            skills: [
              'RAG/Search',
              'AI Application',
              'Fullstack Web',
              'Industrial AI',
              'Internal tools',
            ],
            evidence: ['Ask Romeo', 'Instagram Clone', 'Business/UX background'],
          },
        ],
      },
      { type: 'ctaButtons', items: contactActionsKo },
    ],
    sourceChunkIds: [
      'career.target_role',
      'profile.current_focus',
      'profile.contact',
      'project.askoosu.fact',
      'profile.business_to_dev',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['collaboration', 'career', 'askoosu'],
    confidence: 0.96,
  }),
  createFaqAnswer({
    id: 'faq.collaboration.project_yes.default',
    intentId: 'collaboration.project_yes',
    entityId: 'collaboration',
    language: 'en',
    quickLabel: 'Say yes project',
    displayQuestion: 'What kind of project would make you say yes immediately?',
    patterns: [
      'What kind of project interests you?',
      'Projects you would say yes to',
      'what projects would make you say yes',
      'what teams fit you well',
    ],
    shortAnswer:
      'Projects where AI becomes part of the real user experience, and where problem definition and implementation both matter, are the most exciting.',
    defaultAnswer: [
      'The kind of project that would make Romeo say yes immediately is one where AI genuinely improves the user experience.',
      '',
      'Not just attaching a model for the sake of it, but creating a flow where users can find faster, get less lost, or make better decisions. RAG/search, AI application development, fullstack web services, knowledge-heavy products, and operational efficiency tools are especially interesting.',
    ].join('\n'),
    detailedAnswer: [
      'There are a few common traits in the projects Romeo would say yes to immediately.',
      '',
      'First, AI should live inside the real service experience. Second, problem definition and implementation should both matter. Third, the work should connect to real-world problems such as industrial data, customer experience, knowledge management, or internal productivity.',
    ].join('\n'),
    renderSpec: {
      layout: 'contact_card',
      density: 'standard',
      leadVisual: 'ContactCard',
      components: ['ContactCard', 'SkillChipGroup', 'CtaButtons'],
    },
    visualBlocks: [
      {
        type: 'contactCard',
        title: 'Collaboration Fit',
        dataKey: 'collaboration.project_yes',
        items: contactActionsEn,
      },
      {
        type: 'skillChips',
        title: 'Project types',
        dataKey: 'collaboration.project_types',
        items: [
          {
            group: 'Say yes areas',
            skills: [
              'RAG/Search',
              'AI Application',
              'Fullstack Web',
              'Industrial AI',
              'Internal tools',
            ],
            evidence: ['Ask Romeo', 'Instagram Clone', 'Business/UX background'],
          },
        ],
      },
      { type: 'ctaButtons', items: contactActionsEn },
    ],
    sourceChunkIds: [
      'career.target_role',
      'profile.current_focus',
      'profile.contact',
      'project.askoosu.fact',
      'profile.business_to_dev',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['collaboration', 'career', 'askoosu'],
    confidence: 0.96,
  }),
];

export function findFaqAnswerById(
  faqId: string,
  language: ChatLanguage
): FaqAnswer | null {
  const normalizedFaqId = faqId.trim();
  if (!normalizedFaqId) return null;

  return (
    FAQ_ANSWERS.find(
      (answer) =>
        answer.language === language &&
        (answer.id === normalizedFaqId ||
          answer.legacyIds?.includes(normalizedFaqId))
    ) ??
    FAQ_ANSWERS.find(
      (answer) =>
        answer.id === normalizedFaqId ||
        answer.legacyIds?.includes(normalizedFaqId)
    ) ??
    null
  );
}

export function buildAnswerParts(
  faq: FaqAnswer,
  answerVariant: 'short' | 'default' | 'detailed' = 'default'
): FaqAnswerPart[] {
  const visualBlocks = faq.visualBlocks ?? [];
  const leadVisual = faq.renderSpec?.leadVisual;
  const leadBlock = leadVisual
    ? visualBlocks.find((block) => componentNameForBlock(block) === leadVisual)
    : null;
  const otherBlocks = visualBlocks.filter(
    (block) => block !== leadBlock && block.type !== 'sourceBadges'
  );
  const sourceBlock = visualBlocks.find(
    (block) => block.type === 'sourceBadges'
  );
  const leadBlockContainsAnswerCopy = leadBlock
    ? componentNameForBlock(leadBlock) === 'ProfileHeroCard'
    : false;
  const shouldSkipRepeatedLeadVisual =
    answerVariant === 'detailed' && leadBlock
      ? componentNameForBlock(leadBlock) === 'AIWorkflowSteps'
      : false;

  return [
    ...(leadBlock && !shouldSkipRepeatedLeadVisual
      ? [componentPartForBlock(leadBlock)]
      : []),
    ...(leadBlockContainsAnswerCopy
      ? []
      : [
          {
            type: 'markdown' as const,
            contentKey: toContentKey(answerVariant, faq),
          },
        ]),
    ...otherBlocks.map(componentPartForBlock),
    ...(sourceBlock
      ? [
          {
            type: 'sourceBadges' as const,
            sourceChunkIds: faq.sourceChunkIds,
          },
        ]
      : []),
  ];
}

function toContentKey(
  answerVariant: 'short' | 'default' | 'detailed',
  faq: FaqAnswer
) {
  if (answerVariant === 'short') return 'shortAnswer' as const;
  if (answerVariant === 'detailed' && faq.detailedAnswer) {
    return 'detailedAnswer' as const;
  }

  return 'defaultAnswer' as const;
}

function createFaqAnswer(input: FaqAnswerInput): FaqAnswer {
  const localizedInput =
    input.id === 'faq.ai_usage.workflow.default' && input.language === 'ru'
      ? {
          ...input,
          quickLabel: 'AI в работе',
          displayQuestion: 'Как вы используете AI в QA-процессе и разработке?',
          alternativeDisplayQuestions: [
            'Как AI помогает вам обеспечивать качество продукта?',
            'Как вы используете Codex, Claude Code и Gemini в QA?',
          ],
          ...qaAiWorkflowRuCopy,
          visualBlocks: [
            {
              type: 'statelessDiagram' as const,
              title: 'QA / AI: управляемый цикл качества',
              dataKey: 'qa.ai.workflow',
              items: qaAiWorkflowRu,
            },
          ],
        }
      : input;

  return {
    ...localizedInput,
    answer: localizedInput.defaultAnswer,
    cacheMode: localizedInput.cacheMode ?? 'direct_cache',
    answerSource: localizedInput.answerSource ?? 'faq_cache',
    skippedGroq: localizedInput.skippedGroq ?? true,
    visibility: localizedInput.visibility ?? 'public',
  };
}

function componentPartForBlock(block: FaqVisualBlock): FaqAnswerPart {
  return {
    type: 'component',
    component: componentNameForBlock(block),
    dataKey: block.dataKey,
    blockType: block.type,
  };
}

function componentNameForBlock(block: FaqVisualBlock) {
  const componentByType: Record<FaqVisualBlockType, string> = {
    profileCard: 'ProfileHeroCard',
    projectCards: 'ProjectShowcaseCards',
    skillChips: 'SkillChipGroup',
    timeline: 'CareerTimeline',
    comparisonTable: 'ComparisonGrid',
    statelessDiagram: 'AIWorkflowSteps',
    imageCard: 'ImageCard',
    contactCard: 'ContactCard',
    ctaButtons: 'CtaButtons',
    sourceBadges: 'SourceBadgeList',
  };

  return componentByType[block.type];
}
