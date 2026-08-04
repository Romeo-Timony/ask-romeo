import type { AnswerVariant, QuestionSurface, QuestionTrigger } from './question-surfaces.shared';

const entry = (id: string, faqId: string, surface: QuestionSurface, priority: number, quickLabel: string, displayQuestion: string, renderSpec: string, visibleByDefault = false, answerVariant: AnswerVariant = 'default'): QuestionTrigger => ({ id, faqId, surface, priority, quickLabel, displayQuestion, answerVariant, renderSpec, visibleByDefault });

export const questionSurfacesKo = [
  entry('home.profile.intro', 'faq.profile.intro.default', 'home', 1, 'Кто ты?', 'Кто такой Romeo и чем он занимается? Расскажи коротко о себе.', 'profile_hero_card', true),
  entry('home.projects.top3', 'faq.projects.top3.summary', 'home', 2, 'Проекты', 'Покажи ключевые проекты Romeo и объясни, какие QA-задачи он решал.', 'project_showcase_carousel', true),
  entry('home.skills.level', 'faq.tech_stack.level.default', 'home', 3, 'Навыки', 'Какие навыки и технологии использует Romeo в QA и разработке?', 'skills_cloud_card', true),
  entry('home.ai.workflow', 'faq.ai_usage.default', 'home', 4, 'AI в работе', 'Как Romeo использует AI в QA-процессе и разработке?', 'tooling_workflow_steps', true),
  entry('home.contact', 'faq.contact.default', 'home', 5, 'Контакты', 'Как связаться с Romeo и в каких форматах он готов сотрудничать?', 'contact_opportunity_card', true),
  entry('project.askoosu.overview', 'faq.project.askoosu.overview.default', 'project.askoosu', 1, 'Обзор', 'Какую задачу решает проект Ask Romeo?', 'product_spotlight_card'),
  entry('project.askoosu.rag', 'faq.project.askoosu.rag.default', 'project.askoosu', 2, 'RAG-архитектура', 'Как RAG работает в проекте Ask Romeo?', 'architecture_steps_diagram', false, 'detailed'),
  entry('project.askoosu.visual_ui', 'faq.project.askoosu.visual_ui.default', 'project.askoosu', 3, 'UI/UX', 'По каким принципам спроектирован интерфейс Ask Romeo?', 'ui_principles_cards'),
  entry('project.askoosu.deployment', 'faq.project.askoosu.deployment.default', 'project.askoosu', 4, 'Деплой', 'Как Ask Romeo развёрнут и поддерживается?', 'deployment_stack_flow'),
  entry('project.askoosu.before_after', 'faq.project.portfoliooh_vs_askoosu.default', 'project.askoosu', 5, 'До и после', 'Как опыт Portfoli-Oh! привёл к созданию Ask Romeo?', 'comparison_grid'),
  entry('project.instagram.learned', 'faq.project.instagram.learned.default', 'project.instagram', 1, 'Выводы', 'Чему Romeo научился при создании Instagram Clone?', 'project_learning_card'),
  entry('project.instagram.backend_db', 'faq.tech.springboot.postgresql.default', 'project.instagram', 2, 'Backend и БД', 'Как в этом проекте связаны backend и структура данных?', 'project_tech_usage_cards'),
  entry('project.sticks.real_service', 'faq.project.sticks.importance.default', 'project.sticks', 1, 'Реальный сервис', 'Почему Sticks & Stones важен как опыт работы с реальным сервисом?', 'before_after_case_card'),
  entry('project.sticks.tech_base', 'faq.tech_stack.level.default', 'project.sticks', 2, 'Техническая база', 'Как была переосмыслена и обновлена устаревшая архитектура?', 'stack_summary_card'),
  entry('project.portfoliooh.evolution', 'faq.project.portfoliooh_vs_askoosu.default', 'project.portfoliooh', 1, 'Эволюция', 'Чем Portfoli-Oh! отличается от Ask Romeo?', 'comparison_grid'),
  entry('skills.stack_level', 'faq.tech_stack.level.default', 'skills', 1, 'Уровень стека', 'Какой стек Romeo использует и как применяет его в проектах?', 'skills_cloud_card'),
  entry('skills.rag_vs_cache', 'faq.tech.rag_vs_faq_cache.default', 'skills', 2, 'RAG и кэш', 'Чем отличаются роли FAQ-кэша и RAG?', 'comparison_grid'),
  entry('skills.springboot_postgresql', 'faq.tech.springboot.postgresql.default', 'skills', 3, 'Spring и PostgreSQL', 'В каких проектах использовались Spring Boot и PostgreSQL?', 'project_tech_usage_cards'),
  entry('contact.reach', 'faq.contact.default', 'contact', 1, 'Связаться', 'Как лучше связаться с Romeo?', 'contact_opportunity_card'),
  entry('fun.public_notes', 'faq.profile.public_life_notes.default', 'fun', 1, 'Подход к работе', 'Расскажи о стиле работы Romeo и его профессиональных принципах.', 'public_life_notes'),
  entry('recruiter.first_30_days', 'faq.recruiter.first_30_days.default', 'recruiter', 1, 'Первые 30 дней', 'Как Romeo может принести пользу команде в первые 30 дней?', 'thirty_day_plan_timeline'),
  entry('contact.project_yes', 'faq.collaboration.project_yes.default', 'contact', 2, 'Интересные проекты', 'Какие проекты Romeo готов обсуждать в первую очередь?', 'collaboration_fit_card'),
] satisfies QuestionTrigger[];
