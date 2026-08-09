'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import {
  FaqList,
  PublicPageShell,
  TextSection,
} from '@/components/seo/public-page-shell';
import { useDisplayPreferences } from '@/lib/use-display-preferences';

function AiDirectorPageContentInner() {
  const { language } = useDisplayPreferences();
  const isRu = language === 'ru';

  if (isRu) {
    return (
      <PublicPageShell
        eyebrow="Рабочий подход"
        title="Senior QA в эпоху AI"
        summary="Мой подход объединяет инженерное мышление, управление рисками и практическое применение AI. Я выстраиваю качество от анализа требований до мониторинга после релиза, а AI использую для ускорения исследований, автоматизации проверок и принятия более обоснованных решений."
        primaryCta={{
          href: '/chat?lang=rus&theme=dark',
          label: 'Спросить Romeo',
        }}
        secondaryCta={{ href: '/projects', label: 'Смотреть проекты' }}
        navLabels={{
          ask: 'Спросить Romeo',
          projects: 'Проекты',
          faq: 'FAQ',
        }}
      >
        <TextSection title="Что это означает">
          <p>
            Для меня Senior QA — это не только поиск дефектов. Это понимание
            продукта и архитектуры, раннее выявление рисков, прозрачные критерии
            качества и процессы, которые помогают команде выпускать надёжное ПО
            без лишних задержек.
          </p>
          <p>
            В работе я охватываю Web и Mobile, API, интеграции и микросервисы:
            проверяю требования, проектирую тестовые сценарии, развиваю регрессию
            и автоматизацию, анализирую логи и метрики. AI дополняет этот подход,
            но не заменяет инженерную оценку и ответственность за результат.
          </p>
        </TextSection>

        <TextSection title="Как Ask Romeo подтверждает этот подход">
          <p>
            Ask Romeo — практический AI-проект, в котором соединены диалоговый
            интерфейс, база знаний, Wiki/RAG-поиск, отображение источников и
            контроль качества ответов. В нём я применяю QA-подход к AI-продукту:
            проверяю локализацию, устойчивость интерфейса, корректность маршрутов,
            работу при недостатке данных и регрессию пользовательских сценариев.
          </p>
          <p>
            Подробнее можно посмотреть в разделе{' '}
            <Link className="underline" href="/projects/ask-romeo">
              проекта Ask Romeo
            </Link>{' '}
            и в разделе{' '}
            <Link className="underline" href="/projects">
              проектов
            </Link>
            .
          </p>
        </TextSection>

        <TextSection title="Частые вопросы">
          <FaqList
            items={[
              {
                question: 'Какую роль AI играет в вашей работе?',
                answer:
                  'AI помогает быстрее анализировать требования и логи, готовить тестовые данные и черновики проверок, исследовать риски и автоматизировать повторяемые задачи. Финальные решения остаются за инженером.',
              },
              {
                question: 'На чём сосредоточена ваша QA-экспертиза?',
                answer:
                  'На построении и развитии QA-процессов, тестировании Web и Mobile, API, интеграций и микросервисов, а также на регрессии, наблюдаемости и автоматизации качества.',
              },
              {
                question: 'Где можно увидеть практический результат?',
                answer:
                  'В Ask Romeo и других проектах портфолио: там показаны реальные продуктовые сценарии, применяемые технологии и QA-задачи, с которыми я работаю.',
              },
            ]}
          />
        </TextSection>
      </PublicPageShell>
    );
  }

  return (
    <PublicPageShell
      eyebrow="Working Approach"
      title="Senior QA in the AI Era"
      summary="My approach combines engineering mindset, risk management, and the practical application of AI. I build quality from requirements analysis to post-release monitoring, using AI to accelerate research, automate checks, and make more informed decisions."
      primaryCta={{
        href: '/chat?lang=eng&theme=dark',
        label: 'Ask Romeo',
      }}
      secondaryCta={{ href: '/projects', label: 'View Projects' }}
      navLabels={{
        ask: 'Ask Romeo',
        projects: 'Projects',
        faq: 'FAQ',
      }}
    >
      <TextSection title="What this means">
        <p>
          For me, Senior QA is not just about finding defects. It is about
          understanding the product and architecture, early risk identification,
          transparent quality criteria, and processes that help the team ship
          reliable software without unnecessary delays.
        </p>
        <p>
          In my work, I cover Web and Mobile, APIs, integrations, and microservices:
          verifying requirements, designing test cases, developing regression and
          automation suites, and analyzing logs and metrics. AI complements this
          approach but does not replace engineering judgment and accountability
          for the result.
        </p>
      </TextSection>

      <TextSection title="How Ask Romeo confirms this approach">
        <p>
          Ask Romeo is a practical AI project that combines a conversational
          interface, a knowledge base, Wiki/RAG search, source citation, and
          quality control of answers. In it, I apply the QA approach to an AI
          product: verifying localization, interface stability, routing
          correctness, behavior under data scarcity, and regression of user
          scenarios.
        </p>
        <p>
          You can explore this further in the{' '}
          <Link className="underline" href="/projects/ask-romeo">
            Ask Romeo project section
          </Link>{' '}
          and the general{' '}
          <Link className="underline" href="/projects">
            projects section
          </Link>
          .
        </p>
      </TextSection>

      <TextSection title="FAQ">
        <FaqList
          items={[
            {
              question: 'What role does AI play in your work?',
              answer:
                'AI helps analyze requirements and logs faster, prepare test data and test drafts, research risks, and automate repetitive tasks. Final decisions remain with the engineer.',
            },
            {
              question: 'What is your QA expertise focused on?',
              answer:
                'On building and evolving QA processes, Web and Mobile testing, APIs, integrations, and microservices, as well as regression, observability, and quality automation.',
            },
            {
              question: 'Where can I see the practical results?',
              answer:
                'In Ask Romeo and other portfolio projects: they demonstrate real product scenarios, technologies used, and the QA challenges I solve.',
            },
          ]}
        />
      </TextSection>
    </PublicPageShell>
  );
}

export function AiDirectorPageContent() {
  return (
    <Suspense fallback={null}>
      <AiDirectorPageContentInner />
    </Suspense>
  );
}
