'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { PublicPageShell, TextSection } from '@/components/seo/public-page-shell';
import { useDisplayPreferences } from '@/lib/use-display-preferences';

function AskPageContentInner() {
  const { language } = useDisplayPreferences();
  const isRu = language === 'ko';

  if (isRu) {
    return (
      <PublicPageShell
        brandLabel="Ask Romeo"
        eyebrow="Спросить"
        title="Ask Romeo — диалоговое окно по своему портфолио"
        summary="Ask Romeo отвечает на вопросы о качестве ПО, автоматизации тестирования, AI-инструментах в инженерной работе, коммерческих проектах и подходе Romeo Timony к обеспечению качества. Ответы опираются на FAQ, базу знаний и RAG по материалам портфолио."
        primaryCta={{
          href: '/chat',
          label: 'Открыть чат с AI-ассистентом',
        }}
        secondaryCta={{
          href: '/projects',
          label: 'Посмотреть проекты',
        }}
        navLabels={{
          ask: 'Спросить',
          projects: 'Проекты',
          faq: 'FAQ',
        }}
      >
        <TextSection title="Начать разговор">
          <p>
            Используйте живой чат, чтобы спросить про опыт Senior QA Engineer:
            функциональное, интеграционное и API-тестирование, автоматизацию,
            анализ требований, контроль качества релизов и применение AI для
            тестовой документации и сценариев.
          </p>
          <p>
            Можно уточнить коммерческие кейсы, стек, рабочий процесс с AI и
            формат сотрудничества.
          </p>
          <p>
            <Link className="underline" href="/chat">
              Открыть интерфейс чата Ask Romeo
            </Link>
            .
          </p>
        </TextSection>
        <TextSection title="Информация для рекрутеров">
          <p>
            Если нужен структурированный обзор без чата, посмотрите страницы{' '}
            <Link className="underline" href="/about">
              О себе
            </Link>
            ,{' '}
            <Link className="underline" href="/projects">
              Проекты
            </Link>
            ,{' '}
            <Link className="underline" href="/faq/ai-competitiveness">
              FAQ
            </Link>
            .
          </p>
          <p>
            <Link className="underline" href="/ai-era-developer">
              AI-преимущества
            </Link>{' '}
            — там зафиксированы кейсы и ответы для рекрутеров и поисковых
            систем.
          </p>
        </TextSection>
      </PublicPageShell>
    );
  }

  return (
    <PublicPageShell
      brandLabel="Ask Romeo"
      eyebrow="Ask"
      title="Ask Romeo — a conversational window into my portfolio"
      summary="Ask Romeo answers questions about software quality, test automation, AI tooling in engineering work, commercial projects, and Romeo Timony’s approach to quality assurance. Answers are grounded in FAQ content, knowledge sources, and RAG over portfolio materials."
      primaryCta={{
        href: '/chat',
        label: 'Open the AI assistant chat',
      }}
      secondaryCta={{
        href: '/projects',
        label: 'View projects',
      }}
      navLabels={{
        ask: 'Ask',
        projects: 'Projects',
        faq: 'FAQ',
      }}
    >
      <TextSection title="Start a Conversation">
        <p>
          Use the live chat to ask about Senior QA Engineer experience:
          functional, integration, and API testing, automation, requirements
          analysis, release quality control, and applying AI to test
          documentation and scenarios.
        </p>
        <p>
          You can also ask about commercial cases, stack, AI workflow, and
          collaboration fit.
        </p>
        <p>
          <Link className="underline" href="/chat">
            Open the Ask Romeo chat interface
          </Link>
          .
        </p>
      </TextSection>
      <TextSection title="Information for Recruiters">
        <p>
          If you need a structured overview without chat, see the{' '}
          <Link className="underline" href="/about">
            About
          </Link>
          ,{' '}
          <Link className="underline" href="/projects">
            Projects
          </Link>
          , and{' '}
          <Link className="underline" href="/faq/ai-competitiveness">
            FAQ
          </Link>{' '}
          pages.
        </p>
        <p>
          <Link className="underline" href="/ai-era-developer">
            AI Advantages
          </Link>{' '}
          — cases and answers for recruiters and search systems are captured
          there.
        </p>
      </TextSection>
    </PublicPageShell>
  );
}

export function AskPageContent() {
  return (
    <Suspense fallback={null}>
      <AskPageContentInner />
    </Suspense>
  );
}
