'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import {
  FaqList,
  PublicPageShell,
  TextSection,
} from '@/components/seo/public-page-shell';
import { useDisplayPreferences } from '@/lib/use-display-preferences';

const faqItemsRu = [
  {
    question: 'Что Romeo может делать такого, что AI не заменит?',
    answer:
      'Безопасный ответ не в том, что AI никогда не заменит человека. Romeo оценивает результат AI относительно реальных требований, бизнес-сценариев, рисков качества, покрытия тестами и доверия к релизу.',
  },
  {
    question: 'Соревнуется ли Romeo с AI?',
    answer:
      'Нет. AI — это слой исполнения. Задача Romeo — встраивать AI-инструменты в реальные процессы QA: анализ требований, тестовую документацию, сценарии, регрессию и контроль качества релизов.',
  },
  {
    question: 'Как Romeo использует AI, не становясь от него зависимым?',
    answer:
      'Сначала определяет цель, scope, ограничения и критерии приёмки, затем проверяет вывод AI по требованиям, тест-кейсам, фактическому поведению системы и границам безопасности/данных.',
  },
  {
    question: 'Что значит AI Lead в контексте QA?',
    answer:
      'Это не формальный титул, а рабочий стиль: связывать планирование тестирования, анализ качества, автоматизацию, документацию, релизный контроль и обратную связь, используя AI как партнёра по исполнению.',
  },
  {
    question: 'Как Romeo проверяет AI-сгенерированные тесты и артефакты?',
    answer:
      'Проверяет соответствие требованиям и архитектуре, корректность API/UI-полей, отсутствие ложных проверок, риски утечки данных и то, можно ли объяснить результат до того, как он попадёт в продуктовый процесс.',
  },
  {
    question: 'Зачем Ask Romeo использует RAG и базу знаний?',
    answer:
      'Чтобы ответы о проектах, навыках и подходе к QA опирались на исходные материалы портфолио, а не превращались в общие ответы чат-бота.',
  },
];

const faqItemsEn = [
  {
    question: 'What can Romeo do that AI cannot replace?',
    answer:
      'The safer answer is not that AI can never replace human work. Romeo judges AI output against real requirements, business scenarios, quality risks, test coverage, and release confidence.',
  },
  {
    question: 'Does Romeo compete with AI?',
    answer:
      'No. AI is an execution layer. Romeo’s goal is to embed AI tools into real QA processes: requirements analysis, test documentation, scenarios, regression, and release quality control.',
  },
  {
    question: 'How does Romeo use AI without becoming dependent on it?',
    answer:
      'He defines the goal, scope, constraints, and acceptance criteria first, then reviews AI output against requirements, test cases, actual system behavior, and security/data boundaries.',
  },
  {
    question: 'What does AI Lead mean in a QA context?',
    answer:
      'It is not a formal title. It is a working style for connecting test planning, quality analysis, automation, documentation, release control, and feedback, using AI as an execution partner.',
  },
  {
    question: 'How does Romeo review AI-generated tests and artifacts?',
    answer:
      'He checks alignment with requirements and architecture, correctness of API/UI fields, absence of false checks, data-leak risks, and whether the result can be explained before it enters the product process.',
  },
  {
    question: 'Why does Ask Romeo use RAG and a knowledge base?',
    answer:
      'So answers about projects, skills, and the QA approach stay grounded in portfolio source material instead of becoming generic chatbot responses.',
  },
];

function AiCompetitivenessPageContentInner() {
  const { language } = useDisplayPreferences();
  const isRu = language === 'ru';

  if (isRu) {
    return (
      <PublicPageShell
        brandLabel="Ask Romeo"
        eyebrow="FAQ"
        title="FAQ: AI-преимущества в QA"
        summary="Краткие и приземлённые ответы для рекрутеров и поисковых систем о том, как Senior QA Engineer работает с AI, сохраняет контроль качества и использует Ask Romeo как grounded-портфолио."
        primaryCta={{
          href: '/chat',
          label: 'Открыть чат с AI-ассистентом',
        }}
        secondaryCta={{
          href: '/about',
          label: 'О себе',
        }}
        navLabels={{
          ask: 'Спросить',
          projects: 'Проекты',
          faq: 'FAQ',
        }}
      >
        <TextSection title="Вопросы и ответы">
          <FaqList items={faqItemsRu} />
        </TextSection>

        <TextSection title="Связанные страницы">
          <p>
            Подробнее:{' '}
            <Link className="underline" href="/ai-era-developer">
              AI-преимущества
            </Link>
            ,{' '}
            <Link className="underline" href="/about">
              О себе
            </Link>{' '}
            и{' '}
            <Link className="underline" href="/projects">
              Проекты
            </Link>
            .
          </p>
        </TextSection>
      </PublicPageShell>
    );
  }

  return (
    <PublicPageShell
      brandLabel="Ask Romeo"
      eyebrow="FAQ"
      title="FAQ: AI Advantages in QA"
      summary="Short, grounded answers for recruiters and search systems about how a Senior QA Engineer works with AI, keeps quality control, and uses Ask Romeo as a grounded portfolio."
      primaryCta={{
        href: '/chat',
        label: 'Open the AI assistant chat',
      }}
      secondaryCta={{
        href: '/about',
        label: 'About',
      }}
      navLabels={{
        ask: 'Ask',
        projects: 'Projects',
        faq: 'FAQ',
      }}
    >
      <TextSection title="Questions and Answers">
        <FaqList items={faqItemsEn} />
      </TextSection>

      <TextSection title="Related Pages">
        <p>
          Read more:{' '}
          <Link className="underline" href="/ai-era-developer">
            AI Advantages
          </Link>
          ,{' '}
          <Link className="underline" href="/about">
            About
          </Link>
          , and{' '}
          <Link className="underline" href="/projects">
            Projects
          </Link>
          .
        </p>
      </TextSection>
    </PublicPageShell>
  );
}

export function AiCompetitivenessPageContent() {
  return (
    <Suspense fallback={null}>
      <AiCompetitivenessPageContentInner />
    </Suspense>
  );
}
