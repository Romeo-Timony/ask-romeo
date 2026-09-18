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
    question: 'Что Romeo делает такого, что AI не может заменить?',
    answer:
      'AI генерирует варианты кода и документов, но не несёт ответственности за результат. Romeo оценивает вывод нейросетей сквозь призму реального контекста проекта: сопоставляет бизнес-цели (PM), архитектурные ограничения и риски надёжности (QA), принимая взвешенные решения на основе данных.',
  },
  {
    question: 'Как AI ускоряет работу в роли Project Manager?',
    answer:
      'В управлении проектами AI применяется для быстрой декомпозиции эпиков на атомарные задачи, драфтинга спецификаций, анализа проектных рисков и подготовки отчётов для стейкхолдеров. Это ускоряет Time-to-Market и высвобождает время для прямой координации команды и фокусировки на ключевых целях бизнеса.',
  },
  {
    question: 'Как AI повышает эффективность в роли QA-инженера?',
    answer:
      'В тестировании AI кратно ускоряет построение матриц покрытия, подготовку тестовых данных (mock-данных), генерацию позитивных и граничных сценариев, а также ранний анализ требований в Jira и Figma на противоречивость и полноту (Shift-Left).',
  },
  {
    question: 'Как Romeo проверяет AI-сгенерированные тесты и документацию?',
    answer:
      'Главный принцип — нулевое слепое доверие. Все сгенерированные сценарии валидируются по реальным API-контрактам, структуре БД и фактическому поведению системы. Исключаются галлюцинации, ложные проверки и риски утечки конфиденциальных данных.',
  },
  {
    question: 'Как сочетание PM и QA защищает команду от ошибок и галлюцинаций AI?',
    answer:
      'Инженерная экспертиза в QA помогает моментально выявлять скрытые дефекты и краевые случаи в решениях AI, а опыт Project Manager помогает отсекать избыточную генерацию и направлять AI-инструменты строго на решение задач текущего спринта.',
  },
  {
    question: 'Зачем Ask Romeo использует RAG и локальную базу знаний?',
    answer:
      'Чтобы ответы о коммерческих проектах, навыках и процессах опирались на проверенные факты и реальный опыт, а не на абстрактные домыслы модели. RAG делает AI надёжным, точным и проверяемым цифровым представителем.',
  },
];

const faqItemsEn = [
  {
    question: 'What can Romeo do that AI cannot replace?',
    answer:
      'AI generates draft code and documentation, but takes zero accountability for the outcome. Romeo evaluates AI output through the lens of real project context: aligning business goals (PM), architectural boundaries, and system reliability risks (QA) to make grounded, data-driven decisions.',
  },
  {
    question: 'How does AI accelerate work in the Project Manager role?',
    answer:
      'In project management, AI is leveraged for rapid epic decomposition, drafting clear technical specifications, modeling delivery risks, and preparing concise stakeholder updates. This accelerates Time-to-Market and frees up time for active team coordination and core business focus.',
  },
  {
    question: 'How does AI improve efficiency in the QA Engineer role?',
    answer:
      'In QA engineering, AI drastically speeds up coverage matrix design, mock data generation, edge-case test case authoring, and early requirements validation in Jira/Figma for ambiguities and missing logic (Shift-Left).',
  },
  {
    question: 'How does Romeo validate AI-generated tests and documentation?',
    answer:
      'The guiding principle is zero blind trust. Every AI-generated scenario is audited against real API contracts, database schemas, and actual system runtime behavior. Hallucinations, false positives, and sensitive data risks are rigorously eliminated.',
  },
  {
    question: 'How does combining PM and QA protect teams from AI errors?',
    answer:
      'QA engineering depth enables immediate detection of subtle flaws and boundary edge cases in AI proposals, while project management discipline prevents scope creep and keeps AI tooling aligned with sprint milestones.',
  },
  {
    question: 'Why does Ask Romeo use RAG and a verified knowledge base?',
    answer:
      'To guarantee that answers about commercial projects, skills, and delivery workflows remain anchored in verified facts and real-world experience, rather than generic chatbot guesswork. RAG makes AI a dependable, grounded digital representative.',
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
        title="FAQ: AI-преимущества в Project Management и QA"
        summary="Приземлённые ответы о том, как практическое применение AI ускоряет управление проектами и тестирование: от декомпозиции скоупа и оценки рисков до генерации тест-кейсов и контроля релизов."
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
      title="FAQ: AI Advantages in Project Management and QA"
      summary="Grounded answers on how practical AI workflows accelerate project delivery and quality assurance: from scope decomposition and risk assessment to test case generation and release control."
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
          Explore more:{' '}
          <Link className="underline" href="/ai-era-developer">
            AI Advantages
          </Link>
          ,{' '}
          <Link className="underline" href="/about">
            About
          </Link>{' '}
          and{' '}
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
