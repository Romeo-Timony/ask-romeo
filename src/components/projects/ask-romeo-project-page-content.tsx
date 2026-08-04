import Link from 'next/link';
import {
  FaqList,
  PublicPageShell,
  TextSection,
} from '@/components/seo/public-page-shell';
import { romeoProjects } from '@/lib/romeo-profile';

const askRomeo = romeoProjects[0];

export function AskRomeoProjectPageContent() {
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
