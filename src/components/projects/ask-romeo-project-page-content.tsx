'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import {
  FaqList,
  PublicPageShell,
  TextSection,
} from '@/components/seo/public-page-shell';
import { romeoProjects } from '@/lib/romeo-profile';
import { useDisplayPreferences } from '@/lib/use-display-preferences';

const askRomeo = romeoProjects[0];

function AskRomeoProjectPageContentInner() {
  const { language } = useDisplayPreferences();
  const isRu = language === 'ru';

  if (isRu) {
    return (
      <PublicPageShell
        eyebrow="Проект"
        title="Ask Romeo — диалоговое QA/AI-портфолио"
        summary="Ask Romeo — портфолио Романа Тимошенко в формате диалога. Оно помогает изучить проекты, навыки и опыт через вопросы, а ответы связывает с FAQ, Wiki и проверяемыми источниками."
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
          <p>
            Ask Romeo объединяет интерфейс на Next.js, базу знаний и RAG-поиск,
            чтобы посетитель мог получать содержательные ответы о коммерческом
            опыте, QA-компетенциях, проектах и подходе к работе.
          </p>
          <p>
            Система разделяет готовые FAQ-ответы и поиск по источникам, показывает
            обоснованность ответа и не подменяет подтверждённые факты общими
            утверждениями чат-бота.
          </p>
        </TextSection>

        <TextSection title="Технологии">
          <p>{askRomeo.techStack.join(', ')}</p>
        </TextSection>

        <TextSection title="Связанные разделы">
          <p>
            Можно изучить{' '}
            <Link className="underline" href="/faq/ai-competitiveness">
              FAQ о работе QA с AI
            </Link>
            ,{' '}
            <Link className="underline" href="/ai-director">
              описание AI-процесса
            </Link>{' '}
            или перейти в{' '}
            <Link className="underline" href="/chat?lang=rus&theme=dark">
              интерфейс Ask Romeo
            </Link>
            .
          </p>
        </TextSection>

        <TextSection title="FAQ">
          <FaqList
            items={[
              {
                question:
                  'Почему Ask Romeo использует RAG, а не только статичные страницы?',
                answer:
                  'Так посетитель может задавать вопросы естественным языком, а ответы остаются связанными с актуальными материалами портфолио и Wiki.',
              },
              {
                question: 'Показывает ли Ask Romeo приватные данные?',
                answer:
                  'Нет. Публичные ответы используют только открытые материалы профиля, проектов и базы знаний. Приватные и административные данные не публикуются.',
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
      title="Ask Romeo — Conversational QA/AI Portfolio"
      summary="Ask Romeo is Romeo Timony's portfolio in a conversational format. It helps explore his projects, skills, and experience through questions, linking answers directly to FAQ, Wiki, and verified sources."
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
        <p>
          Ask Romeo combines a Next.js frontend, a knowledge base, and RAG search,
          allowing visitors to get detailed answers about Romeo’s commercial
          experience, QA skills, projects, and work approach.
        </p>
        <p>
          The system separates predefined FAQ answers from source search,
          illustrates the grounding of each answer, and avoids replacing
          verified facts with generic chatbot generalizations.
        </p>
      </TextSection>

      <TextSection title="Technologies">
        <p>{askRomeo.techStack.join(', ')}</p>
      </TextSection>

      <TextSection title="Related Sections">
        <p>
          You can explore the{' '}
          <Link className="underline" href="/faq/ai-competitiveness">
            FAQ about QA with AI
          </Link>
          , read the{' '}
          <Link className="underline" href="/ai-director">
            AI process description
          </Link>{' '}
          or open the{' '}
          <Link className="underline" href="/chat?lang=eng&theme=dark">
            Ask Romeo interface
          </Link>
          .
        </p>
      </TextSection>

      <TextSection title="FAQ">
        <FaqList
          items={[
            {
              question:
                'Why does Ask Romeo use RAG instead of only static pages?',
              answer:
                'This allows visitors to ask questions in natural language while keeping answers linked directly to current portfolio materials and Wiki documentation.',
            },
            {
              question: 'Does Ask Romeo reveal private data?',
              answer:
                'No. Public answers rely exclusively on public profile materials, projects, and the knowledge base. Private and administrative data are never published.',
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
