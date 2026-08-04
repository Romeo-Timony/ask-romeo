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
    group: 'Ask Romeo — QA/AI-портфолио',
    skills: [
      { name: 'Next.js', proficiency: 'confident' },
      { name: 'React', proficiency: 'confident' },
      { name: 'TypeScript', proficiency: 'usable' },
      { name: 'Tailwind CSS', proficiency: 'confident' },
      { name: 'RAG', proficiency: 'usable' },
      { name: 'PostgreSQL', proficiency: 'usable' },
      { name: 'Groq', proficiency: 'usable' },
      { name: 'OpenAI Codex', proficiency: 'confident' },
    ],
    evidence: [
      'Создал диалоговое портфолио на Next.js и TypeScript, где проекты, опыт и навыки раскрываются через вопросы вместо обычной навигации по резюме.',
      'Связал FAQ-кэш, Wiki/RAG-поиск и генерацию ответов; добавил источники, оценку обоснованности и безопасные сценарии при недостатке данных.',
      'Использует QA-подход к AI-продукту: проверяет русскую локализацию, адаптивность, сохранённые диалоги, регрессию интерфейса и качество ответов LLM.',
    ],
  },
  {
    group: 'Sminex — Senior QA-инженер',
    skills: [
      { name: 'Mobile QA', proficiency: 'confident' },
      { name: 'Web QA', proficiency: 'confident' },
      { name: 'REST API', proficiency: 'confident' },
      { name: 'Zephyr / Allure TestOps', proficiency: 'confident' },
      { name: 'Sentry', proficiency: 'confident' },
      { name: 'PostgreSQL', proficiency: 'usable' },
      { name: 'Kafka', proficiency: 'usable' },
      { name: 'Firebase', proficiency: 'usable' },
      { name: 'Charles / Proxyman', proficiency: 'confident' },
      { name: 'AI / LLM', proficiency: 'usable' },
    ],
    evidence: [
      'Отвечает за построение и масштабирование QA-процессов Sminex App: функциональное, системное, интеграционное и регрессионное тестирование iOS, Android, Web, API и смежных систем.',
      'Увеличил покрытие ключевых модулей с 10% до 85–95%, создал более 2000 сценариев и внедрил трёхуровневую стратегию регресса MIN / MID / MAX; доля критических дефектов на Production снижена до менее 5%.',
      'Внедрил Shift-Left-проверку требований, пострелизный мониторинг через Sentry и применение LLM для генерации вариативных тест-кейсов и тестовых данных.',
    ],
  },
  {
    group: 'Elme Messer — QA-инженер',
    skills: [
      { name: 'React.js / React Native', proficiency: 'usable' },
      { name: 'PHP Laravel', proficiency: 'usable' },
      { name: 'PostgreSQL', proficiency: 'confident' },
      { name: 'REST API', proficiency: 'confident' },
      { name: 'Postman / Swagger', proficiency: 'confident' },
      { name: 'JMeter', proficiency: 'usable' },
      { name: 'Kibana / Sentry', proficiency: 'confident' },
      { name: 'Grafana', proficiency: 'usable' },
      { name: 'Docker', proficiency: 'usable' },
      { name: 'TestIT', proficiency: 'confident' },
    ],
    evidence: [
      'Тестировал международные web-сервисы GAS-WIKI, E-Service, E-Monitoring, Messer Gas-Converter и helium.em в четырёх Scrum-командах.',
      'Проводил функциональное, интеграционное, API-, системное и нагрузочное тестирование, проверял PostgreSQL и stage-окружение, оформлял тест-кейсы и спринтовые отчёты в TestIT.',
      'Внедрил практику тестирования требований, адаптировал европейские QA-мануалы, написал более 10 регламентов для Wiki и проводил демонстрации перед бизнесом.',
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
    group: 'Ask Romeo — QA/AI portfolio',
    skills: [
      { name: 'Next.js', proficiency: 'confident' },
      { name: 'React', proficiency: 'confident' },
      { name: 'TypeScript', proficiency: 'usable' },
      { name: 'Tailwind CSS', proficiency: 'confident' },
      { name: 'RAG', proficiency: 'usable' },
      { name: 'PostgreSQL', proficiency: 'usable' },
      { name: 'Groq', proficiency: 'usable' },
      { name: 'OpenAI Codex', proficiency: 'confident' },
    ],
    evidence: [
      'Built a conversational Next.js and TypeScript portfolio where projects, experience, and skills are explored through questions instead of a conventional résumé layout.',
      'Connected an FAQ cache, Wiki/RAG retrieval, and answer generation, with visible sources, confidence signals, and safe fallbacks when evidence is insufficient.',
      'Applies QA practices to the AI product by validating localization, responsive layouts, saved conversations, UI regression, and LLM answer quality.',
    ],
  },
  {
    group: 'Sminex — Senior QA Engineer',
    skills: [
      { name: 'Mobile QA', proficiency: 'confident' },
      { name: 'Web QA', proficiency: 'confident' },
      { name: 'REST API', proficiency: 'confident' },
      { name: 'Zephyr / Allure TestOps', proficiency: 'confident' },
      { name: 'Sentry', proficiency: 'confident' },
      { name: 'PostgreSQL', proficiency: 'usable' },
      { name: 'Kafka', proficiency: 'usable' },
      { name: 'Firebase', proficiency: 'usable' },
      { name: 'Charles / Proxyman', proficiency: 'confident' },
      { name: 'AI / LLM', proficiency: 'usable' },
    ],
    evidence: [
      'Owns and scales QA processes for Sminex App across iOS, Android, Web, APIs, and connected systems, covering functional, system, integration, and regression testing.',
      'Raised key-module coverage from 10% to 85–95%, authored 2,000+ scenarios, and introduced MIN / MID / MAX regression levels; critical production defect leakage fell below 5%.',
      'Introduced Shift-Left requirements review, post-release monitoring in Sentry, and LLM-assisted generation of variable test cases and test data.',
    ],
  },
  {
    group: 'Elme Messer — QA Engineer',
    skills: [
      { name: 'React.js / React Native', proficiency: 'usable' },
      { name: 'PHP Laravel', proficiency: 'usable' },
      { name: 'PostgreSQL', proficiency: 'confident' },
      { name: 'REST API', proficiency: 'confident' },
      { name: 'Postman / Swagger', proficiency: 'confident' },
      { name: 'JMeter', proficiency: 'usable' },
      { name: 'Kibana / Sentry', proficiency: 'confident' },
      { name: 'Grafana', proficiency: 'usable' },
      { name: 'Docker', proficiency: 'usable' },
      { name: 'TestIT', proficiency: 'confident' },
    ],
    evidence: [
      'Tested the international GAS-WIKI, E-Service, E-Monitoring, Messer Gas-Converter, and helium.em web services across four Scrum teams.',
      'Performed functional, integration, API, system, database, stage, and load testing, while maintaining TestIT cases and sprint reports.',
      'Introduced requirements testing, adapted European QA manuals, wrote 10+ Wiki testing regulations, and presented demos to business stakeholders.',
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
      'Tested DPD portal and client integrations at a scale of 100,000+ parcels per day, covering company registration, pricing, ordering, tracking, authorization, and shipment management.',
      'Performed smoke, integration, regression, and system testing of microservices, Oracle SQL, and XML integrations through Postman and SoapUI.',
      'Updated 200+ and authored about 300 test cases, onboarded QA engineers and analysts, and helped shorten regression by one day by transferring 20% of cases to automation.',
    ],
  },
];
