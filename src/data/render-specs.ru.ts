import type { RenderSpecDefinition } from './render-specs.shared';

export const renderSpecsKo = [
  { key: 'profile_hero_card', component: 'ProfileHeroCard', priority: 'A', title: 'Карточка профиля', description: 'Показывает фото, роль, локацию и ключевые навыки.' },
  { key: 'project_showcase_carousel', component: 'ProjectShowcaseCarousel', priority: 'A', title: 'Витрина проектов', description: 'Показывает ключевые проекты и профессиональный рост через них.' },
  { key: 'skills_cloud_card', component: 'SkillsCloudCard', priority: 'A', title: 'Облако навыков', description: 'Группирует технологии и подтверждает их проектными примерами.' },
  { key: 'contact_opportunity_card', component: 'ContactOpportunityCard', priority: 'A', title: 'Связь и сотрудничество', description: 'Собирает каналы связи, интересные роли и точки для совместной работы.' },
  { key: 'tooling_workflow_steps', component: 'ToolingWorkflowSteps', priority: 'A', title: 'AI-процесс', description: 'Показывает путь от планирования до проверки, тестирования и релиза.' },
  { key: 'product_spotlight_card', component: 'ProductSpotlightCard', priority: 'A', title: 'Фокус проекта', description: 'Выделяет задачу и ключевую архитектуру Ask Romeo.' },
  { key: 'architecture_steps_diagram', component: 'ArchitectureStepsDiagram', priority: 'B', title: 'Этапы архитектуры', description: 'Объясняет поток: знания, синхронизация, база данных, поиск, модель и интерфейс.' },
  { key: 'deployment_stack_flow', component: 'DeploymentStackFlow', priority: 'A', title: 'Деплой', description: 'Разделяет контент, приложение, данные и инфраструктуру по слоям.' },
  { key: 'comparison_grid', component: 'ComparisonGrid', priority: 'A', title: 'Сравнение', description: 'Сопоставляет два подхода или два проекта в понятной таблице.' },
  { key: 'project_tech_usage_cards', component: 'ProjectTechUsageCards', priority: 'A', title: 'Технологии в проекте', description: 'Показывает роль backend, базы данных и ключевые выводы из проекта.' },
  { key: 'thirty_day_plan_timeline', component: 'ThirtyDayPlanTimeline', priority: 'A', title: 'План на 30 дней', description: 'Показывает вклад в периоды 0–10, 10–20 и 20–30 дней.' },
  { key: 'collaboration_fit_card', component: 'CollaborationFitCard', priority: 'A', title: 'Формат сотрудничества', description: 'Объясняет, какие задачи и проекты подходят лучше всего.' },
  { key: 'ui_principles_cards', component: 'UiPrinciplesCards', priority: 'A', title: 'Принципы UI/UX', description: 'Собирает ключевые принципы интерфейса Ask Romeo в компактные карточки.' },
] satisfies RenderSpecDefinition[];
