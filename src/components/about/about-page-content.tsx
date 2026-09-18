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
        title="Project Manager / QA-инженер | Управление проектами и качество ПО"
        summary="Синтез управленческого опыта (PM) и глубокой инженерной экспертизы (QA-инженер) позволяет не просто доводить проекты до релиза в срок, а гарантировать, что созданный продукт устойчив к нагрузкам, предсказуем для бизнеса и ценен для пользователей."
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
          <p className="text-foreground text-lg font-medium leading-relaxed">
            На стыке управления проектами и обеспечения качества рождается главное конкурентное преимущество: 
            <strong> предсказуемость результата без компромиссов в надёжности</strong>.
          </p>
          <p>
            Часто в командах возникает конфликт: менеджмент торопит релизы, а тестирование бьёт тревогу из-за рисков. 
            Мой бэкграунд как <strong>Project Manager</strong> и <strong>QA-инженер</strong> полностью снимает этот барьер. 
            Я понимаю бизнес-цели, стоимость задержек и приоритеты стейкхолдеров, но одновременно вижу архитектурные уязвимости, 
            скрытые зависимости и технические риски до того, как они превратятся в дорогостоящие инциденты на проде.
          </p>

          <div className="my-6 grid gap-4 sm:grid-cols-2">
            <div className="border-border/60 bg-muted/30 rounded-xl border p-5">
              <h3 className="text-foreground font-semibold">Управление и поставка (PM)</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Чёткая декомпозиция задач, управление скоупом и рисками, прозрачные коммуникации со стейкхолдерами и выстраивание ритмичных, предсказуемых спринтов с быстрым Time-to-Market.
              </p>
            </div>
            <div className="border-border/60 bg-muted/30 rounded-xl border p-5">
              <h3 className="text-foreground font-semibold">Инженерия качества (QA)</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Комплексный Shift-Left: аудит требований в Jira/Figma, API/Web/Mobile тестирование, стратегия автоматизации критических сценариев и системная защита бизнес-логики.
              </p>
            </div>
          </div>

          <p className="text-foreground font-semibold">
            Что получает бизнес и команда от такого синтеза:
          </p>
          <ul className="list-disc space-y-2.5 pl-5">
            <li>
              <strong>Экономия бюджета на переделках:</strong> выявление нестыковок бизнес-логики и краевых случаев ещё на этапе требований и согласования API-контрактов.
            </li>
            <li>
              <strong>Релизы без стресса и ночных сбоев:</strong> понятные релизные гейты, исключающие неожиданные сюрпризы при выкатке в продакшн.
            </li>
            <li>
              <strong>AI-оркестрация и кратное ускорение:</strong> практическое применение современных LLM и RAG-пайплайнов для быстрой генерации тест-кейсов, синтеза документации и автоматизации рутины.
            </li>
            <li>
              <strong>Общий язык между разработкой и бизнесом:</strong> перевод сложных технических вызовов в понятные бизнесу выгоды и измеримые риски.
            </li>
          </ul>

          <p className="pt-2">
            Я открыт для сильных продуктовых команд, стартапов и технологических компаний, которым нужен специалист с системным инженерным мышлением и сильными лидерскими качествами, готовый отвечать за результат от формулировки гипотезы до безупречной работы продукта у клиентов.
          </p>
        </TextSection>
      </PublicPageShell>
    );
  }

  return (
    <PublicPageShell
      brandLabel="Ask Romeo"
      eyebrow="About"
      title="Project Manager / QA Engineer | Delivery & Quality Engineering"
      summary="The synergy of Project Management and QA engineering makes it possible not just to ship on schedule, but to ensure that the delivered product is resilient under real-world loads, predictable for the business, and truly valuable to users."
      primaryCta={{
        href: '/chat',
        label: 'Explore My AI Assistant',
      }}
      secondaryCta={{
        href: '/projects',
        label: 'View My Projects',
      }}
    >
      <TextSection title="Professional Positioning">
        <p className="text-foreground text-lg font-medium leading-relaxed">
          The intersection of Project Management and Quality Engineering unlocks a vital competitive edge: 
          <strong> predictable delivery without compromising on reliability</strong>.
        </p>
        <p>
          Teams often face friction between leadership demanding speed and testing cautioning against release risks. 
          My dual background as a <strong>Project Manager</strong> and <strong>QA Engineer</strong> bridges this gap completely. 
          I understand commercial realities, Time-to-Market value, and stakeholder priorities, while possessing the technical depth to spot architectural bottlenecks, contract mismatches, and edge-case vulnerabilities long before they reach production.
        </p>

        <div className="my-6 grid gap-4 sm:grid-cols-2">
          <div className="border-border/60 bg-muted/30 rounded-xl border p-5">
            <h3 className="text-foreground font-semibold">Delivery & Leadership (PM)</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Pragmatic task decomposition, scope and risk governance, transparent stakeholder alignment, and establishing high-velocity, predictable sprint execution.
            </p>
          </div>
          <div className="border-border/60 bg-muted/30 rounded-xl border p-5">
            <h3 className="text-foreground font-semibold">Quality Engineering (QA)</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Rigorous Shift-Left practices: auditing specs in Jira/Figma, API/Web/Mobile validation, automation of revenue-critical user journeys, and robust system integrity.
            </p>
          </div>
        </div>

        <p className="text-foreground font-semibold">
          Proven business value of this dual perspective:
        </p>
        <ul className="list-disc space-y-2.5 pl-5">
          <li>
            <strong>Budget savings on rework:</strong> resolving specification ambiguities, logic conflicts, and edge cases early during requirements analysis and API contract alignment.
          </li>
          <li>
            <strong>Predictable, stress-free releases:</strong> clear release gates that prevent unexpected surprises during production rollouts.
          </li>
          <li>
            <strong>AI-powered velocity:</strong> leveraging LLM and RAG tooling to accelerate test generation, documentation, and routine operational workflows.
          </li>
          <li>
            <strong>Shared vocabulary across teams:</strong> translating complex technical constraints into actionable business priorities and measured risks.
          </li>
        </ul>

        <p className="pt-2">
          I am ready to partner with ambitious product teams, tech startups, and platforms seeking a multidisciplinary professional with systems thinking and delivery leadership who can drive outcomes from initial concept to rock-solid production reality.
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
