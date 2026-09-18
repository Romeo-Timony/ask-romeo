export type ResumeProjectSkillGroup = {
  group: string;
  skills: Array<{
    name: string;
    proficiency: string;
  }>;
  evidence: string[];
};

export const resumeProjectSkillGroupsRu: ResumeProjectSkillGroup[] = [
  {
    group: 'Ask Romeo — QA / Project Manager',
    skills: [
      { name: 'Next.js 15 / React 19', proficiency: 'confident' },
      { name: 'TypeScript', proficiency: 'usable' },
      { name: 'RAG Architecture', proficiency: 'confident' },
      { name: 'PostgreSQL / pgvector', proficiency: 'usable' },
      { name: 'Prompt Engineering', proficiency: 'confident' },
      { name: 'Shift-Left QA', proficiency: 'confident' },
      { name: 'Product Delivery', proficiency: 'confident' },
      { name: 'Quality Gates', proficiency: 'confident' },
      { name: 'CI/CD & Docker', proficiency: 'usable' },
    ],
    evidence: [
      'Спроектировал и разработал диалоговое портфолио как полноценный AI-продукт: от формирования требований и скоупа (PM) до контроля архитектурного качества и надёжности (QA).',
      'Связал двухуровневый пайплайн (FAQ-кэш <50 мс и PostgreSQL pgvector RAG-поиск с guardrails), исключающий галлюцинации и гарантирующий точную проверку фактов по базе знаний.',
      'Применил строгий QA-подход: автоматизация регрессионных тестов, валидация двуязычной локализации (RU/EN), мобильная адаптивность и сквозной мониторинг работы LLM.',
    ],
  },
  {
    group: 'Sminex — QA-инженер',
    skills: [
      { name: 'Mobile QA (iOS & Android)', proficiency: 'confident' },
      { name: 'Web QA', proficiency: 'confident' },
      { name: 'Playwright (Python)', proficiency: 'confident' },
      { name: 'Pytest', proficiency: 'confident' },
      { name: 'REST API', proficiency: 'confident' },
      { name: 'Zephyr / Allure TestOps', proficiency: 'confident' },
      { name: 'Sentry / Grafana', proficiency: 'confident' },
      { name: 'PostgreSQL', proficiency: 'usable' },
      { name: 'Kafka', proficiency: 'usable' },
      { name: 'Charles / Proxyman', proficiency: 'confident' },
      { name: 'AI / LLM in QA', proficiency: 'usable' },
    ],
    evidence: [
      'Отвечал за сквозное качество и релизные циклы экосистемы Sminex App: функциональное, интеграционное и регрессионное тестирование мобильных приложений и веба.',
      'Спроектировал и разработал фреймворк автотестов на Python, pytest и Playwright для ЛК Sminex (React, C#, Keycloak), внедрив Playwright storage state, сетевые моки через page.route и Allure-отчётность.',
      'Применил подходы проектного управления (PM): декомпозировал эпики и пользовательские истории, согласовывал релизные гейты Go/No-Go между разработкой и бизнесом, минимизируя риски сбоев при выкатке.',
      'Увеличил покрытие критичных модулей с 10% до 85%, создал более 2000 сценариев и совместно с QA/AQA внедрил трёхуровневую модель регресса MIN / MID / MAX.',
      'В мобильном контуре совместно с AQA-командой выстроил процесс регулярного запуска ~700 Appium-автотестов в CI с Allure TestOps, сокративший время регресса на 40%.',
    ],
  },
  {
    group: 'Messer Group — Project Manager / QA-инженер',
    skills: [
      { name: 'Scrum / Agile Delivery', proficiency: 'confident' },
      { name: 'Scope Management', proficiency: 'confident' },
      { name: 'Sprint Planning', proficiency: 'confident' },
      { name: 'Release Gates', proficiency: 'confident' },
      { name: 'Stakeholder Management', proficiency: 'confident' },
      { name: 'PostgreSQL', proficiency: 'confident' },
      { name: 'REST API', proficiency: 'confident' },
      { name: 'Postman / Swagger', proficiency: 'confident' },
      { name: 'JMeter', proficiency: 'usable' },
      { name: 'Kibana / Sentry', proficiency: 'confident' },
      { name: 'Docker', proficiency: 'usable' },
      { name: 'TestIT', proficiency: 'confident' },
    ],
    evidence: [
      'Совмещал роли Project Manager и QA-инженера в четырёх международных Scrum-командах web-сервисов (GAS-WIKI, E-Service, E-Monitoring, Messer Gas-Converter, helium.em).',
      'Управлял скоупом задач и бэклогом спринтов: декомпозировал бизнес-требования, координировал разработку и поставки, синхронизировал стейкхолдеров и проводил спринтовые демо перед бизнесом.',
      'Обеспечивал контроль качества на всех этапах (Shift-Left): от ревью требований до функционального, интеграционного, нагрузочного тестирования и финальных релизных гейтов.',
      'Адаптировал европейские QA- и процессные стандарты, создал более 10 регламентов для Wiki и выстроил прозрачную отчётность в TestIT.',
    ],
  },
  {
    group: 'DPD Russia — QA-инженер',
    skills: [
      { name: 'Vue.js / Node.js', proficiency: 'usable' },
      { name: 'Oracle SQL', proficiency: 'confident' },
      { name: 'RabbitMQ', proficiency: 'usable' },
      { name: 'Docker / Kubernetes', proficiency: 'usable' },
      { name: 'SOAP / WSDL', proficiency: 'confident' },
      { name: 'REST API', proficiency: 'confident' },
      { name: 'Postman / SoapUI', proficiency: 'confident' },
      { name: 'Sentry / Kibana', proficiency: 'confident' },
      { name: 'TestIT', proficiency: 'confident' },
      { name: 'Selenium.js / Allure', proficiency: 'usable' },
    ],
    evidence: [
      'Тестировал портал и клиентские интеграции DPD при нагрузке более 100 000 посылок в день: регистрацию юридических лиц, расчёт стоимости, оформление и отслеживание заказов, авторизацию и управление отправлениями.',
      'Проводил smoke-, интеграционное, регрессионное и системное тестирование микросервисов, проверял Oracle SQL и XML-интеграции через Postman и SoapUI.',
      'Актуализировал более 200 и создал около 300 тест-кейсов, проводил онбординг QA и аналитиков; передача 20% кейсов в автоматизацию сократила регресс на один день.',
    ],
  },
];

export const resumeProjectSkillGroupsEn: ResumeProjectSkillGroup[] = [
  {
    group: 'Ask Romeo — QA / Project Manager',
    skills: [
      { name: 'Next.js 15 / React 19', proficiency: 'confident' },
      { name: 'TypeScript', proficiency: 'usable' },
      { name: 'RAG Architecture', proficiency: 'confident' },
      { name: 'PostgreSQL / pgvector', proficiency: 'usable' },
      { name: 'Prompt Engineering', proficiency: 'confident' },
      { name: 'Shift-Left QA', proficiency: 'confident' },
      { name: 'Product Delivery', proficiency: 'confident' },
      { name: 'Quality Gates', proficiency: 'confident' },
      { name: 'CI/CD & Docker', proficiency: 'usable' },
    ],
    evidence: [
      'Designed and built the conversational portfolio as an end-to-end AI product: from scoping requirements and architecture (PM) to quality assurance and delivery reliability (QA).',
      'Engineered a two-tier retrieval pipeline (<50ms FAQ cache and PostgreSQL pgvector RAG with safety guardrails), preventing hallucinations and ensuring grounded evidence.',
      'Applied a rigorous QA methodology: automated regression runs, bilingual localization validation (RU/EN), responsive UI design, and continuous LLM response monitoring.',
    ],
  },
  {
    group: 'Sminex — QA Engineer',
    skills: [
      { name: 'Mobile QA (iOS & Android)', proficiency: 'confident' },
      { name: 'Web QA', proficiency: 'confident' },
      { name: 'Playwright (Python)', proficiency: 'confident' },
      { name: 'Pytest', proficiency: 'confident' },
      { name: 'REST API', proficiency: 'confident' },
      { name: 'Zephyr / Allure TestOps', proficiency: 'confident' },
      { name: 'Sentry / Grafana', proficiency: 'confident' },
      { name: 'PostgreSQL', proficiency: 'usable' },
      { name: 'Kafka', proficiency: 'usable' },
      { name: 'Charles / Proxyman', proficiency: 'confident' },
      { name: 'AI / LLM in QA', proficiency: 'usable' },
    ],
    evidence: [
      'Led end-to-end QA and release cycles for the Sminex App ecosystem: functional, integration, API, and regression testing across iOS, Android, and web.',
      'Architected a Python, pytest, and Playwright UI/API test automation framework for Sminex Account (React, C#, Keycloak), incorporating Playwright storage state, network route mocking, and Allure reporting.',
      'Applied project management principles: decomposed epics into actionable user stories, coordinated cross-functional teams, and aligned Go/No-Go release gates with business stakeholders.',
      'Elevated critical test coverage from 10% to 85%, authored 2,000+ scenarios, and co-introduced a 3-tier regression strategy (MIN / MID / MAX).',
      'Collaborated with the AQA team to build automated CI execution for ~700 Appium tests with Allure TestOps, cutting regression cycle time by 40%.',
    ],
  },
  {
    group: 'Messer Group — Project Manager / QA Engineer',
    skills: [
      { name: 'Scrum / Agile Delivery', proficiency: 'confident' },
      { name: 'Scope Management', proficiency: 'confident' },
      { name: 'Sprint Planning', proficiency: 'confident' },
      { name: 'Release Gates', proficiency: 'confident' },
      { name: 'Stakeholder Management', proficiency: 'confident' },
      { name: 'PostgreSQL', proficiency: 'confident' },
      { name: 'REST API', proficiency: 'confident' },
      { name: 'Postman / Swagger', proficiency: 'confident' },
      { name: 'JMeter', proficiency: 'usable' },
      { name: 'Kibana / Sentry', proficiency: 'confident' },
      { name: 'Docker', proficiency: 'usable' },
      { name: 'TestIT', proficiency: 'confident' },
    ],
    evidence: [
      'Served in a dual Project Manager & QA role across four international Scrum teams delivering enterprise web services (GAS-WIKI, E-Service, E-Monitoring, Messer Gas-Converter, helium.em).',
      'Managed sprint backlogs and project scope: decomposed business requirements, coordinated developer delivery streams, aligned international stakeholders, and led sprint review demos.',
      'Enforced Shift-Left quality practices from initial requirements review through functional, integration, API, performance testing, and final release gates.',
      'Adapted European QA and workflow standards, authored 10+ operational Wiki guidelines, and structured transparent test reporting in TestIT.',
    ],
  },
  {
    group: 'DPD Russia — QA Engineer',
    skills: [
      { name: 'Vue.js / Node.js', proficiency: 'usable' },
      { name: 'Oracle SQL', proficiency: 'confident' },
      { name: 'RabbitMQ', proficiency: 'usable' },
      { name: 'Docker / Kubernetes', proficiency: 'usable' },
      { name: 'SOAP / WSDL', proficiency: 'confident' },
      { name: 'REST API', proficiency: 'confident' },
      { name: 'Postman / SoapUI', proficiency: 'confident' },
      { name: 'Sentry / Kibana', proficiency: 'confident' },
      { name: 'TestIT', proficiency: 'confident' },
      { name: 'Selenium.js / Allure', proficiency: 'usable' },
    ],
    evidence: [
      'Tested the DPD logistics platform and integrations under heavy load (100,000+ parcels daily): company registration, rate calculation, order booking, parcel tracking, and shipment flows.',
      'Executed smoke, integration, regression, and microservice testing, validating Oracle SQL databases and XML integrations via Postman and SoapUI.',
      'Updated 200+ and authored 300+ test cases, onboarded new QA engineers and analysts, and helped shave a full day off regression by shifting 20% of manual tests to automation.',
    ],
  },
];
