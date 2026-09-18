'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import {
  FaqList,
  PublicPageShell,
  TextSection,
} from '@/components/seo/public-page-shell';
import { useDisplayPreferences } from '@/lib/use-display-preferences';

const techStackModulesRu = [
  {
    title: 'Платформа и веб-рантайм',
    badge: 'Core Runtime',
    items: ['Next.js 15 (App Router)', 'React 19', 'TypeScript 5', 'Node.js'],
    description:
      'Серверные компоненты (RSC), потоковый стриминг ответов (Streaming HTTP), безопасные Route Handlers и модульная клиент-серверная архитектура.',
  },
  {
    title: 'AI-оркестрация и RAG-пайплайн',
    badge: 'AI Engine',
    items: ['Vercel AI SDK', 'OpenAI API', 'Groq LPU', 'Google Vertex', 'xAI'],
    description:
      'Мульти-провайдерная маршрутизация с мгновенным fallback, детерминированный роутер интентов, токенизация и строгий протокол верификации источников (Grounding Protocol).',
  },
  {
    title: 'База данных и векторный поиск',
    badge: 'Data & Vectors',
    items: ['PostgreSQL', 'Расширение pgvector', 'Векторные эмбеддинги', 'HNSW-индексация'],
    description:
      'Хранение структурированных сессий, чатов и многомерных векторных представлений базы знаний для семантического поиска по релевантности (Cosine Similarity).',
  },
  {
    title: 'UI-система, анимации и интерактивность',
    badge: 'Design System',
    items: ['Tailwind CSS', 'Framer Motion', 'Radix UI Primitives', 'Fluid Canvas Particle Simulation'],
    description:
      'Адаптивный дизайн, доступные headless-компоненты, аппаратная физика курсора (Fluid Cursor), бесшовная темная/светлая тема и микровзаимодействия.',
  },
  {
    title: 'Quality Engineering, тестирование и релизы',
    badge: 'QA & Observability',
    items: ['Автотесты eval-rag.ts', 'Регрессионные тест-сьюты', 'Структурированное JSON-логирование', 'CI/CD пайплайны'],
    description:
      'Оценка точности RAG-ответов и кэша FAQ, автоматизированные сценарии регресса, релизные гейты и сквозная телеметрия запросов.',
  },
  {
    title: 'Инфраструктура и развёртывание',
    badge: 'DevOps & Cloud',
    items: ['Docker', 'Docker Compose', 'Linux VPS', 'Nginx Reverse Proxy', 'Certbot SSL'],
    description:
      'Контейнеризация сервисов, изолированные сети, автоматизированный скриптовый деплой без простоя и мониторинг доступности.',
  },
];

const techStackModulesEn = [
  {
    title: 'Platform & Web Runtime',
    badge: 'Core Runtime',
    items: ['Next.js 15 (App Router)', 'React 19', 'TypeScript 5', 'Node.js'],
    description:
      'React Server Components (RSC), real-time response streaming, secure server Route Handlers, and modular full-stack architecture.',
  },
  {
    title: 'AI Orchestration & RAG Pipeline',
    badge: 'AI Engine',
    items: ['Vercel AI SDK', 'OpenAI API', 'Groq LPU', 'Google Vertex', 'xAI'],
    description:
      'Multi-provider routing with resilient fallback, deterministic intent classification, token budget management, and strict grounding verification.',
  },
  {
    title: 'Database & Vector Similarity Search',
    badge: 'Data & Vectors',
    items: ['PostgreSQL', 'pgvector extension', 'Vector Embeddings', 'HNSW Indexing'],
    description:
      'Storage of structured conversation state, chat history, and high-dimensional embeddings for semantic retrieval via cosine similarity.',
  },
  {
    title: 'UI System, Animations & Interactions',
    badge: 'Design System',
    items: ['Tailwind CSS', 'Framer Motion', 'Radix UI Primitives', 'Fluid Canvas Particle Simulation'],
    description:
      'Fully responsive layout, accessible headless primitives, GPU-accelerated fluid physics, seamless dark/light modes, and micro-animations.',
  },
  {
    title: 'Quality Engineering & Testing',
    badge: 'QA & Observability',
    items: ['Automated eval-rag.ts tests', 'Regression Test Suites', 'Structured JSON Telemetry', 'CI/CD Pipelines'],
    description:
      'Systematic evaluation of RAG response fidelity and FAQ cache accuracy, automated regression checks, release gates, and request tracing.',
  },
  {
    title: 'Infrastructure & Deployment',
    badge: 'DevOps & Cloud',
    items: ['Docker', 'Docker Compose', 'Linux VPS', 'Nginx Reverse Proxy', 'Certbot SSL'],
    description:
      'Isolated containerized services, production Nginx proxying, zero-downtime deployment scripts, and automated SSL termination.',
  },
];

function AskRomeoProjectPageContentInner() {
  const { language } = useDisplayPreferences();
  const isRu = language === 'ru';

  if (isRu) {
    return (
      <PublicPageShell
        brandLabel="Ask Romeo"
        eyebrow="Проект"
        title="Ask Romeo — диалоговое портфолио Project Manager & QA"
        summary="Ask Romeo — интерактивное портфолио Романа Тимошенко в формате живого диалога. Проект демонстрирует компетенции на стыке Project Management и обеспечения качества, связывая ответы с верифицированной базой знаний, RAG и реальными кейсами."
        primaryCta={{
          href: '/chat?lang=rus&theme=dark',
          label: 'Спросить Romeo',
        }}
        secondaryCta={{
          href: '/projects?lang=rus&theme=dark',
          label: 'Все проекты',
        }}
        navLabels={{
          ask: 'Спросить',
          projects: 'Проекты',
          faq: 'FAQ',
        }}
      >
        <TextSection title="Что это за проект">
          <p className="text-foreground text-lg font-medium leading-relaxed">
            Ask Romeo — это полноценный цифровой представитель (AI Digital Twin), 
            спроектированный для содержательного профессионального диалога о процессах разработки, 
            управлении проектами и инженерном обеспечении качества.
          </p>
          <p>
            Проект решает ключевую проблему классических портфолио и резюме: вместо статичного списка 
            инструментов посетитель может задавать любые вопросы естественным языком — о реальных кейсах 
            в Sminex, Elme Messer и DPD, методиках управления рисками, архитектуре тестов и подходах к Shift-Left.
          </p>
          <p>
            Архитектура построена на принципах <strong>доказательности и предсказуемости</strong>: система 
            разделяет проверенные детерминированные FAQ-ответы и векторный RAG-поиск по базе знаний, 
            исключая галлюцинации и снабжая ответы проверяемыми ссылками на первоисточники.
          </p>
        </TextSection>

        <TextSection title="Инженерная архитектура и технологический стек">
          <div className="grid gap-4 sm:grid-cols-2">
            {techStackModulesRu.map((mod) => (
              <div
                key={mod.title}
                className="border-border/60 bg-muted/20 rounded-xl border p-4.5 transition-colors hover:border-border"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-foreground text-sm font-semibold">{mod.title}</h3>
                  <span className="border-border/60 text-muted-foreground/80 rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase">
                    {mod.badge}
                  </span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {mod.items.map((item) => (
                    <span
                      key={item}
                      className="bg-background/80 text-foreground/90 border-border/40 rounded-md border px-2 py-0.5 text-xs font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground mt-2.5 text-xs leading-5">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </TextSection>

        <TextSection title="Связанные разделы">
          <p>
            Подробнее:{' '}
            <Link className="underline" href="/faq/ai-competitiveness">
              FAQ об AI в PM и QA
            </Link>
            ,{' '}
            <Link className="underline" href="/about">
              О себе и позиционирование
            </Link>{' '}
            или перейти в{' '}
            <Link className="underline" href="/chat?lang=rus&theme=dark">
              живой чат Ask Romeo
            </Link>
            .
          </p>
        </TextSection>

        <TextSection title="FAQ по проекту">
          <FaqList
            items={[
              {
                question: 'Как в проекте соединяются роли Project Manager и QA-инженера?',
                answer:
                  'С точки зрения PM проект демонстрирует четкую декомпозицию фичей, скоуп, управление рисками и фокус на бизнес-ценности. С точки зрения QA — реализованы строгая верификация контрактов, тестовые сьюты eval-rag для контроля качества ответов модели и релизные гейты.',
              },
              {
                question: 'Почему Ask Romeo использует RAG, а не только статичные страницы?',
                answer:
                  'Так посетитель может задавать вопросы естественным языком, а ответы остаются строго привязанными к актуальным материалам базы знаний, исключая выдумки модели.',
              },
              {
                question: 'Как контролируется качество и точность работы AI в проекте?',
                answer:
                  'Используется двухуровневая архитектура: высокоточные проверенные FAQ-ответы кэшируются детерминированно, а генеративные ответы RAG валидируются на соответствие порогу сходства эмбеддингов и прогоняются через автоматические тестовые сценарии.',
              },
              {
                question: 'Показывает ли Ask Romeo приватные данные?',
                answer:
                  'Нет. Публичные ответы используют только открытые материалы профиля, проектов и базы знаний. Приватные и административные данные надежно изолированы.',
              },
            ]}
          />
        </TextSection>
      </PublicPageShell>
    );
  }

  return (
    <PublicPageShell
      eyebrow="Project"
      title="Ask Romeo — Conversational Project Manager & QA Portfolio"
      summary="Ask Romeo is an interactive portfolio in a live conversational format. It showcases expertise at the intersection of Project Management and Quality Assurance, anchoring every answer to a verified knowledge base, RAG architecture, and commercial project artifacts."
      primaryCta={{
        href: '/chat?lang=eng&theme=dark',
        label: 'Ask Romeo',
      }}
      secondaryCta={{
        href: '/projects?lang=eng&theme=dark',
        label: 'All Projects',
      }}
      navLabels={{
        ask: 'Ask Romeo',
        projects: 'Projects',
        faq: 'FAQ',
      }}
    >
      <TextSection title="What is this project">
        <p className="text-foreground text-lg font-medium leading-relaxed">
          Ask Romeo is a full-fledged AI Digital Twin engineered for in-depth professional dialogue 
          concerning software delivery, project governance, and software quality engineering.
        </p>
        <p>
          It addresses the fundamental limitation of static resumes: instead of reading bullet lists, 
          visitors can engage in interactive exploration—probing commercial experience across Sminex, 
          Elme Messer, and DPD, risk management practices, test architectures, and Shift-Left strategies.
        </p>
        <p>
          The architecture emphasizes <strong>grounded reliability and predictability</strong>: a hybrid 
          pipeline pairs deterministic FAQ routing with vector similarity RAG search across structured knowledge bases, 
          eliminating hallucinations and providing verifiable citations.
        </p>
      </TextSection>

      <TextSection title="Engineering Architecture & Tech Stack">
        <div className="grid gap-4 sm:grid-cols-2">
          {techStackModulesEn.map((mod) => (
            <div
              key={mod.title}
              className="border-border/60 bg-muted/20 rounded-xl border p-4.5 transition-colors hover:border-border"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-foreground text-sm font-semibold">{mod.title}</h3>
                <span className="border-border/60 text-muted-foreground/80 rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase">
                  {mod.badge}
                </span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {mod.items.map((item) => (
                  <span
                    key={item}
                    className="bg-background/80 text-foreground/90 border-border/40 rounded-md border px-2 py-0.5 text-xs font-mono"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mt-2.5 text-xs leading-5">
                {mod.description}
              </p>
            </div>
          ))}
        </div>
      </TextSection>

      <TextSection title="Related Sections">
        <p>
          Explore more:{' '}
          <Link className="underline" href="/faq/ai-competitiveness">
            FAQ: AI in PM & QA
          </Link>
          ,{' '}
          <Link className="underline" href="/about">
            About & Positioning
          </Link>{' '}
          or launch the{' '}
          <Link className="underline" href="/chat?lang=eng&theme=dark">
            Ask Romeo Live Chat
          </Link>
          .
        </p>
      </TextSection>

      <TextSection title="Project FAQ">
        <FaqList
          items={[
            {
              question: 'How does the project integrate Project Management and QA roles?',
              answer:
                'From a PM perspective, it demonstrates feature decomposition, scope control, risk mitigation, and clear business value delivery. From a QA perspective, it incorporates strict API contract validation, eval-rag test suites for model response fidelity, and automated release gates.',
            },
            {
              question: 'Why does Ask Romeo use RAG instead of only static pages?',
              answer:
                'It enables natural conversational queries while keeping responses strictly grounded in the verified knowledge base, preventing model hallucinations.',
            },
            {
              question: 'How is AI response quality and accuracy validated?',
              answer:
                'A two-tier pipeline is utilized: high-confidence FAQ answers are served deterministically from cache, while generative RAG outputs are validated against cosine similarity thresholds and tested via automated regression scripts.',
            },
            {
              question: 'Does Ask Romeo disclose private or sensitive data?',
              answer:
                'No. Public endpoints only access curated portfolio documents and public knowledge. Private and administrative data are strictly isolated.',
            },
          ]}
        />
      </TextSection>
    </PublicPageShell>
  );
}

export function AskRomeoProjectPageContent() {
  return (
    <Suspense fallback={null}>
      <AskRomeoProjectPageContentInner />
    </Suspense>
  );
}
