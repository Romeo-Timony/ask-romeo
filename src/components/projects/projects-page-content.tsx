'use client';

import { ArrowUpRight } from 'lucide-react';
import { Suspense } from 'react';
import { PublicPageShell, TextSection } from '@/components/seo/public-page-shell';
import { useDisplayPreferences } from '@/lib/use-display-preferences';

const featuredProjects = [
  {
    title: 'Sminex Comfort',
    url: 'https://comfort.sminex.com/',
    category: {
      ru: 'PropTech-платформа · Веб и мобильное приложение',
      en: 'PropTech platform · Web and mobile app',
    },
    paragraphs: {
      ru: [
        'Обеспечивал качество цифровой платформы и мобильного приложения для жителей жилых комплексов. Проверял пользовательские сценарии, API, интеграции с внутренними сервисами и соответствие реализованного функционала бизнес-требованиям.',
        'Участвовал в анализе требований, тестировании новых возможностей и подготовке продукта к стабильным релизам.',
      ],
      en: [
        'Ensured the quality of a digital platform and mobile app for residential complex residents. Validated user flows, APIs, integrations with internal services, and alignment of delivered functionality with business requirements.',
        'Contributed to requirements analysis, testing of new capabilities, and preparing the product for stable releases.',
      ],
    },
  },
  {
    title: 'Elme Messer',
    url: 'https://elmemesser.lv/',
    category: {
      ru: 'Корпоративная платформа · Веб и мобильное приложение',
      en: 'Enterprise platform · Web and mobile app',
    },
    paragraphs: {
      ru: [
        'Координировал развитие корпоративной платформы и мобильного приложения, совмещая управление скоупом задач с контролем качества. Декомпозировал требования, синхронизировал команду разработки и валидировал интеграции с внутренними сервисами.',
        'Обеспечивал предсказуемость релизных циклов и сквозное тестирование ключевых сценариев поставок, исключая регрессионные сбои при внедрении нового функционала.',
      ],
      en: [
        'Coordinated the evolution of the corporate platform and mobile app, combining task scope management with quality control. Decomposed requirements, aligned the development team, and validated complex backend integrations.',
        'Ensured predictable release schedules and end-to-end testing of critical supply workflows, preventing regression issues as new features were rolled out.',
      ],
    },
  },
  {
    title: 'DPD',
    url: 'https://dpd.ru/',
    category: {
      ru: 'Логистическая платформа · Веб и мобильное приложение',
      en: 'Logistics platform · Web and mobile app',
    },
    paragraphs: {
      ru: [
        'Участвовал в обеспечении качества корпоративной платформы и мобильного приложения для логистических процессов. Анализировал бизнес- и функциональные требования, проверял пользовательские сценарии, API и интеграции между сервисами, помогая выявлять критические дефекты до выхода релизов.',
        'Особое внимание уделял стабильности ключевых процессов доставки, корректности бизнес-логики и взаимодействию различных компонентов системы.',
      ],
      en: [
        'Contributed to quality assurance for a corporate platform and mobile app supporting logistics processes. Analyzed business and functional requirements, validated user flows, APIs, and cross-service integrations, helping catch critical defects before release.',
        'Paid special attention to the stability of key delivery processes, correctness of business logic, and interaction between system components.',
      ],
    },
  },
] as const;

function ProjectsPageContentInner() {
  const { language } = useDisplayPreferences();
  const isRu = language === 'ru';
  const locale = isRu ? 'ru' : 'en';

  return (
    <PublicPageShell
      brandLabel="Ask Romeo"
      eyebrow={isRu ? 'Проекты' : 'Projects'}
      title={isRu ? 'Ключевые проекты' : 'Key Projects'}
      summary={
        isRu
          ? 'Подборка коммерческих проектов на стыке Project Management и QA: управление скоупом и поставкой, детальный анализ требований, валидация бизнес-сценариев и выпуск стабильных веб- и мобильных платформ.'
          : 'A selection of commercial projects at the intersection of Project Management and QA: scope and delivery governance, in-depth requirements analysis, business scenario validation, and shipping resilient web and mobile platforms.'
      }
      primaryCta={{
        href: '/chat',
        label: isRu
          ? 'Познакомиться с моим AI-ассистентом'
          : 'Explore My AI Assistant',
      }}
      secondaryCta={{
        href: '/about',
        label: isRu ? 'О себе' : 'About',
      }}
      navLabels={
        isRu
          ? {
              ask: 'Спросить',
              projects: 'Проекты',
              faq: 'FAQ',
            }
          : {
              ask: 'Ask Romeo',
              projects: 'Projects',
              faq: 'FAQ',
            }
      }
    >
      <TextSection title={isRu ? 'Избранные проекты' : 'Featured Projects'}>
        <div className="grid gap-4">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="border-border/70 bg-card rounded-lg border p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">{project.title}</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {project.category[locale]}
                  </p>
                </div>
                <a
                  className="inline-flex items-center gap-1 text-sm font-semibold underline"
                  href={project.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {isRu ? 'Перейти на сайт' : 'Visit website'}
                  <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="text-muted-foreground mt-4 space-y-4 leading-7">
                {project.paragraphs[locale].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </TextSection>
    </PublicPageShell>
  );
}

export function ProjectsPageContent() {
  return (
    <Suspense fallback={null}>
      <ProjectsPageContentInner />
    </Suspense>
  );
}
