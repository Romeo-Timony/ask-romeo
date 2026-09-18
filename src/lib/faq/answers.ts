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
    subtitle: 'Диалоговое AI-портфолио',
    description:
      'Текущий флагманский проект, объединяющий интерфейс чата на Next.js, базу знаний Notion Wiki, RAG-поиск, модель Groq и кэш ответов на PostgreSQL.',
    image: 'project.askoosu.cover',
    tags: ['Next.js', 'RAG', 'Groq', 'Notion', 'PostgreSQL'],
    href: romeoProfile.currentPortfolioUrl,
  },
  {
    id: 'instagram_clone',
    title: 'Aigram',
    label: 'Fullstack SNS',
    subtitle: 'Fullstack соцсеть на базе клона Instagram',
    description:
      'Учебный fullstack-проект для изучения работы с реляционными данными, Spring Boot, PostgreSQL, Next.js и базовыми AI-функциями.',
    image: 'project.aigram.cover',
    tags: ['Spring Boot', 'PostgreSQL', 'React', 'Search', 'AI'],
    href: 'https://aigram.oosu.dev',
  },
  {
    id: 'sticks_and_stones',
    title: 'Sticks & Stones',
    label: 'Real Migration',
    subtitle: 'Реконструкция и ребилд реального сайта',
    description:
      'Проект по переносу устаревшего сайта на WordPress/PHP на современный технологический стек React/Vite и TypeScript.',
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
    tags: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Vercel AI SDK',
      'OpenAI',
      'RAG',
      'PostgreSQL',
      'Docker',
    ],
    href: romeoProfile.currentPortfolioUrl,
  },
  {
    id: 'sminex_comfort',
    title: 'Sminex Comfort',
    subtitle: 'PropTech · web и mobile app',
    description:
      'QA веб- и мобильной платформы для жителей: пользовательские сценарии, API, интеграции внутренних сервисов и регрессия перед релизами.',
    image: 'project.sminex_comfort.cover',
    tags: [
      'Web & Mobile',
      'REST API',
      'Python',
      'Playwright',
      'Pytest',
      'Appium',
      'Allure TestOps',
      'PostgreSQL',
      'Kafka',
    ],
    href: 'https://comfort.sminex.com/',
  },
  {
    id: 'elme_messer',
    title: 'Elme Messer',
    subtitle: 'Enterprise · PM & QA',
    description:
      'Совмещение ролей Project Manager и QA: управление скоупом задач и спринтами (Scrum), тестирование корпоративных web-сервисов, REST API, интеграций и релизные гейты.',
    image: 'project.elme_messer.cover',
    tags: [
      'PM & QA',
      'Scrum',
      'Enterprise Platform',
      'REST API',
      'Postman',
      'PostgreSQL',
      'Sentry',
      'TestIT',
    ],
    href: 'https://elmemesser.lv/',
  },
  {
    id: 'dpd',
    title: 'DPD',
    subtitle: 'Логистика · web и mobile app',
    description:
      'QA логистических сценариев: оформление и отслеживание отправлений, API, интеграции и регрессия критичных процессов доставки.',
    image: 'project.dpd.cover',
    tags: [
      'Logistics Platform',
      'REST / SOAP API',
      'Postman',
      'SoapUI',
      'Oracle SQL',
      'RabbitMQ',
      'Microservices',
      'Regression',
    ],
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
    tags: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Vercel AI SDK',
      'OpenAI',
      'RAG',
      'PostgreSQL',
      'Docker',
    ],
    href: romeoProfile.currentPortfolioUrl,
  },
  {
    id: 'sminex_comfort',
    title: 'Sminex Comfort',
    subtitle: 'PropTech · web and mobile app',
    description:
      'QA for a resident web and mobile platform: user journeys, APIs, internal-service integrations, and release regression testing.',
    image: 'project.sminex_comfort.cover',
    tags: [
      'Web & Mobile',
      'REST API',
      'Python',
      'Playwright',
      'Pytest',
      'Appium',
      'Allure TestOps',
      'PostgreSQL',
      'Kafka',
    ],
    href: 'https://comfort.sminex.com/',
  },
  {
    id: 'elme_messer',
    title: 'Elme Messer',
    subtitle: 'Enterprise · PM & QA',
    description:
      'Dual Project Manager & QA role: managing task scopes and Scrum sprints, testing enterprise web services, REST APIs, integrations, and release quality gates.',
    image: 'project.elme_messer.cover',
    tags: [
      'PM & QA',
      'Scrum',
      'Enterprise Platform',
      'REST API',
      'Postman',
      'PostgreSQL',
      'Sentry',
      'TestIT',
    ],
    href: 'https://elmemesser.lv/',
  },
  {
    id: 'dpd',
    title: 'DPD',
    subtitle: 'Logistics · web and mobile app',
    description:
      'QA for logistics scenarios: creating and tracking shipments, APIs, integrations, and regression of critical delivery flows.',
    image: 'project.dpd.cover',
    tags: [
      'Logistics Platform',
      'REST / SOAP API',
      'Postman',
      'SoapUI',
      'Oracle SQL',
      'RabbitMQ',
      'Microservices',
      'Regression',
    ],
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

const pmQaAiWorkflowRu = [
  {
    title: 'Анализ требований (PM · Shift-Left)',
    description:
      'Декомпозиция эпиков, выявление нестыковок бизнес-логики и скрытых краевых сценариев (edge cases) с помощью LLM ещё до старта разработки.',
  },
  {
    title: 'AI-синтез проверок и тест-дизайн',
    description:
      'Генерация комбинаторных тест-кейсов, матриц покрытия, заготовок автотестов (Playwright, Pytest) и подготовка тестовых данных.',
  },
  {
    title: 'Архитектура и API-контракты',
    description:
      'Проверка изменений в коде, строгая валидация API-контрактов (REST, SOAP, Kafka), сверка со спецификацией и устранение рисков.',
  },
  {
    title: 'Автоматизация и CI/CD прогон',
    description:
      'Запуск автотестов в CI/CD (Web и Mobile Appium), статический анализ типов, проверка сборок и анализ системных логов.',
  },
  {
    title: 'Релизные гейты (Go/No-Go)',
    description:
      'Оценка критериев готовности релиза, защита продакшена от сбоев, согласование с бизнесом и пострелизный мониторинг через Sentry и Grafana.',
  },
];

const pmQaAiWorkflowEn = [
  {
    title: 'Requirements Analysis (Shift-Left)',
    description:
      'Epic decomposition, resolving business logic ambiguities, and uncovering edge cases using LLMs before code development begins.',
  },
  {
    title: 'AI Test Design & Synthesis',
    description:
      'Rapid generation of combinatorial test cases, coverage matrices, test data preparation, and autotest drafts (Playwright, Pytest).',
  },
  {
    title: 'Architecture & API Contracts',
    description:
      'Inspecting code diffs, verifying API contracts (REST, SOAP, Kafka), aligning with specifications, and mitigating structural risks.',
  },
  {
    title: 'Automation & CI/CD Runs',
    description:
      'Automated test runs (Web & Mobile Appium), static type checks, build validation, and deep log analysis in CI/CD pipelines.',
  },
  {
    title: 'Release Gates (Go/No-Go)',
    description:
      'Enforcing Go/No-Go release criteria, assessing business delivery risks, and monitoring production stability via Sentry and Grafana.',
  },
];

const ragWorkflowKo = [
  {
    title: 'Чат-интерфейс',
    description:
      'Посетитель исследует опыт и проекты Romeo через вопросы вместо долгой прокрутки страниц.',
  },
  {
    title: 'FAQ Cache & Router',
    description:
      'Семантический роутер определяет интент и для популярных вопросов мгновенно возвращает проверенный ответ из кэша.',
  },
  {
    title: 'RAG-поиск',
    description:
      'Для сложных вопросов система ищет релевантные фрагменты в базе знаний через векторный поиск в PostgreSQL (pgvector).',
  },
  {
    title: 'Model Layer & Guardrails',
    description:
      'LLM (Groq / OpenAI) формирует точный ответ строго на основе найденных фактов с проверкой ограничений и без галлюцинаций.',
  },
  {
    title: 'Rich Answer UI',
    description:
      'Ответ отображается в виде адаптивных интерактивных карточек, схем, бейджей источников и контекстных цитат.',
  },
];

const ragWorkflowEn = [
  {
    title: 'Chat UI',
    description:
      'Visitors explore Romeo’s experience and projects by asking natural questions instead of endless scrolling.',
  },
  {
    title: 'FAQ Cache & Router',
    description:
      'Semantic router matches user intent and instantly returns verified answers for frequent queries without model latency.',
  },
  {
    title: 'RAG Search',
    description:
      'For in-depth questions, the system retrieves relevant knowledge chunks via vector search in PostgreSQL (pgvector).',
  },
  {
    title: 'Model Layer & Guardrails',
    description:
      'LLMs (Groq / OpenAI) synthesize grounded answers strictly based on verified evidence with strict output guardrails.',
  },
  {
    title: 'Rich Answer UI',
    description:
      'Responses render as interactive cards, diagrams, source badges, and contextual role-based quotes.',
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
      'Покажи основные проекты Romeo и его опыт в роли Project Manager и QA.',
    patterns: [
      'проекты',
      'основные проекты',
      'три проекта',
      'покажи проекты',
      'проекты Romeo',
      'QA проекты',
      'PM проекты',
      'Sminex Elme Messer DPD',
    ],
    shortAnswer:
      'В портфолио представлены ключевые коммерческие проекты (Sminex Comfort, Elme Messer, DPD) в роли Project Manager & QA и личные разработки (Ask Romeo и др.).',
    defaultAnswer: [
      'В портфолио представлены три основных коммерческих проекта из опыта Романа (Project Manager & QA): Sminex Comfort, Elme Messer и DPD.',
      '',
      'Также в разделе «Дополнительно (AI)» вы можете посмотреть текущий проект Ask Romeo (диалоговое QA/AI-портфолио). Все карточки показывают контекст управления и обеспечения качества, технологии и ссылки на проекты.',
      '',
      '---',
      '',
      '> «Качество — это не отсутствие дефектов, а обоснованная уверенность в том, что система выдержит реальные сценарии, изменения и человеческие ошибки.»',
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
        title: 'Коммерческие проекты',
        dataKey: 'projects.representative',
        items: moreProjectsKo.slice(1),
      },
      {
        type: 'projectCards',
        title: 'Дополнительно (AI)',
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
      "Could you show Romeo's representative projects and his Project Manager & QA experience?",
    patterns: [
      'projects',
      'project',
      'top projects',
      'project overview',
      "Can you show Romeo's top three projects at a glance?",
      "Could you show Romeo's representative projects and his QA experience?",
      'representative projects',
      'best projects',
      "Which portfolio projects best show Romeo's QA experience?",
      "projects that show Romeo's experience",
      'Sminex Elme Messer DPD',
    ],
    shortAnswer:
      'The portfolio features key commercial projects (Sminex Comfort, Elme Messer, DPD) across Project Manager & QA roles and personal AI developments (Ask Romeo, etc.).',
    defaultAnswer: [
      'The portfolio features three main commercial projects from Romeo’s experience (Project Manager & QA): Sminex Comfort, Elme Messer, and DPD.',
      '',
      'Additionally, under the "Additional (AI)" section, you can explore the current Ask Romeo project (conversational QA/AI portfolio). The cards show management and quality engineering context, tech stack, and links to live services.',
      '',
      '---',
      '',
      '> "Quality is not the absence of defects, but justified confidence that the system can withstand real-world scenarios, change, and human error."',
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
        title: 'Commercial QA Projects',
        dataKey: 'projects.representative',
        items: moreProjectsEn.slice(1),
      },
      {
        type: 'projectCards',
        title: 'Additional (AI)',
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
    quickLabel: 'Стек и навыки',
    displayQuestion:
      'Какой стек Romeo использует и как применяет его в проектах?',
    patterns: [
      'Какой стек Romeo использует и как применяет его в проектах?',
      'Какие навыки и технологии использует Romeo в QA и разработке?',
      'навыки',
      'стек',
      'технологический стек',
      'какие технологии знает Romeo',
      'навыки и инструменты',
      'компетенции QA и PM',
      'tech stack',
      'skills',
    ],
    shortAnswer:
      'Компетенции Romeo Timony объединены в связку Project Manager и Fullstack QA на четырёх ключевых проектах: Ask Romeo, Sminex, Messer Group (Elme Messer) и DPD Russia.',
    defaultAnswer: [
      'Навыки структурированы по реальным проектам, чтобы наглядно показать синтез продуктово-проектного управления (Project Manager) и обеспечения качества (Fullstack QA):',
      '',
      '• Ask Romeo — проектирование AI/RAG-продукта от скоупа и требований до архитектуры кэширования, проверки фактов и многоуровневых guardrails.',
      '• Sminex — построение процессов обеспечения качества, фреймворк автотестов (Playwright, Python), CI-пайплайны (~700 Appium-тестов) и управление рисками релизов.',
      '• Messer Group (Elme Messer) — эффективное совмещение ролей Project Manager и QA: фасилитация 4 Scrum-команд, управление бэклогом, координация поставок и релизные гейты для международных web-сервисов.',
      '• DPD Russia — функциональное, интеграционное и нагрузочное тестирование микросервисной архитектуры и Oracle SQL при объёме 100 000+ посылок в день.',
    ].join('\n'),
    detailedAnswer: [
      'Подход Romeo к технологическому стеку строится на стыке инженерной точности QA и системного видения Project Manager:',
      '',
      '1. Управление и координация (PM): декомпозиция бизнес-требований на ранних этапах (Shift-Left), управление скоупом задач и спринтами (Scrum), фасилитация команд и внедрение прозрачных критериев готовности релиза (Go/No-Go). В Messer Group это позволило синхронизировать 4 распределённые команды и бизнес-заказчиков.',
      '',
      '2. Тест-инженерия и автоматизация (QA): проектирование стабильных автотестов (Playwright, Pytest, Appium), интеграция в CI/CD, работа со сложными протоколами (REST API, SOAP, Kafka, RabbitMQ) и базами данных (PostgreSQL, Oracle).',
      '',
      '3. AI-оркестрация и продуктовая зрелость: интеграция современных LLM и векторных баз данных (pgvector) для автоматизации рутины, быстрого поиска информации и повышения предсказуемости релизных циклов.',
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
      'sminex_comfort',
      'elme_messer',
      'dpd',
    ],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.skills.tech_stack.default',
    legacyIds: ['faq.tech_stack.level.default'],
    intentId: 'skills.tech_stack',
    entityId: 'skills.core',
    language: 'en',
    quickLabel: 'Tech stack & skills',
    displayQuestion:
      'What technologies does Romeo use, and where has he applied them?',
    patterns: [
      'What technologies does Romeo use, and where has he applied them?',
      'What is your current tech stack and strongest area?',
      'What skills and technologies does Romeo use in QA and engineering?',
      'tech stack',
      'skills',
      'technologies',
      'technical skills',
      'PM and QA skills',
      'tools and stack',
    ],
    shortAnswer:
      'Romeo Timony’s core capabilities combine Project Manager leadership and Fullstack QA across four enterprise cases: Ask Romeo, Sminex, Messer Group (Elme Messer), and DPD Russia.',
    defaultAnswer: [
      'Technical skills are organized around real project outcomes to showcase the synthesis between Project Management (PM) delivery and Fullstack QA quality engineering:',
      '',
      '• Ask Romeo — end-to-end AI/RAG product design: scoping requirements, two-tier cache retrieval, factual grounding, and LLM guardrails.',
      '• Sminex — scaling QA operations, Python/Playwright automation framework, CI test pipelines (~700 Appium tests), and release risk mitigation.',
      '• Messer Group (Elme Messer) — dual Project Manager & QA role: leading 4 international Scrum teams, backlog refinement, cross-stakeholder alignment, and release quality gates across enterprise web services.',
      '• DPD Russia — high-throughput logistics QA: microservices, SOAP/REST APIs, and Oracle SQL databases handling 100,000+ parcels daily.',
    ].join('\n'),
    detailedAnswer: [
      'Romeo’s approach combines QA engineering depth with the strategic clarity of a Project Manager:',
      '',
      '1. Project Management & Delivery (PM): Shift-Left requirement refinement, backlog prioritization, Scrum sprint planning, stakeholder communication, and unambiguous Go/No-Go release gates. In Messer Group, this leadership aligned 4 distributed teams with business stakeholders across Europe.',
      '',
      '2. Fullstack Quality Engineering (QA): designing resilient automation suites (Playwright, Pytest, Appium), CI/CD integration, complex protocol validation (REST, SOAP, Kafka, RabbitMQ), and relational database testing (PostgreSQL, Oracle).',
      '',
      '3. AI Orchestration & Tooling: integrating modern LLMs and vector search (pgvector) to accelerate test generation, documentation synthesis, and release velocity.',
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
      'sminex_comfort',
      'elme_messer',
      'dpd',
    ],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.contact.collaboration.default',
    legacyIds: ['contact.collab.ko', 'faq.contact.default'],
    intentId: 'contact.collaboration',
    entityId: 'contact.public',
    language: 'ru',
    quickLabel: 'Контакты',
    displayQuestion: 'Как со мной связаться?',
    patterns: [
      'контакты',
      'связаться',
      'как связаться',
      'написать',
      'почта',
      'телеграм',
      'telegram',
      'github',
      'портфолио',
    ],
    shortAnswer:
      'Связаться с Романом можно по почте, через Telegram, GitHub или портфолио.',
    defaultAnswer:
      'Связаться со мной можно по электронной почте, через Telegram, GitHub или портфолио. Я открыт к диалогу о задачах Project Manager / Fullstack QA, выстраивании процессов разработки и качества, тестировании Web и Mobile, API и микросервисов, а также применении AI/LLM для автоматизации и ускорения релизов.',
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
      'how to reach',
      'collaboration',
      'github',
      'telegram',
      'email',
      'portfolio',
    ],
    shortAnswer:
      'You can reach Romeo by email, Telegram, GitHub, or through his portfolio.',
    defaultAnswer:
      'You can contact me by email, via Telegram, GitHub, or through my portfolio. I am open to discussing Project Manager & Fullstack QA opportunities, establishing robust delivery & quality processes, testing Web & Mobile applications, APIs & microservices, as well as applying AI/LLM tools for automation and delivery acceleration.',
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
    quickLabel: 'AI в работе',
    displayQuestion:
      'Как Romeo применяет AI в процессах PM и QA?',
    alternativeDisplayQuestions: [
      'Как AI помогает ускорять релизы и повышать качество на стыке PM и QA?',
      'Как вы используете LLM для декомпозиции требований и генерации тестов?',
      'Как Romeo использует AI в QA-процессе и разработке?',
    ],
    patterns: [
      'AI в PM и QA',
      'AI в PM и QA процессах',
      'AI в процессах PM и QA',
      'AI в работе',
      'Как Romeo применяет AI в процессах управления (PM) и контроля качества (QA)?',
      'Как Romeo использует AI в QA-процессе и разработке?',
      'Как AI помогает в PM и QA',
      'AI workflow',
      'AI usage',
      'AI применение',
      'Как вы используете AI',
      'LLM в тестировании',
      'AI в управлении проектами',
      'AI в QA',
      'Shift-left AI',
      'AI 활용',
      'AI 사용법',
    ],
    shortAnswer:
      'Romeo использует AI как рабочий акселератор для декомпозиции требований (Shift-Left), генерации тест-дизайна и автоматизации проверок, сохраняя контроль над качеством через строгие релизные гейты и ручной аудит.',
    defaultAnswer: [
      'В связке Project Manager & Fullstack QA Romeo использует AI не как замену инженерной экспертизе, а как мультипликатор скорости и глубины проработки:',
      '',
      '1. Shift-Left анализ и декомпозиция (PM): С помощью LLM выявляются скрытые пробелы в требованиях, нестыковки бизнес-логики и краевые сценарии (edge cases) ещё до написания кода — экономя бюджет на переделках.',
      '2. Синтез тест-дизайна и генерация автотестов (QA): AI кратно ускоряет проектирование комбинаторных матриц покрытия, генерацию синтетических тест-данных и черновиков автотестов (Playwright, Pytest, REST API).',
      '3. Строгая валидация человеком: Сгенерированные артефакты всегда проходят инженерную верификацию — проверку API-контрактов (REST, SOAP, Kafka), валидацию типов, прогон тестов в CI/CD и прозрачные релизные гейты (Go/No-Go).',
    ].join('\n'),
    detailedAnswer: [
      'AI-пайплайн Romeo объединяет скорость современных моделей с системным контролем рисков на стыке PM и QA:',
      '',
      '• Предпроектный этап и требования (PM): LLM используются для анализа пользовательских историй, поиска противоречий в спецификациях и формирования матриц граничных условий. Это позволяет блокировать архитектурные и логические дефекты на самом раннем этапе (Shift-Left подход).',
      '• Тест-дизайн и автоматизация (QA): Нейросети помогают быстро покрывать сложные комбинаторные сценарии, генерировать фикстуры и заготовки тестов для Playwright и Pytest, а также составлять запросы для нагрузочного и контрактного тестирования.',
      '• RAG и документация: Создание и актуализация живой базы знаний с семантическим поиском, связывающим бизнес-требования с архитектурными спецификациями и результатами автотестов.',
      '• Инженерный контроль и релизные гейты: Ни один AI-сгенерированный результат не попадает в прод без верификации. Качество гарантируется прогонами автотестов в CI/CD, проверкой контрактов (REST, SOAP, Kafka), анализом системных логов и соблюдением чётких критериев готовности к релизу (Go/No-Go).',
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
        title: 'Цикл качества и поставок: AI в процессах PM & QA',
        dataKey: 'ai.workflow',
        items: pmQaAiWorkflowRu,
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
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.ai_usage.workflow.default',
    legacyIds: ['ai.usage.en', 'faq.ai_usage.default'],
    intentId: 'ai_usage.workflow',
    entityId: 'ai.workflow',
    language: 'en',
    quickLabel: 'AI workflow',
    displayQuestion:
      'How does Romeo leverage AI in PM and QA processes?',
    alternativeDisplayQuestions: [
      'How does AI accelerate releases and improve quality at the intersection of PM and QA?',
      'How do you use LLMs for requirements decomposition and test synthesis?',
      'How do you use AI tools in your development workflow?',
    ],
    patterns: [
      'AI in PM & QA',
      'AI in PM and QA',
      'AI in PM & QA processes',
      'AI workflow',
      'AI usage',
      'AI usage workflow',
      'How does Romeo leverage AI in Project Management and QA processes?',
      'How does Romeo leverage AI in Project Management (PM) and Quality Assurance (QA)?',
      'How do you use AI tools in your development workflow?',
      'How does Romeo use AI?',
      'How does Romeo use AI tools?',
      'LLM in testing',
      'AI in project management',
      'Shift-left AI',
      'ai tools development',
    ],
    shortAnswer:
      'Romeo uses AI as a force multiplier for Shift-Left requirements decomposition, test design synthesis, and test automation, while maintaining strict human control via CI/CD gates and API contract validation.',
    defaultAnswer: [
      'Combining Project Management and Fullstack QA, Romeo applies AI not to replace human engineering, but to multiply delivery speed and coverage depth:',
      '',
      '1. Shift-Left Requirements Analysis (PM): Utilizing LLMs to unpack epics, surface logical gaps, and detect edge cases before implementation begins — preventing expensive redesigns.',
      '2. Test Design Synthesis & Autotests (QA): Accelerating the generation of combinatorial test matrices, realistic synthetic test data, and boilerplate automation suites (Playwright, Pytest, REST API).',
      '3. Human-in-the-Loop Quality Verification: All AI outputs are rigorously vetted through code inspections, API contract checks (REST, SOAP, Kafka), automated CI/CD test runs, and objective Go/No-Go release gates.',
    ].join('\n'),
    detailedAnswer: [
      "Romeo's AI workflow bridges speed and predictability across the entire product delivery cycle:",
      '',
      '• Early Requirements & Scope (PM): LLMs analyze user stories, detect specification conflicts, and uncover corner cases at the earliest stage — saving engineering budget through proactive Shift-Left validation.',
      '• Test Design & Automation (QA): Models assist in synthesizing combinatorial edge cases, generating data fixtures, and scaffolding Playwright/Pytest suites, significantly reducing test preparation overhead.',
      '• RAG & Knowledge Systems: Maintaining living knowledge bases and semantic search architectures connecting business requirements directly to regression test results.',
      '• Engineering Gates & Verification: No AI output is accepted blindly. Every delivery is governed by deterministic CI/CD pipelines, API contract validation (REST, SOAP, Kafka), system log audits, and clear Go/No-Go release criteria.',
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
        title: 'Managed Quality & Delivery Cycle: AI in PM & QA',
        dataKey: 'qa.ai.workflow',
        items: pmQaAiWorkflowEn,
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
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.rag.default',
    intentId: 'project.askoosu.rag',
    entityId: 'askoosu',
    language: 'ru',
    quickLabel: 'RAG-архитектура',
    displayQuestion:
      'Как устроена RAG-архитектура и поиск ответов в Ask Romeo?',
    patterns: [
      'RAG-архитектура',
      'Как RAG работает в проекте Ask Romeo?',
      'Как устроена RAG-архитектура и поиск ответов в Ask Romeo?',
      'RAG архитектура Ask Romeo',
      'векторный поиск в Ask Romeo',
      'RAG PostgreSQL',
      'как работает поиск ответов',
    ],
    shortAnswer:
      'Ask Romeo сочетает чат-интерфейс, FAQ-кэш, векторный RAG-поиск в PostgreSQL (pgvector) и AI-генерацию с контролем обоснованности ответов.',
    defaultAnswer: [
      'Входящий вопрос пользователя в Ask Romeo проходит многоуровневую обработку для максимальной точности и скорости:',
      '',
      '1. FAQ Answer Cache: система сначала сопоставляет вопрос с верифицированной базой ответов. Если интент совпадает, ответ возвращается мгновенно без обращения к LLM, экономя время и ресурсы.',
      '',
      '2. Векторный RAG-поиск: если прямого ответа в кэше нет, выполняется семантический поиск по базе знаний через PostgreSQL и pgvector для подбора наиболее релевантных фрагментов документации.',
      '',
      '3. Генерация с guardrails: LLM (Groq / OpenAI) синтезирует ответ строго на основе найденных фактов. Ответ снабжается метаданными: оценкой уверенности, источниками (source chunk id) и контекстными цитатами.',
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
    quickLabel: 'RAG architecture',
    displayQuestion:
      'How does the RAG architecture and retrieval work inside Ask Romeo?',
    patterns: [
      'RAG architecture',
      'How does RAG work inside Ask Romeo?',
      'How does the RAG architecture and retrieval work inside Ask Romeo?',
      'Ask Romeo RAG',
      'RAG architecture',
      'vector search in Ask Romeo',
    ],
    shortAnswer:
      'Ask Romeo combines a chat UI, FAQ answer cache, PostgreSQL vector RAG retrieval (pgvector), and LLM generation with grounded evidence verification.',
    defaultAnswer: [
      'Incoming user queries in Ask Romeo go through a multi-tier pipeline designed for low latency and zero hallucinations:',
      '',
      '1. FAQ Answer Cache: verified frequent questions are resolved instantly via semantic intent matching without model calls, minimizing latency and costs.',
      '',
      '2. Vector RAG Retrieval: when deeper context is needed, semantic search retrieves relevant chunks from the PostgreSQL knowledge base using pgvector embeddings.',
      '',
      '3. Grounded LLM Generation: models (Groq / OpenAI) generate answers strictly anchored in retrieved evidence. Every response carries confidence scores, source chunk IDs, and role-based quote badges.',
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
    quickLabel: 'Обзор',
    displayQuestion:
      'Какую задачу решает проект Ask Romeo и почему выбрано диалоговое портфолио?',
    patterns: [
      'Ask Romeo',
      'Обзор Ask Romeo',
      'Какую задачу решает проект Ask Romeo?',
      'Расскажи о проекте Ask Romeo',
      'почему диалоговое портфолио',
      'обзор проекта Ask Romeo',
    ],
    shortAnswer:
      'Ask Romeo — это диалоговое AI-портфолио Project Manager & QA Engineer, где вместо долгого чтения резюме можно задавать точные вопросы и получать обоснованные ответы со ссылками на первоисточники.',
    defaultAnswer: [
      'Ask Romeo — это интерактивное AI-портфолио Романа Тимошенко, объединяющее роли Project Manager и Fullstack QA Engineer.',
      '',
      `На ${romeoProfile.currentPortfolioUrl} посетитель может исследовать коммерческий опыт (Sminex Comfort, Elme Messer, DPD), компетенции в тест-дизайне, автоматизации и управлении проектами через диалог на естественном языке, а не через длинную статичную страницу.`,
      '',
      'Главная цель проекта — не просто рассказать о навыках, а на практике продемонстрировать инженерный подход: Next.js 15, React 19, TypeScript, векторный поиск RAG на PostgreSQL, AI-оркестрацию с LLM и строгий контроль качества ответов.',
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
    quickLabel: 'Overview',
    displayQuestion:
      'What problem does Ask Romeo solve, and why build it as a conversational portfolio?',
    patterns: [
      'Ask Romeo',
      'Explain the Ask Romeo project',
      'What problem led to Ask Romeo, and why did Romeo build it as a conversational portfolio?',
      'what is ask romeo',
      'ask romeo overview',
    ],
    shortAnswer:
      'Ask Romeo is an AI-connected conversational portfolio where visitors explore Romeo’s Project Manager & QA Engineer experience by asking questions instead of scrolling static text.',
    defaultAnswer: [
      'Ask Romeo is Romeo Timony’s conversational AI portfolio representing his dual Project Manager & Fullstack QA Engineer background.',
      '',
      `At ${romeoProfile.currentPortfolioUrl}, visitors can explore commercial projects (Sminex Comfort, Elme Messer, DPD), test automation architecture, and project management flows by asking natural questions instead of scrolling through traditional static resumes.`,
      '',
      'The primary goal is to make the portfolio itself a living proof of engineering competence: Next.js 15, React 19, TypeScript, PostgreSQL RAG retrieval, AI orchestration, and production quality assurance.',
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
    entityId: 'askoosu',
    language: 'ru',
    quickLabel: 'До и после',
    displayQuestion: 'В чем разница между обычным портфолио/резюме и Ask Romeo?',
    patterns: [
      'В чем разница между обычным портфолио/резюме и Ask Romeo?',
      'В чем разница между обычным портфолио и Ask Romeo?',
      'До и после Ask Romeo',
      'Чем Ask Romeo отличается от резюме?',
      'Разница между статичным портфолио и интерактивным диалогом',
      'before after portfolio',
      'portfolio vs ask romeo',
    ],
    shortAnswer:
      'Обычное резюме — это статичный текст с линейным чтением. Ask Romeo — это интерактивная AI-система с RAG, отвечающая на вопросы рекрутера или нанимающего менеджера с точными подтверждениями и ссылками на факты.',
    defaultAnswer: [
      'Традиционное резюме или портфолио — это статичный документ, где нанимающему менеджеру приходится линейно продираться сквозь длинные списки обязанностей и технологий.',
      '',
      'Ask Romeo меняет парадигму: вместо пассивного чтения вы ведете интерактивный диалог. Вы можете сразу спросить о конкретном опыте управления (Project Manager), архитектуре обеспечения качества (Fullstack QA), метриках проектов (Sminex Comfort, Elme Messer, DPD) или оценить работу RAG-пайплайна.',
      '',
      'Каждый ответ подкрепляется бейджами источников из базы знаний, интерактивными карточками и схемами, исключая «воду» и подтверждая квалификацию реальным работающим продуктом в продакшене.',
    ].join('\n'),
    detailedAnswer: [
      'Разница между традиционным резюме и Ask Romeo демонстрирует продуктовое и инженерное мышление Romeo Timony на стыке PM и Fullstack QA:',
      '',
      '1. Переход от пассивного каталога к Question-First опыту. Посетителю не нужно сканировать страницы текста: один точный вопрос сразу открывает нужный контекст с визуальными блоками, фактами и артефактами.',
      '',
      '2. Доказательность и прозрачность вместо декларативных заявлений. В классическом резюме легко заявить любые навыки. Ask Romeo сам по себе является proof-of-work: проект развернут в production, использует Next.js 15, PostgreSQL с pgvector, RAG-маршрутизацию и строгие guardrails.',
      '',
      '3. Экономия времени нанимающей стороны. Рекрутер, PM или техлид получают моментальные ответы на свои критерии отбора без необходимости ждать технического интервью для базового скоринга.',
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
        title: 'Традиционное резюме → Диалоговое портфолио Ask Romeo',
        dataKey: 'project.portfoliooh_vs_askoosu',
        items: [
          {
            leftTitle: 'Классическое резюме / сайт',
            rightTitle: 'Ask Romeo (AI & RAG)',
            rows: [
              {
                label: 'Поиск информации',
                left: 'Линейный скролл и ручное чтение длинных списков',
                right: 'Question-First: мгновенный переход к сути вопроса',
              },
              {
                label: 'Фокус на роли',
                left: 'Сухой перечень обязанностей и технологий',
                right: 'Наглядный синтез PM-управления и Fullstack QA',
              },
              {
                label: 'Верификация фактов',
                left: 'Декларативные заявления без прозрачных пруфов',
                right: 'RAG-база знаний с бейджами источников и метриками',
              },
              {
                label: 'Интерактивность',
                left: 'Статичные страницы без персонализации',
                right: 'Динамические карточки, схемы процессов и контекстные подсказки',
              },
            ],
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.askoosu.fact',
      'project.askoosu.story',
      'rag.answer_routing',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'rag'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.project.portfoliooh_vs_askoosu.default',
    intentId: 'project.portfoliooh_vs_askoosu',
    entityId: 'askoosu',
    language: 'en',
    quickLabel: 'Before & After',
    displayQuestion: 'How does Ask Romeo differ from a traditional portfolio or resume?',
    patterns: [
      'How does Ask Romeo differ from a traditional portfolio or resume?',
      'What is the difference between a traditional portfolio and Ask Romeo?',
      'Before and after portfolio',
      'How does Ask Romeo differ from a resume?',
      'Traditional vs conversational portfolio',
      'portfolio vs ask romeo',
    ],
    shortAnswer:
      'A traditional resume is a static document requiring linear reading. Ask Romeo is an interactive, RAG-powered AI portfolio that answers specific recruiter and manager questions with verifiable evidence and live architecture.',
    defaultAnswer: [
      'A traditional resume or portfolio is a static document where hiring managers must scan long lists of bullet points and generic claims.',
      '',
      'Ask Romeo shifts the paradigm from passive reading to an interactive dialogue. You can instantly ask about project management methodology (PM), test automation architecture (Fullstack QA), production metrics across enterprise cases (Sminex Comfort, Elme Messer, DPD), or inspect the live RAG pipeline.',
      '',
      'Every answer is grounded in verified knowledge base chunks with source badges, interactive visual blocks, and confidence ratings, replacing vague self-descriptions with a functioning production proof-of-work.',
    ].join('\n'),
    detailedAnswer: [
      'The difference between a traditional resume and Ask Romeo reflects Romeo Timony’s product management and engineering mindset at the intersection of PM and Fullstack QA:',
      '',
      '1. Question-First discovery: Visitors don’t need to browse through multiple pages or fixed sections. A single targeted query instantly surfaces the exact context, visual breakdowns, and live artifacts.',
      '',
      '2. Proof-of-work over claims: Anyone can list technologies on a PDF resume. Ask Romeo proves those skills in action — deployed on a production VPS, running Next.js 15, PostgreSQL pgvector retrieval, semantic caching, and strict guardrails.',
      '',
      '3. Accelerated hiring evaluation: Recruiters and engineering leads get direct, verifiable answers tailored to their hiring criteria in seconds, saving valuable interview time.',
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
        title: 'Traditional Portfolio → Ask Romeo Conversational Experience',
        dataKey: 'project.portfoliooh_vs_askoosu',
        items: [
          {
            leftTitle: 'Traditional Resume / Site',
            rightTitle: 'Ask Romeo (AI & RAG)',
            rows: [
              {
                label: 'Information Discovery',
                left: 'Linear scrolling through dense text and static bullets',
                right: 'Question-First: instant answers to specific role queries',
              },
              {
                label: 'Role Demonstration',
                left: 'Passive list of tools and generic responsibilities',
                right: 'Live synthesis of PM leadership and Fullstack QA rigor',
              },
              {
                label: 'Fact Verification',
                left: 'Unverifiable claims without deep interviews',
                right: 'Grounded RAG with source badges and tangible metrics',
              },
              {
                label: 'Interactivity',
                left: 'Static presentation with zero adaptation',
                right: 'Dynamic rich answers, workflow diagrams, and context chips',
              },
            ],
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.askoosu.fact',
      'project.askoosu.story',
      'rag.answer_routing',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'rag'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.portfolio.creator.default',
    intentId: 'portfolio.creator',
    entityId: 'project.askoosu',
    language: 'ru',
    quickLabel: 'Создатель',
    displayQuestion: 'Кто создал это портфолио?',
    patterns: [
      'Кто создал это портфолио?',
      'Кто сделал этот сайт?',
      'Кто автор этого сайта?',
      'Кто разработчик?',
      'Кто создал Ask Romeo?',
      'Кто такой Romeo Timony?',
      'Создатель портфолио',
      'Автор проекта',
      'who made this portfolio',
    ],
    shortAnswer:
      'Портфолио Ask Romeo спроектировал и разработал Romeo Timony — Project Manager & Fullstack QA Engineer.',
    defaultAnswer: [
      'Портфолио Ask Romeo спроектировал и разработал Romeo Timony — Project Manager и Fullstack QA Engineer.',
      '',
      'Вместо пассивного чтения резюме проект предлагает диалоговый интерфейс: посетители могут напрямую исследовать реальный опыт управления проектами, архитектуру автоматизации тестирования, ключевые кейсы (Sminex Comfort, Elme Messer, DPD) и технологический стек через вопросы.',
      '',
      'Инженерно проект построен на связке Next.js 15, PostgreSQL с векторным расширением pgvector, семантическом FAQ Cache и LLM с многоуровневыми guardrails для защиты от галлюцинаций.',
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
      'who built Ask Romeo?',
    ],
    shortAnswer:
      'Ask Romeo was conceptualized and engineered by Romeo Timony — Project Manager & Fullstack QA Engineer.',
    defaultAnswer: [
      'Ask Romeo was designed and developed by Romeo Timony — Project Manager and Fullstack QA Engineer.',
      '',
      'Instead of a traditional static resume, Ask Romeo offers an interactive conversational experience where recruiters, hiring managers, and teams can explore project management leadership, test automation architecture, enterprise cases (Sminex Comfort, Elme Messer, DPD), and technical capabilities through direct dialogue.',
      '',
      'Technically, it connects Next.js 15, PostgreSQL with pgvector for semantic search, an instant FAQ Cache, and LLM answer generation guarded by strict safety rails.',
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
    quickLabel: 'Ссылки',
    displayQuestion: 'Какие ссылки на проекты или контакты я могу открыть сейчас?',
    patterns: [
      'Ссылки',
      'Какие ссылки на проекты или контакты я могу открыть сейчас?',
      'рабочие ссылки',
      'ссылки на проекты',
      'живые ссылки',
      'активные ссылки',
    ],
    shortAnswer:
      'Вы можете открыть интерактивное портфолио Ask Romeo, а также перейти на GitHub или связаться в Telegram.',
    defaultAnswer: [
      'Вы можете открыть следующие публичные ссылки:',
      '',
      `- Ask Romeo (AI-портфолио): ${romeoProfile.currentPortfolioUrl}`,
      `- GitHub: ${romeoProfile.github}`,
      `- Telegram: ${romeoProfile.telegram}`,
      '',
      'Остальные коммерческие проекты (Sminex Comfort, Elme Messer, DPD) являются корпоративными, поэтому прямой доступ к их закрытым репозиториям и тестовым стендам ограничен.',
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
        title: 'Ссылки',
        dataKey: 'projects.public_links',
        items: [moreProjectsKo[0]],
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
      'project without live url',
      'private project',
      'working links',
    ],
    shortAnswer:
      'You can open the Ask Romeo AI portfolio, visit his GitHub, or contact him via Telegram.',
    defaultAnswer: [
      'You can open the following public links:',
      '',
      `- Ask Romeo (AI Portfolio): ${romeoProfile.currentPortfolioUrl}`,
      `- GitHub: ${romeoProfile.github}`,
      `- Telegram: ${romeoProfile.telegram}`,
      '',
      'Other commercial projects (Sminex Comfort, Elme Messer, DPD) are corporate, so access to their repositories and testing environments is restricted.',
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
        items: [moreProjectsEn[0]],
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
      'policy.guardrail',
    ],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.visual_ui.default',
    intentId: 'project.askoosu.visual_ui',
    entityId: 'askoosu',
    language: 'ru',
    quickLabel: 'UI/UX',
    displayQuestion: 'Какова была концепция UI/UX дизайна Ask Romeo?',
    patterns: [
      'Какова была концепция UI/UX дизайна Ask Romeo?',
      'Как устроен интерфейс Ask Romeo?',
      'UI/UX Ask Romeo',
      'концепция дизайна Ask Romeo',
      'Ask Romeo visual ui',
      'Ask Romeo design direction',
    ],
    shortAnswer:
      'Интерфейс Ask Romeo спроектирован вокруг Question-First подхода: пользователь сразу получает ответы и интерактивные артефакты, а не продирается через длинный статичный лонгрид.',
    defaultAnswer: [
      'Концепция UI/UX Ask Romeo переосмысляет традиционное портфолио в интерактивную исследовательскую среду, объединяющую продуктовое видение (Project Manager) и культуру качества (Fullstack QA).',
      '',
      'Главный принцип — Question-First навигация: посетитель мгновенно находит нужную информацию через вопросы и контекстные подсказки, избегая утомительной прокрутки страниц. Чат служит ядром системы, но ответ не ограничивается голым текстом: он обогащается карточками проектов, бейджами источников, схемами архитектуры и быстрыми переходами.',
      '',
      'Интерфейс избегает визуального шума и показных эффектов: каждый графический компонент, акцент и микровзаимодействие работают на скорость восприятия, доступность и прозрачность данных.',
    ].join('\n'),
    detailedAnswer: [
      'Концепция UI/UX Ask Romeo базируется на трех фундаментальных принципах:',
      '',
      '1. Question-First навигация: посетителю не нужно переключаться между вкладками «О себе», «Проекты» и «Навыки» — один клик по контекстному вопросу или ручной ввод сразу разворачивает необходимый срез информации.',
      '',
      '2. Гибридные ответы (Rich Answers): синтез лаконичного текста, структурированных карточек, интерактивных чипов, пайплайн-схем и бейджей достоверности (grounding badges) для мгновенного сканирования сути.',
      '',
      '3. Продуктовая иерархия и доступность: приоритет читаемости, поддержка светлой/темной темы, адаптивные горизонтальные рельсы карточек и строгая типографика с фокусом на решение задач нанимающей стороны.',
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
        title: 'Принципы UI/UX Ask Romeo',
        dataKey: 'askoosu.ui_principles',
        items: [
          {
            title: 'Question-First навигация',
            description: 'Мгновенный переход к сути через контекстные подсказки и прямой диалог.',
          },
          {
            title: 'Rich UI блоки',
            description:
              'Карточки, пайплайн-схемы, сравнительные таблицы и бейджи подтвержденных источников.',
          },
          {
            title: 'Продуктовая ясность',
            description: 'Строгая иерархия и скорость восприятия вместо избыточных декоративных эффектов.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'project.askoosu.fact',
      'project.askoosu.story',
      'project.askoosu.rag_principles',
      'ui.answer_experience',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'rag'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.visual_ui.default',
    intentId: 'project.askoosu.visual_ui',
    entityId: 'askoosu',
    language: 'en',
    quickLabel: 'UI/UX',
    displayQuestion: 'What was the UI/UX direction behind Ask Romeo?',
    patterns: [
      'What was the UI/UX direction behind Ask Romeo?',
      'What was the UI direction of Ask Romeo?',
      'Ask Romeo UI UX',
      'conversational portfolio UX',
      'Ask Romeo visual ui',
      'Ask Romeo design direction',
    ],
    shortAnswer:
      'Ask Romeo is built around Question-First UX: visitors get direct answers with rich interactive visual blocks instead of reading a static, one-way resume.',
    defaultAnswer: [
      'The UI/UX design of Ask Romeo reimagines the traditional developer portfolio into an interactive conversational environment, blending Product Management clarity with QA precision.',
      '',
      'The core paradigm is Question-First navigation: visitors immediately find what they need through natural questions and curated prompt chips without scrolling through endless text. The chat is central, but answers are never just plain walls of text: they are augmented by interactive project cards, source badges, workflow diagrams, and context follow-ups.',
      '',
      'The interface deliberately avoids decorative noise and vanity animations: every component, color accent, and interaction is engineered for rapid scannability, accessibility, and evidence transparency.',
    ].join('\n'),
    detailedAnswer: [
      'Ask Romeo’s design architecture rests on three core principles:',
      '',
      '1. Question-First Navigation: Visitors don’t need to sequentially browse About, Projects, and Skills tabs — clicking a contextual prompt or asking directly opens the exact relevant depth immediately.',
      '',
      '2. Rich Answer Composition: Answers blend concise natural language with structured visual blocks, including comparison tables, workflow step diagrams, project rails, and grounding badges.',
      '',
      '3. Information Hierarchy & Scannability: High visual hierarchy, dark/light theme support, responsive card rails, and accessible typography focused on delivering instant value to recruiters and managers.',
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
              'Direct entry into relevant context through contextual prompts and dialogue.',
          },
          {
            title: 'Rich visual answer blocks',
            description:
              'Cards, pipeline diagrams, comparison tables, and grounding source badges.',
          },
          {
            title: 'Product clarity over noise',
            description:
              'Information hierarchy engineered for rapid comprehension rather than superficial effects.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'project.askoosu.fact',
      'project.askoosu.story',
      'project.askoosu.rag_principles',
      'ui.answer_experience',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'rag'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.deployment.default',
    intentId: 'project.askoosu.deployment',
    entityId: 'askoosu',
    language: 'ru',
    quickLabel: 'Деплой',
    displayQuestion: 'Как развернут и работает проект Ask Romeo?',
    patterns: [
      'Как развернут и работает проект Ask Romeo?',
      'деплой Ask Romeo',
      'где запущен Ask Romeo',
      'как работает инфраструктура портфолио',
      'deployment of Ask Romeo',
      'хостинг Ask Romeo',
      'архитектура деплоя',
    ],
    shortAnswer:
      'Ask Romeo развернут на изолированном Ubuntu VPS в Docker-контейнерах с Next.js 15 Standalone, PostgreSQL + pgvector для RAG-кэша, Nginx с SSL и автоматизированным CI/CD.',
    defaultAnswer: [
      'Ask Romeo работает в production-окружении на выделенном сервере (Ubuntu VPS) с контейнеризацией через Docker.',
      '',
      'Стек инфраструктуры объединяет фронтенд и API-роуты на Next.js 15 (Standalone build), реляционную и векторную базу данных PostgreSQL с расширением pgvector для семантического поиска чанков, а также обратный прокси Nginx с автоматическими SSL-сертификатами Let’s Encrypt.',
      '',
      'Для обеспечения надежности и быстродействия внедрена двухуровневая система ответов: быстрый FAQ Cache для мгновенного отклика (<50 мс) и векторный RAG-пайплайн с моделью эмбеддингов и LLM с верификацией guardrails.',
    ].join('\n'),
    detailedAnswer: [
      'Инфраструктура и пайплайн развертывания Ask Romeo состоят из четырех ключевых уровней:',
      '',
      '1. Слой приложения: Next.js 15 в режиме Standalone, работающий в изолированном Docker-контейнере с оптимизированным потреблением ресурсов.',
      '',
      '2. Слой данных и RAG: PostgreSQL с pgvector для гибридного поиска по базе знаний (текстовый + векторный поиск по косинусному расстоянию) и кэш ответов.',
      '',
      '3. Сетевой контур и безопасность: Nginx Reverse Proxy с HTTP/2, SSL-шифрованием, строгими заголовками безопасности (CSP, CORS, HSTS) и защитой от перегрузок.',
      '',
      '4. Непрерывная доставка (CI/CD): скрипты валидации типов (TypeScript), линтинга, автоматизированных тестов и безопасного бесшовного деплоя без даунтайма.',
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
        title: 'Инфраструктура и деплой Ask Romeo',
        dataKey: 'askoosu.deployment',
        items: [
          {
            title: 'Приложение (Next.js 15)',
            description: 'Standalone Node.js контейнер в Docker, API-роуты чата и стриминг ответов.',
          },
          {
            title: 'Данные & Vector Store',
            description:
              'PostgreSQL + pgvector: эмбеддинги чанков знаний, FAQ-кэш и метаданные источников.',
          },
          {
            title: 'Nginx & SSL',
            description:
              'Обратный прокси с HTTPS/HTTP2, сжатием gzip/brotli и заголовками безопасности.',
          },
          {
            title: 'Production VPS & CI/CD',
            description:
              'Выделенный Linux-сервер, скрипты автоматической сборки, проверок и бесшовного перезапуска.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'links.public',
      'rag.frontend_backend_db',
      'rag.groq.guardrails',
      'project.askoosu.fact',
    ],
    hasTodo: false,
    freshness: 'time_sensitive',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'rag'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.project.askoosu.deployment.default',
    intentId: 'project.askoosu.deployment',
    entityId: 'askoosu',
    language: 'en',
    quickLabel: 'Deploy',
    displayQuestion: 'How is Ask Romeo deployed and operated?',
    patterns: [
      'How is Ask Romeo deployed and operated?',
      'How is Ask Romeo deployed?',
      'Where does Ask Romeo run?',
      'portfolio deployment',
      'deployment of Ask Romeo',
      'Ask Romeo hosting and infrastructure',
    ],
    shortAnswer:
      'Ask Romeo runs in production on an Ubuntu VPS using Docker containers with Next.js 15 Standalone, PostgreSQL with pgvector for RAG retrieval, Nginx reverse proxy with SSL, and automated CI/CD.',
    defaultAnswer: [
      'Ask Romeo is hosted in a production environment on a dedicated Linux VPS (Ubuntu Server) containerized with Docker.',
      '',
      'The architecture includes Next.js 15 (Standalone build) handling both UI and server API routes, a PostgreSQL database with the pgvector extension for semantic chunk retrieval, and an Nginx reverse proxy with automated Let’s Encrypt SSL certificates.',
      '',
      'To maximize performance and reliability, queries pass through a two-tier retrieval architecture: an instant in-memory/database FAQ Cache (<50ms response) and a semantic RAG pipeline powered by embeddings, vector similarity search, and LLM generation protected by strict guardrails.',
    ].join('\n'),
    detailedAnswer: [
      'The deployment and operations model of Ask Romeo spans four core layers:',
      '',
      '1. Application Layer: Next.js 15 Standalone running inside an isolated Docker container with minimal memory footprint and fast cold starts.',
      '',
      '2. Data & RAG Layer: PostgreSQL + pgvector performing hybrid search (keyword + cosine distance vector retrieval) over versioned knowledge base chunks.',
      '',
      '3. Network & Edge Security: Nginx Reverse Proxy configured with HTTP/2, SSL termination, and security headers (CSP, CORS, rate limits).',
      '',
      '4. Continuous Delivery (CI/CD): Automated verification pipeline running TypeScript compilation, linting, regression tests, and zero-downtime container redeployment.',
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
        title: 'Ask Romeo Deployment & Ops Layers',
        dataKey: 'askoosu.deployment',
        items: [
          {
            title: 'App Layer (Next.js 15)',
            description: 'Dockerized standalone container with streaming chat API handlers.',
          },
          {
            title: 'Data & Vector Store',
            description:
              'PostgreSQL + pgvector storing semantic embeddings and FAQ cache.',
          },
          {
            title: 'Nginx & SSL Proxy',
            description:
              'Reverse proxy with HTTPS/HTTP2, gzip compression, and security policies.',
          },
          {
            title: 'Production VPS & CI/CD',
            description:
              'Dedicated Ubuntu host with automated test suites and zero-downtime redeploys.',
          },
        ],
      },
      { type: 'sourceBadges' },
    ],
    sourceChunkIds: [
      'links.public',
      'rag.frontend_backend_db',
      'rag.groq.guardrails',
      'project.askoosu.fact',
    ],
    hasTodo: false,
    freshness: 'time_sensitive',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'rag'],
    confidence: 0.98,
  }),
  createFaqAnswer({
    id: 'faq.tech.rag_vs_faq_cache.default',
    intentId: 'tech.rag_vs_faq_cache',
    entityId: 'rag',
    language: 'ru',
    quickLabel: 'FAQ Cache vs RAG',
    displayQuestion: 'Чем отличаются FAQ Cache и RAG в Ask Romeo?',
    patterns: [
      'Разница между FAQ Cache and RAG',
      'в чем отличие кэша от rag',
      'зачем нужны оба',
      'faq cache vs rag',
      'retrieval vs cache',
    ],
    shortAnswer:
      'FAQ Cache сразу возвращает проверенные эталонные ответы для типовых вопросов, тогда как RAG ищет подходящие чанки в базе знаний и генерирует на их основе индивидуальные ответы.',
    defaultAnswer: [
      'FAQ Cache и RAG выполняют разные задачи.',
      '',
      'FAQ Cache предназначен для часто задаваемых вопросов с фиксированным ответом. Он отдает результат мгновенно и без обращения к LLM. RAG запускается для более специфичных и сложных вопросов: сначала система ищет релевантные фрагменты в Notion Wiki, а затем формирует ответ на их основе.',
      '',
      'Простыми словами, FAQ Cache отвечает за скорость и экономию ресурсов, а RAG — за гибкость и поиск точных деталей в документах.',
    ].join('\n'),
    detailedAnswer: [
      'В системе Ask Romeo FAQ Cache и RAG дополняют друг друга.',
      '',
      'FAQ Cache — это банк идеальных ответов. Для каждого из них заранее определены ID, намерение (intent), паттерны вопросов и варианты ответов. Если запрос совпадает с высокой точностью, он возвращается мгновенно.',
      '',
      'RAG — это поисковый движок на основе фактов. Когда запрос длинный или связывает несколько тем, система сначала находит исходные текстовые чанки, и на их фундаменте LLM строиит ответ. Оптимальный путь обработки запросов: сначала FAQ Cache, а затем RAG.',
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
                label: 'Задача',
                left: 'Возврат готовых эталонных ответов',
                right: 'Поиск чанков знаний и генерация ответа',
              },
              {
                label: 'Преимущество',
                left: 'Максимальная скорость, стабильный тон',
                right: 'Гибкость, работа со сложными вопросами',
              },
              {
                label: 'Когда применять',
                left: 'Контакты, обзор проектов, частые вопросы',
                right: 'Технические детали, сравнения, уточнения',
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
    quickLabel: 'PostgreSQL',
    displayQuestion: 'В каких проектах вы использовали PostgreSQL или бэкенд-технологии?',
    patterns: [
      'PostgreSQL',
      'база данных',
      'бэкенд',
      'Postgres',
      'базы данных',
      'какие проекты использовали postgresql',
    ],
    shortAnswer:
      'PostgreSQL используется как векторная база данных (с pgvector) для RAG-поиска в Ask Romeo, а также использовался в проекте QA Assistant Telegram.',
    defaultAnswer: [
      'Основное использование PostgreSQL в проектах Романа:',
      '',
      '- **Ask Romeo (AI-портфолио)**: PostgreSQL используется совместно с расширением pgvector для хранения и семантического поиска по векторам эмбеддингов знаний RAG.',
      '- **QA Assistant Telegram**: PostgreSQL используется для хранения истории диалогов, логов и контекста ассистента.',
      '',
      'Также в коммерческих проектах (например, экосистеме Sminex App) Роман тестировал интеграции микросервисов с базами данных PostgreSQL, событиями Kafka и API-запросами.',
    ].join('\n'),
    detailedAnswer: [
      'PostgreSQL играет важную роль в архитектуре AI-решений Романа.',
      '',
      'В Ask Romeo PostgreSQL выступает не просто как реляционное хранилище, а как векторная база данных (Retrieval Cache) благодаря pgvector, хранящая чанки знаний, метаданные и логи обратной связи.',
      '',
      'В рамках тестирования Sminex App Роман проверял консистентность данных между бэкенд-микросервисами на .NET, базой данных PostgreSQL и шиной сообщений Kafka, контролируя целостность бизнес-сценариев.',
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
        title: 'Базы данных и RAG',
        dataKey: 'tech.postgresql.projects',
        items: [
          moreProjectsKo[0],
        ],
      },
      {
        type: 'skillChips',
        title: 'Бэкенд и данные',
        dataKey: 'skills.backend',
        items: [skillGroupsKo[1]],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.askoosu.overview',
      'rag.db.blueprint',
      'skills.backend',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'tech'],
    confidence: 0.97,
  }),
  createFaqAnswer({
    id: 'faq.tech.springboot.postgresql.default',
    intentId: 'tech.springboot_postgresql',
    entityId: 'tech',
    language: 'en',
    quickLabel: 'PostgreSQL',
    displayQuestion: 'In which projects did you use PostgreSQL or backend technologies?',
    patterns: [
      'PostgreSQL',
      'database',
      'backend',
      'Postgres',
      'databases',
      'what projects used postgresql',
    ],
    shortAnswer:
      'PostgreSQL is used as a vector database (with pgvector) for RAG search in Ask Romeo, and was also used in the QA Assistant Telegram project.',
    defaultAnswer: [
      'The main uses of PostgreSQL in Romeo\'s projects are:',
      '',
      '- **Ask Romeo (AI Portfolio)**: PostgreSQL is used with the pgvector extension for storing and performing semantic search on RAG knowledge embeddings.',
      '- **QA Assistant Telegram**: PostgreSQL is used to store conversation logs, history, and assistant context.',
      '',
      'Additionally, in commercial projects like the Sminex App ecosystem, Roman tested microservice integrations with PostgreSQL databases, Kafka events, and API endpoints.',
    ].join('\n'),
    detailedAnswer: [
      'PostgreSQL plays a vital role in Romeo\'s AI-driven architectures.',
      '',
      'In Ask Romeo, PostgreSQL functions as a vector database (Retrieval Cache) with pgvector, storing knowledge chunks, metadata, and user feedback logs.',
      '',
      'While testing the Sminex App, Roman verified data consistency across .NET microservices, PostgreSQL databases, and Kafka message brokers, ensuring robust E2E flows.',
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
        title: 'Databases and RAG',
        dataKey: 'tech.postgresql.projects',
        items: [
          moreProjectsEn[0],
        ],
      },
      {
        type: 'skillChips',
        title: 'Backend / Data Stack',
        dataKey: 'skills.backend',
        items: [skillGroupsEn[1]],
      },
      { type: 'sourceBadges' },
    ],
    mediaRefs,
    sourceChunkIds: [
      'project.askoosu.overview',
      'rag.db.blueprint',
      'skills.backend',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: sharedGuardrails,
    matchedEntityIds: ['askoosu', 'tech'],
    confidence: 0.97,
  }),
  createFaqAnswer({
    id: 'faq.recruiter.first_30_days.default',
    intentId: 'recruiter.first_30_days',
    entityId: 'recruiter',
    language: 'ru',
    quickLabel: 'Первые 30 дней',
    displayQuestion: 'Как вы планируете проявить себя в первые 30 дней работы?',
    patterns: [
      'план онбординга',
      'что сделаете в первый месяц',
      'первые 30 дней',
      'first 30 days',
      'что будете делать вначале',
    ],
    shortAnswer:
      'В первые 30 дней Роман планирует быстро погрузиться в домен и логику продукта, чтобы сразу начать приносить пользы и вносить точечные улучшения.',
    defaultAnswer: [
      'В первый месяц работы ключевая задача — не пытаться перестроить всё сразу, а быстро вникнуть в бизнес-логику продукта и пользовательские сценарии, опредевив зоны, где улучшения принесут немедленный результат.',
      '',
      'Роман отлично адаптируется к новым технологиям и процессам, направляя фокус на закрытие реальных задач: исправление UX-проблем, написание тестов, актуализацию документации или улучшение интеграций.',
    ].join('\n'),
    detailedAnswer: [
      'План интеграции Романа в процессы команды делится на три этапа:',
      '',
      '0–10 дни: Активное изучение продукта «изнутри» с точки зрения пользователя, понимание ключевых метрик и фокуса команды.',
      '',
      '10–20 дни: Внедрение первых небольших улучшений: доработка интерфейсов, отладка API-контрактов, написание автотестов и наполнение базы знаний.',
      '',
      '20–30 дни: Разработка и презентация предложений по оптимизации QA-процессов, интеграции AI-инструментов или повышению наблюдаемости (observability) системы.',
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
            title: '0-10 дни',
            description: 'Изучение продукта, домена и погружение в задачи команды.',
          },
          {
            title: '10-20 дни',
            description: 'Реализация первых улучшений, тестов и доработка логики.',
          },
          {
            title: '20-30 дни',
            description:
              'Подготовка инициатив по повышению эффективности процессов.',
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
    quickLabel: 'Желаемый проект',
    displayQuestion: 'В каких проектах вы хотели бы участвовать?',
    patterns: [
      'Какие проекты вам интересны?',
      'в каких проектах хотите работать',
      'какие проекты вам подходят',
      'в какой команде хотите работать',
    ],
    shortAnswer:
      'Роману особенно интересны проекты, где искусственный интеллект глубоко интегрирован в пользовательский опыт, а задачи требуют как проектирования, так и непосредственной разработки.',
    defaultAnswer: [
      'Проекты, в которых Роман хотел бы участвовать больше всего, — это продукты, где AI реально трансформирует опыт пользователя.',
      '',
      'Ему неинтересна простая «прикрутка» языковой модели ради хайпа. Гораздо увлекательнее создавать сценарии, где пользователи находят информацию быстрее, реже ошибаются и принимают более качественные решения. Приоритетные направления: RAG/поиск, AI-приложения, fullstack веб-сервисы, сложные базы знаний и инструменты для автоматизации внутренних процессов.',
    ].join('\n'),
    detailedAnswer: [
      'Проекты, которым Роман готов сразу сказать «да», обычно объединяют три черты:',
      '',
      'Во-первых, AI встроен в реальный пользовательский сценарий. Во-вторых, одинаково важны как определение проблемы, так и её техническая реализация. В-третьих, продукт должен решать осязаемые задачи бизнеса — будь то обработка промышленных данных, клиентский опыт, поиск по документам или автоматизация внутренних процессов.',
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
  return {
    ...input,
    answer: input.defaultAnswer,
    cacheMode: input.cacheMode ?? 'direct_cache',
    answerSource: input.answerSource ?? 'faq_cache',
    skippedGroq: input.skippedGroq ?? true,
    visibility: input.visibility ?? 'public',
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
