'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import {
  FaqList,
  PublicPageShell,
  TextSection,
} from '@/components/seo/public-page-shell';
import { useDisplayPreferences } from '@/lib/use-display-preferences';

function AiEraDeveloperPageContentInner() {
  const { language } = useDisplayPreferences();
  const isRu = language === 'ru';

  if (isRu) {
    return (
      <PublicPageShell
        eyebrow="QA / AI-подход"
        title="Качество в эпоху AI"
        summary="AI ускоряет анализ, подготовку решений и тестов, но не отменяет инженерную ответственность. Я использую LLM и RAG как инструменты для более быстрого и прозрачного QA-цикла: от рисков и критериев приёмки до проверки релиза."
        primaryCta={{
          href: '/chat?lang=rus&theme=dark',
          label: 'Спросить Romeo',
        }}
        secondaryCta={{ href: '/projects', label: 'Посмотреть проекты' }}
        navLabels={{
          ask: 'Спросить Romeo',
          projects: 'Проекты',
          faq: 'FAQ',
        }}
      >
        <TextSection title="Практическое преимущество">
          <p>
            Генеративные инструменты быстро создают варианты кода, тест-кейсов,
            документации и гипотез для отладки. Задача QA/AI-инженера — выбрать
            релевантный вариант, проверить его на реальном продукте и не
            пропустить риск за красивым ответом модели.
          </p>
          <p>
            Мой фокус — соединять frontend, backend & quality engineering:
            формулировать критерии приёмки, проверять API-контракты, автоматизировать
            повторяемые проверки, анализировать логи и подтверждать результат в
            пользовательских сценариях. AI помогает быстрее проходить этот цикл,
            но решение о готовности остаётся за человеком.
          </p>
        </TextSection>

        <TextSection title="Как устроен QA / AI-цикл">
          <p>
            Работа начинается не с генерации кода, а с контекста: цели,
            ограничений, рисков, граничных случаев и Definition of Done. Затем
            Codex, Claude Code и Gemini помогают декомпозировать задачу, изучить
            кодовую базу, подготовить альтернативы и сценарии тестирования.
          </p>
          <p>
            После реализации я читаю изменения, проверяю интеграции и обработку
            ошибок, запускаю type-check, build и автотесты. Перед релизом сверяю
            поведение в интерфейсе, ответы API, логи и критичные пользовательские
            пути. Обратная связь после релиза превращается в новые проверки и
            улучшения процесса.
          </p>
        </TextSection>

        <TextSection title="Что этот подход не обещает">
          <p>
            AI не гарантирует корректность ответа и не заменяет знания продукта,
            тестовую стратегию или ответственность за релиз. Сгенерированный код
            и выводы модели считаю гипотезами, пока они не подтверждены тестами,
            наблюдаемыми данными и понятной логикой работы системы.
          </p>
        </TextSection>

        <TextSection title="Связанные материалы">
          <p>
            Посмотрите, как этот подход реализован в{' '}
            <Link className="underline" href="/projects/ask-romeo">
              проекте Ask Romeo
            </Link>
            , изучите{' '}
            <Link className="underline" href="/faq/ai-competitiveness">
              FAQ о работе с AI
            </Link>{' '}
            или задайте вопрос в{' '}
            <Link className="underline" href="/chat?lang=rus&theme=dark">
              чате
            </Link>
            .
          </p>
        </TextSection>

        <TextSection title="FAQ">
          <FaqList
            items={[
              {
                question: 'Заменяет ли AI QA-инженера?',
                answer:
                  'Нет. AI ускоряет подготовку гипотез, кода и тестов, но не понимает продуктовый контекст и не несёт ответственности за качество релиза. QA-инженер определяет риски, проверяет результат и принимает решение на основе доказательств.',
              },
              {
                question: 'Как вы проверяете результат работы AI?',
                answer:
                  'Через review изменений, API-контракты, type-check, build, автотесты, логи и ручные пользовательские сценарии. Если ответ модели нельзя объяснить и повторно проверить, он не считается готовым решением.',
              },
              {
                question: 'Где здесь используется RAG?',
                answer:
                  'В Ask Romeo RAG помогает связывать ответы с поддерживаемой базой знаний и источниками. Это снижает вероятность произвольных ответов и позволяет показать, на каких данных основан вывод.',
              },
            ]}
          />
        </TextSection>
      </PublicPageShell>
    );
  }

  return (
    <PublicPageShell
      eyebrow="QA / AI Approach"
      title="Quality in the AI Era"
      summary="AI speeds up analysis, solution drafting, and test preparation, but does not replace engineering accountability. I leverage LLMs and RAG as tools to achieve a faster and more transparent QA cycle: from risk definition and acceptance criteria to release validation."
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
      <TextSection title="Practical Advantage">
        <p>
          Generative tools quickly generate code snippets, test cases,
          documentation, and debugging hypotheses. The QA/AI engineer’s job is
          to select the relevant option, test it on a real product, and ensure
          no risks are overlooked behind the model’s polished response.
        </p>
        <p>
          My focus is bridging frontend, backend & quality engineering:
          defining acceptance criteria, verifying API contracts, automating repeatable
          checks, analyzing logs, and validating outcomes in real user scenarios.
          AI helps speed up this cycle, but the final release readiness decision
          remains with the human.
        </p>
      </TextSection>

      <TextSection title="How the QA / AI Cycle Works">
        <p>
          The workflow begins not with generating code, but with context: goals,
          constraints, risks, edge cases, and the Definition of Done. Then, Codex,
          Claude Code, and Gemini assist in task decomposition, codebase
          exploration, drafting alternatives, and designing test scenarios.
        </p>
        <p>
          Post-implementation, I review changes, verify integrations and error
          handling, and run type-checks, builds, and automated tests. Before a
          release, I cross-check interface behavior, API responses, logs, and
          critical user journeys. Post-release feedback is then transformed into
          new test cases and process improvements.
        </p>
      </TextSection>

      <TextSection title="What this Approach Doesn’t Promise">
        <p>
          AI does not guarantee correctness and does not replace product knowledge,
          a sound test strategy, or release accountability. I treat generated
          code and model outputs as hypotheses until they are validated by tests,
          observable data, and a clear understanding of the system’s inner logic.
        </p>
      </TextSection>

      <TextSection title="Related Resources">
        <p>
          See how this approach is implemented in the{' '}
          <Link className="underline" href="/projects/ask-romeo">
            Ask Romeo project
          </Link>
          , explore the{' '}
          <Link className="underline" href="/faq/ai-competitiveness">
            FAQ about working with AI
          </Link>{' '}
          or ask a question in the{' '}
          <Link className="underline" href="/chat?lang=eng&theme=dark">
            chat
          </Link>
          .
        </p>
      </TextSection>

      <TextSection title="FAQ">
        <FaqList
          items={[
            {
              question: 'Does AI replace the QA engineer?',
              answer:
                'No. AI speeds up the preparation of hypotheses, code, and tests, but it lacks product context and does not bear release accountability. The QA engineer identifies risks, validates the results, and makes evidence-based decisions.',
            },
            {
              question: 'How do you verify AI outputs?',
              answer:
                'Through change reviews, API contracts, type-checks, builds, automated tests, logs, and manual user scenarios. If a model\'s output cannot be explained and re-tested, it is not considered a resolved solution.',
            },
            {
              question: 'Where is RAG used here?',
              answer:
                'In Ask Romeo, RAG links answers directly to a maintained knowledge base and sources. This minimizes arbitrary answers and illustrates the exact data grounding each output.',
            },
          ]}
        />
      </TextSection>
    </PublicPageShell>
  );
}

export function AiEraDeveloperPageContent() {
  return (
    <Suspense fallback={null}>
      <AiEraDeveloperPageContentInner />
    </Suspense>
  );
}
