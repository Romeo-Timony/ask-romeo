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
      ko: 'PropTech-платформа · Веб и мобильное приложение',
      en: 'PropTech platform · Web and mobile app',
    },
    paragraphs: {
      ko: [
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
      ko: 'Корпоративная платформа · Веб и мобильное приложение',
      en: 'Enterprise platform · Web and mobile app',
    },
    paragraphs: {
      ko: [
        'Участвовал в обеспечении качества корпоративной информационной системы и мобильного приложения для сотрудников и клиентов компании. Проверял новый функционал, интеграции и пользовательские сценарии, анализировал требования и сопровождал релизы на всех этапах тестирования.',
        'Работал над тем, чтобы новые изменения не нарушали существующую функциональность и соответствовали ожиданиям пользователей.',
      ],
      en: [
        'Contributed to quality assurance for a corporate information system and mobile app for company employees and clients. Validated new functionality, integrations, and user flows, analyzed requirements, and supported releases across all testing stages.',
        'Focused on ensuring that new changes did not break existing functionality and met user expectations.',
      ],
    },
  },
  {
    title: 'DPD',
    url: 'https://dpd.ru/',
    category: {
      ko: 'Логистическая платформа · Веб и мобильное приложение',
      en: 'Logistics platform · Web and mobile app',
    },
    paragraphs: {
      ko: [
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
  const isRu = language === 'ko';
  const locale = isRu ? 'ko' : 'en';

  return (
    <PublicPageShell
      brandLabel="Ask Romeo"
      eyebrow={isRu ? 'Проекты' : 'Projects'}
      title={isRu ? 'Ключевые проекты' : 'Key Projects'}
      summary={
        isRu
          ? 'Подборка коммерческих проектов, в которых я участвовал как Senior QA Engineer, обеспечивая качество веб- и мобильных приложений, анализируя требования, проверяя бизнес-сценарии и помогая командам выпускать стабильные и надежные релизы.'
          : 'A selection of commercial projects where I contributed as a Senior QA Engineer, ensuring the quality of web and mobile applications, analyzing requirements, validating business scenarios, and helping teams ship stable, reliable releases.'
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
