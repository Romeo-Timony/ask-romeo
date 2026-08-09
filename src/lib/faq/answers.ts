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
    title: 'Context',
    description:
      'I clarify the goal, scenarios, constraints, and risks. I define acceptance criteria and verified assumptions.',
  },
  {
    title: 'AI Ideas',
    description:
      'Codex, Claude Code, and Gemini help break down the task, prepare implementation options, test cases, and negative scenarios.',
  },
  {
    title: 'Verification',
    description:
      'I check code changes, API contracts, error handling, and impact on existing user flows.',
  },
  {
    title: 'QA Testing',
    description:
      'I run type-check, build, automated tests, and manual verifications. I check logs, API responses, and edge cases.',
  },
  {
    title: 'Release',
    description:
      'I commit the result, monitor post-release behavior, and turn discovered risks into new validation checks.',
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
      'В портфолио представлены коммерческие QA-проекты (Sminex Comfort, Elme Messer, DPD) и личные разработки (Ask Romeo и др.).',
    defaultAnswer: [
      'В портфолио представлены три основных коммерческих проекта из QA-опыта Романа: Sminex Comfort, Elme Messer и DPD.',
      '',
      'Также в разделе «Дополнительно (AI)» вы можете посмотреть текущий проект Ask Romeo (диалоговое QA/AI-портфолио). Все карточки показывают контекст тестирования, технологии и ссылки на проекты.',
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
      "Could you show Romeo's representative projects and his QA experience?",
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
      'The portfolio features commercial QA projects (Sminex Comfort, Elme Messer, DPD) and personal developments (Ask Romeo, etc.).',
    defaultAnswer: [
      'The portfolio features three main commercial projects from Roman\'s QA experience: Sminex Comfort, Elme Messer, and DPD.',
      '',
      'Additionally, under the "Additional (AI)" section, you can explore the current Ask Romeo project (conversational QA/AI portfolio). The cards show the testing context, technologies used, and links to the projects.',
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
      'Связаться со мной можно по электронной почте, через Telegram, GitHub или портфолио. Я открыт к диалогу о задачах Senior QA, построении и развитии QA-процессов, тестировании Web и Mobile, API и микросервисов, а также применении AI/LLM для автоматизации и повышения качества продукта.',
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
      'You can contact me by email, via Telegram, GitHub, or through my portfolio. I am open to discussing Senior QA challenges, establishing and developing QA processes, testing Web & Mobile applications, APIs & microservices, as well as applying AI/LLM tools for automation and improving product quality.',
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
      'I use AI to accelerate analysis and test preparation, while confirming quality through automated tests, logs, and manual reviews.',
    defaultAnswer: [
      'AI in my process is not a replacement for QA, but a tool for faster analysis, hypothesis formulation, and risk coverage.',
      '',
      'Codex, Claude Code, and Gemini help decompose tasks, explore the codebase, suggest implementation options, and draft test scenarios. Then I verify the changes as a QA engineer: reading the code, checking API contracts, running type-checks, builds, and autotests, analyzing logs, and running through critical user scenarios manually.',
    ].join('\n'),
    detailedAnswer: [
      'My QA/AI process is built around provable quality, not trust in generated code.',
      '',
      'First, I define the goal, acceptance criteria, risks, and prohibited assumptions. AI helps to quickly assemble options, but it does not make decisions for me. During implementation, I use it for code navigation, test ideas, edge cases search, and drafting documentation.',
      '',
      'After that, I perform code review, check errors and integrations, run static checks, builds, and tests. Before release, I run user scenarios and monitor the result via logs and feedback. This cycle allows me to accelerate with AI without losing control or ownership of quality.',
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
        title: 'QA / AI: Managed Quality Cycle',
        dataKey: 'qa.ai.workflow',
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
    quickLabel: 'UI/UX дизайн',
    displayQuestion: 'Какова была концепция UI/UX дизайна Ask Romeo?',
    patterns: [
      'Как устроен интерфейс Ask Romeo?',
      'UI/UX Ask Romeo',
      'концепция дизайна Ask Romeo',
      'Ask Romeo visual ui',
      'Ask Romeo design direction',
    ],
    shortAnswer:
      'Интерфейс Ask Romeo спроектирован так, чтобы посетители могли сразу задавать интересующие вопросы, а не читать длинную статичную страницу.',
    defaultAnswer: [
      'UI/UX Ask Romeo спроектирован для того, чтобы превратить статичное портфолио в интерактивный опыт исследования информации.',
      '',
      'Главная идея в том, чтобы посетители могли быстро находить нужную информацию через вопросы, избегая долгой прокрутки страниц. Чат является центральным элементом, но ответы дополняются визуальными блоками: рекомендованными вопросами, карточками проектов, бейджами источников и быстыми действиями, чтобы сделать восприятие более удобным.',
      '',
      'Опыт создания Portfoli-Oh! показал, что обилие анимаций и переходов может запутать пользователя, поэтому в Ask Romeo приоритет отдан быстроте понимания, а не броским визуальным эффектам.',
    ].join('\n'),
    detailedAnswer: [
      'Концепция UI/UX Ask Romeo опирается на три основных принципа.',
      '',
      'Во-первых, навигация от вопроса. Посетителю не нужно последовательно изучать разделы О себе, Проекты и Навыки — достаточно задать один вопрос, чтобы сразу попасть в нужный контекст.',
      '',
      'Во-вторых, сочетание текста и визуальных блоков. Важная информация воспринимается легче, если она представлена в виде карточек, чипов или пошаговых схем.',
      '',
      'В-третьих, четкая информационная иерархия вместо избыточной интерактивности. Ask Romeo — это портфолио, в котором прежде всего удобно задавать вопросы, а не просто рассматривать его.',
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
            title: 'Навигация от вопроса',
            description: 'Переход в нужный контекст с помощью одного точного вопроса.',
          },
          {
            title: 'Текст + визуальные блоки',
            description:
              'Использование карточек, чипов и бейджей для быстрого сканирования информации.',
          },
          {
            title: 'Приоритет иерархии',
            description: 'Фокус на быстром и легком понимании структуры ответов, а не на эффектах.',
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
    quickLabel: 'Деплой / Хостинг',
    displayQuestion: 'Как развернут и работает проект Ask Romeo?',
    patterns: [
      'деплой Ask Romeo',
      'где запущен Ask Romeo',
      'как работает инфраструктура портфолио',
      'deployment of Ask Romeo',
      'хостинг',
    ],
    shortAnswer:
      'Ask Romeo работает на Next.js, синхронизируя базу знаний из Notion Wiki, сохраняя чанки в PostgreSQL для RAG-поиска и генерируя ответы с помощью LLM.',
    defaultAnswer: [
      'Основной адрес работающего проекта — https://ask-romeo.ru (или oosu.dev в качестве канонического URL).',
      '',
      'Оригинальный контент хранится в Notion Wiki. Сервисный слой объединяет фронтенд на Next.js, обработчики API-маршрутов, хранилище RAG-кэша на PostgreSQL и генерацию ответов. Для оптимизации стоимости и времени ответа данные периодически синхронизируются в векторный кэш, а популярные вопросы обрабатываются напрямую через FAQ Cache.',
    ].join('\n'),
    detailedAnswer: [
      'Архитектура развертывания и работы Ask Romeo состоит из четырех основных уровней:',
      '',
      'Во-первых, Notion Wiki как CMS для редактирования контента. Во-вторых, приложение Next.js, отвечающее за интерфейс чата, рекомендованные вопросы, визуальные блоки и API-эндпоинты.',
      '',
      'В-третьих, эндпоинты синхронизации, поиска и чата, которые собирают данные из RAG и кэша. В-четвертых, инфраструктура на базе локального сервера и тоннеля Cloudflare для безопасного и стабильного внешнего доступа.',
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
            title: 'Источник контента',
            description: 'Notion Wiki служит в качестве CMS для управления текстами.',
          },
          {
            title: 'Слой приложения',
            description: 'Интерфейс Next.js и API-эндпоинты обрабатывают запросы.',
          },
          {
            title: 'Данные / RAG',
            description:
              'Векторный поиск по PostgreSQL и метаданные источников формируют ответы.',
          },
          {
            title: 'Инфраструктура',
            description:
              'Запуск на сервере с доступом через Cloudflare Tunnel.',
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
