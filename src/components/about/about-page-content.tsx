'use client';

import { Suspense } from 'react';
import { PublicPageShell, TextSection } from '@/components/seo/public-page-shell';
import { useDisplayPreferences } from '@/lib/use-display-preferences';

function AboutPageContentInner() {
  const { language } = useDisplayPreferences();
  const isRu = language === 'ru';

  if (isRu) {
    return (
      <PublicPageShell
        brandLabel="Ask Romeo"
        eyebrow="О себе"
        title="Senior QA Engineer | Software Quality | AI"
        summary="Senior QA Engineer, специализирующийся на обеспечении качества программного обеспечения, автоматизации тестирования и применении искусственного интеллекта для повышения эффективности инженерных процессов."
        primaryCta={{
          href: '/chat',
          label: 'Познакомиться с моим AI-ассистентом',
        }}
        secondaryCta={{
          href: '/projects',
          label: 'Посмотреть мои проекты',
        }}
      >
        <TextSection title="Профессиональное позиционирование">
          <p>
            Моя задача — помогать командам выпускать надежные программные
            продукты за счет комплексного подхода к качеству.
          </p>
          <p>
            Я занимаюсь функциональным, интеграционным и API-тестированием,
            разрабатываю и поддерживаю автоматизированные тесты, участвую в
            проектировании процессов QA и активно применяю AI для анализа
            требований, подготовки тестовой документации, генерации тестовых
            сценариев и ускорения работы инженеров.
          </p>
          <p>
            Благодаря пониманию архитектуры веб-приложений, принципов работы
            frontend и backend, REST API и современных процессов разработки, я
            могу эффективно взаимодействовать с разработчиками, аналитиками и
            DevOps-инженерами, помогая находить проблемы на ранних этапах
            жизненного цикла продукта.
          </p>
          <p>
            Особый интерес для меня представляют AI-assisted Testing,
            RAG-системы, интеллектуальная автоматизация тестирования, анализ
            качества программного обеспечения и развитие современных инженерных
            практик.
          </p>
          <p>
            В портфолио собраны реальные проекты, подходы к обеспечению качества
            и примеры применения AI для решения практических задач в тестировании
            и разработке.
          </p>
        </TextSection>
      </PublicPageShell>
    );
  }

  return (
    <PublicPageShell
      brandLabel="Ask Romeo"
      eyebrow="About"
      title="Senior QA Engineer | Software Quality | AI"
      summary="Senior QA Engineer specializing in software quality assurance, test automation, and the application of artificial intelligence to improve engineering efficiency."
      primaryCta={{
        href: '/chat',
        label: 'Explore My AI Assistant',
      }}
      secondaryCta={{
        href: '/projects',
        label: 'View My Projects',
      }}
    >
      <TextSection title="Public Positioning">
        <p>
          My mission is to help engineering teams deliver reliable, high-quality
          software through a comprehensive approach to quality assurance.
        </p>
        <p>
          I work with functional, integration, and API testing, develop and
          maintain automated test suites, contribute to QA process design, and
          actively leverage AI for requirements analysis, test documentation,
          test case generation, and improving engineering productivity.
        </p>
        <p>
          With a solid understanding of web application architecture, frontend
          and backend fundamentals, REST APIs, and modern software development
          practices, I collaborate effectively with developers, business
          analysts, and DevOps engineers to identify issues early and improve
          product quality throughout the software development lifecycle.
        </p>
        <p>
          I am particularly interested in AI-assisted testing, RAG-based
          solutions, intelligent test automation, software quality analysis, and
          the adoption of modern engineering practices.
        </p>
        <p>
          This portfolio showcases real-world projects, quality engineering
          approaches, and practical examples of applying AI to solve software
          testing and engineering challenges.
        </p>
      </TextSection>
    </PublicPageShell>
  );
}

export function AboutPageContent() {
  return (
    <Suspense fallback={null}>
      <AboutPageContentInner />
    </Suspense>
  );
}
