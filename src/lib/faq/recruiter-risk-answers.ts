import type { FaqAnswer } from './answers';

type RecruiterRiskFaqInput = Omit<
  FaqAnswer,
  'answer' | 'cacheMode' | 'answerSource' | 'skippedGroq' | 'visibility'
> & {
  cacheMode?: FaqAnswer['cacheMode'];
  visibility?: FaqAnswer['visibility'];
};

export const RECRUITER_RISK_FAQ_ANSWERS: FaqAnswer[] = [
  // 1. Retention / Startup Risk (RU)
  createRecruiterRiskAnswer({
    id: 'faq.recruiter.retention_startup_risk.default',
    intentId: 'recruiter.retention_startup_risk',
    entityId: 'recruiter',
    language: 'ru',
    quickLabel: 'Риск увольнения',
    displayQuestion:
      'Есть ли риск того, что он не задержится надолго и уйдет открывать свой стартап, получив нужные знания?',
    alternativeDisplayQuestions: [
      'Мне кажется, он быстро уйдет из компании. Что вы думаете?',
      'Может ли он быстро научиться новому и уйти в собственный стартап?',
    ],
    patterns: [
      'не задержится надолго',
      'быстро уволится',
      'уйдет в стартап',
      'создаст свой стартап',
      'уйдет открывать свое дело',
      'быстро уйдет',
      'риск долгосрочной работы',
      'проблема удержания сотрудника',
      'уйдет через несколько месяцев',
      'быстрый уход из компании',
      'будет отвлекаться на стартапы',
    ],
    shortAnswer:
      'Это логичное опасение. Однако суть не в том, чтобы удерживать сотрудника любой ценой, а в том, готов ли он взять на себя ответственность за сложную задачу и довести её до конца.',
    defaultAnswer: [
      'Это опасение вполне объяснимо. Роман не из тех, кто годами готов выполнять рутинные, узкие задачи. Ему важно переносить знания на уровень работающих продуктов и систем, поэтому в условиях жестких ограничений и отсутствия зон ответственности он может почувствовать дискомфорт.',
      '',
      'Но это не значит, что он просто «заберет опыт и уйдет». Его интерес к созданию продуктов и стартап-опыт — это показатель ответственного подхода: ему действительно важно, чтобы продукт приносил пользу. Если в компании ему доверят сложные задачи на стыке фронтенда, бэкенда, тестирования и AI, он будет вовлечен с максимальной отдачей и проработает долго.',
      '',
      'С точки зрения найма, важнее оценивать не гипотеческую склонность к стартапам, а то, дает ли текущая роль достаточный профессиональный вызов и сможем ли мы четко определить его зону ответственности на первые 90 дней.',
    ].join('\n'),
    detailedAnswer: [
      'Этот риск стоит учитывать, но полезно сместить фокус оценки.',
      '',
      'Карьерный путь Романа — это движение к более глубокому пониманию продукта. Маркетинг, аналитика данных, UX, fullstack-разработка и внедрение AI — всё это подчинено одной цели: создавать работающие решения.',
      '',
      'Поэтому вероятность долгосрочной работы зависит от среды. Если задачи интересные, зона ответственности расширяется, а проекты находятся на стыке разработки, QA и AI — он будет максимально мотивирован работать долго. Если же задачи рутинные, а рост заблокирован — риск ухода действительно возрастает.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'faq.recruiter.retention_risk.default',
      'faq.recruiter.startup_intent.default',
      'profile.work_style',
      'career.oosu_salon',
      'career.target_role',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      'Answer only when the user directly raises recruiter-risk concerns.',
      'Do not turn this concern bank into visible recommended questions.',
    ],
    matchedEntityIds: ['recruiter', 'profile', 'career', 'career.oosu_salon'],
    confidence: 0.98,
  }),

  // 1. Retention / Startup Risk (EN)
  createRecruiterRiskAnswer({
    id: 'faq.recruiter.retention_startup_risk.default',
    intentId: 'recruiter.retention_startup_risk',
    entityId: 'recruiter',
    language: 'en',
    quickLabel: 'Retention risk',
    displayQuestion:
      'Is Oosu likely to leave quickly after learning enough, or move toward a startup?',
    alternativeDisplayQuestions: [
      'Will Oosu stay long-term?',
      'Will Oosu just learn enough and leave to start something?',
    ],
    patterns: [
      'retention risk startup risk',
      'will Oosu just learn and leave',
      'will Oosu leave quickly',
      'will Oosu leave to start a company',
      'learn enough and leave for a startup',
      'job hopping founder mindset',
      'will Oosu leave to start a company',
      'founder mindset risk',
      'startup concern',
    ],
    shortAnswer:
      'It is a fair concern. The better question is not whether Oosu can be kept in place at all costs, but whether the role gives him a real product problem to own and finish.',
    defaultAnswer: [
      'That concern is reasonable. Oosu does not look like someone who would thrive for long in a very narrow, repetitive role. He tends to connect what he learns into working products and systems, so a role with no room for responsibility or growth could become frustrating.',
      '',
      'That does not mean he would simply learn enough and leave. His founder/operator background is better read as a product ownership signal: he cares whether the thing actually works for users. If a company gives him problems that connect UI, APIs, data, AI, and deployment, that same energy can become focus and ownership inside the company.',
      '',
      'From a hiring perspective, the useful question is not "will he ever think about startups?" It is "does this role give him a deep enough product problem to own, and can we define a first-90-days responsibility he can carry through?"',
    ].join('\n'),
    detailedAnswer: [
      'The risk should be acknowledged, but the evaluation frame matters.',
      '',
      'Oosu has repeatedly moved toward more direct ownership of problems: marketing, data, consulting, operating a service, UX, full-stack development, and AI product design. That pattern is less about leaving and more about wanting to work closer to real product outcomes.',
      '',
      'The retention signal is therefore environment-dependent. If the work has real user impact, room to grow responsibility, and cross-functional product/AI/data problems, the fit is stronger. If the role is narrow, repetitive, and disconnected from product impact, the risk becomes higher.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'faq.recruiter.retention_risk.default',
      'faq.recruiter.startup_intent.default',
      'profile.work_style',
      'career.oosu_salon',
      'career.target_role',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      'Answer only when the user directly raises recruiter-risk concerns.',
      'Do not turn this concern bank into visible recommended questions.',
    ],
    matchedEntityIds: ['recruiter', 'profile', 'career', 'career.oosu_salon'],
    confidence: 0.98,
  }),

  // 2. Age / Career Timing (RU)
  createRecruiterRiskAnswer({
    id: 'faq.recruiter.age_career_timing.default',
    intentId: 'recruiter.age_career_timing',
    entityId: 'recruiter',
    language: 'ru',
    quickLabel: 'Возраст кандидата',
    displayQuestion: 'Не слишком ли кандидат взрослый для джуниор-специалиста?',
    alternativeDisplayQuestions: [
      'Не староват ли он?',
      'Тяжело ли ему адаптироваться в молодой команде?',
    ],
    patterns: [
      'слишком взрослый для джуна',
      'возраст кандидата',
      'не староват ли',
      'трудности адаптации из-за возраста',
      'возраст для младшего специалиста',
      'too old to hire as a junior',
      'too old for a junior candidate',
      'will age make it hard to adapt',
    ],
    shortAnswer:
      'Роман перешел в сферу разработки программного обеспечения позже типичных кандидатов, но он не считает прошлые годы упущенным временем. Это был период накопления опыта в аналитике данных, бизнесе, управлении качеством и операциях.',
    defaultAnswer: [
      'Это правда, что Роман сменил сферу деятельности и занялся разработкой позже, чем стандартные джуниор-специалисты. Однако этот опыт не был паузой — он посвящен практическому пониманию потребностей пользователей, анализу данных и управлению проектами.',
      '',
      'Как QA-инженер, он понимает необходимость быстрой адаптации и подтверждения навыков через реальные результаты. Для этого он активно применяет современные AI-инструменты, RAG-системы и детальное тестирование.',
      '',
      'Роман рассматривает свой возраст не как недостаток, а как контекст, помогающий лучше понимать бизнес-ограничения, требования к качеству и оценивать риски продукта.',
    ].join('\n'),
    detailedAnswer: [
      'Это вполне понятное опасение. Поскольку Роман пришел в разработку позже традиционного возраста, у него меньше лет непосредственного кодинга, чем у выпускников вузов.',
      '',
      'Однако его прошлый опыт имеет высокую ценность. Аналитика данных научила его видеть смысл за цифрами, а операционное управление бизнесом — понимать, как доверие пользователей, качество сервиса и доходы связаны между собой.',
      '',
      'В работе он стремится конвертировать этот бэкграунд в практическую пользу: быстро вникать в требования, писать понятные тест-планы, прогнозировать риски интеграции и подтверждать качество продукта.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'career.timeline',
      'career.oosu_salon',
      'profile.learning_style',
      'project.askoosu.fact',
    ],
    visibility: 'limited',
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      'Answer only when the user directly raises recruiter-risk concerns.',
      'Do not turn this concern bank into visible recommended questions.',
    ],
    matchedEntityIds: ['recruiter', 'profile', 'career'],
    confidence: 0.95,
  }),

  // 2. Age / Career Timing (EN)
  createRecruiterRiskAnswer({
    id: 'faq.recruiter.age_career_timing.default',
    intentId: 'recruiter.age_career_timing',
    entityId: 'recruiter',
    language: 'en',
    quickLabel: 'Career timing',
    displayQuestion: 'Are you older than typical junior candidates?',
    alternativeDisplayQuestions: [
      'Career transition was late',
      'Age concern',
    ],
    patterns: [
      'older junior candidate',
      'career transition was late',
      'age concern',
      'late career switch',
      'older than typical junior',
      'age risk',
      'too old to hire as a junior',
      'too old for a junior candidate',
      'will age make it hard to adapt',
    ],
    shortAnswer:
      'It is true that Oosu transitioned into software development later than some traditional junior candidates. But he does not see that time as a gap. He spent it building experience in customer-facing work, data analysis, brand operation, entrepreneurship, and service operations.',
    defaultAnswer: [
      'It is true that Oosu transitioned into software development later than some traditional junior candidates. But he does not see that time as a gap. He spent it building experience in customer-facing work, data analysis, brand operation, entrepreneurship, and service operations.',
      '',
      'As a developer, he understands that he needs to learn quickly and prove his ability through real output. That is why he has leaned into AI tools, documentation, project-based learning, and the AskOosu RAG portfolio system.',
      '',
      'Oosu does not frame age as something to defend. He frames it as context that helps him understand users, business constraints, and product judgment more realistically.',
    ].join('\n'),
    detailedAnswer: [
      'That is a fair concern. Because Oosu started software development relatively late, he has less accumulated engineering time than someone who followed the traditional path.',
      '',
      'However, the previous time was not empty. Data analysis taught him to read the context behind numbers, and operating a brand and service taught him how user trust, service quality, revenue, and operational risk connect in real situations.',
      '',
      'At work, he wants to turn that context into practical contribution: reading user needs, making grounded product judgments, learning quickly, and proving progress through working output. He does not want to overstate this. It is something he needs to keep proving through projects and collaboration.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'career.timeline',
      'career.oosu_salon',
      'profile.learning_style',
      'project.askoosu.fact',
    ],
    visibility: 'limited',
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      'Answer only when the user directly raises recruiter-risk concerns.',
      'Do not turn this concern bank into visible recommended questions.',
    ],
    matchedEntityIds: ['recruiter', 'profile', 'career'],
    confidence: 0.95,
  }),

  // 3. Non-CS Background (RU)
  createRecruiterRiskAnswer({
    id: 'faq.recruiter.non_cs_background.default',
    intentId: 'recruiter.non_cs_background',
    entityId: 'recruiter',
    language: 'ru',
    quickLabel: 'Отсутствие ИТ-диплома',
    displayQuestion: 'Беспокоит ли вас отсутствие профильного ИТ-образования (CS)?',
    alternativeDisplayQuestions: [
      'Как вы справляетесь без диплома Computer Science?',
      'Не мешает ли отсутствие профильного образования в работе?',
    ],
    patterns: [
      'отсутствие профильного образования',
      'непрофильный бэкграунд',
      'нет диплома программиста',
      'не айтишник по образованию',
      'самоучка',
      'not having a CS degree',
      'non CS background',
      'no computer science degree',
      'non traditional background',
      'not a CS major',
      'career changer developer',
    ],
    shortAnswer:
      'Роман не скрывает отсутствие классического профильного диплома. Для него это стимул учиться быстрее, больше практиковаться и подтверждать свои знания реальными работающими решениями.',
    defaultAnswer: [
      'Роман открыто говорит о том, что у него нет классического диплома в области компьютерных наук (Computer Science). Это мотивирует его постоянно развиваться и подтверждать экспертизу практическими проектами.',
      '',
      'В процессе обучения и работы он всегда тянулся к сильным техническим специалистам, перенимая у них лучшие практики, работая с документацией и глубоко погружаясь в автоматизацию процессов.',
      '',
      'Его сила — не в начальном багаже готовых академических знаний, а в умении быстро находить пробелы, разбираться в сложных инструментах, эффективно использовать ИИ для рутины и выдавать качественный результат.',
    ].join('\n'),
    detailedAnswer: [
      'Отсутствие профильного образования Роман воспринимает как условие, требующее более тщательного практического подтверждения навыков.',
      '',
      'Поэтому он не ограничивается теорией, а сразу переходит к практике: от командных проектов и написания API до развертывания RAG-систем и создания детальных планов тестирования. В случае нехватки знаний его цикл действий прост: изучить документацию, проконсультироваться с AI-ассистентами, проверить гипотезу в коде и зафиксировать работающее решение в виде автотеста или рабочего модуля.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'profile.learning_style',
      'career.timeline',
      'project.askoosu.fact',
      'postmortem.instagram-clone-fullstack-lessons',
    ],
    visibility: 'limited',
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      'Answer only when the user directly raises recruiter-risk concerns.',
      'Do not turn this concern bank into visible recommended questions.',
    ],
    matchedEntityIds: ['recruiter', 'profile', 'career'],
    confidence: 0.95,
  }),

  // 3. Non-CS Background (EN)
  createRecruiterRiskAnswer({
    id: 'faq.recruiter.non_cs_background.default',
    intentId: 'recruiter.non_cs_background',
    entityId: 'recruiter',
    language: 'en',
    quickLabel: 'Non-CS background',
    displayQuestion: 'Are you concerned about not having a CS degree?',
    alternativeDisplayQuestions: [
      'Do you have a CS degree?',
      'How do you handle technical concepts without CS major?',
    ],
    patterns: [
      'not having a CS degree',
      'non CS background',
      'no computer science degree',
      'non traditional background',
      'not a CS major',
      'career changer developer',
    ],
    shortAnswer:
      'Oosu does not hide the fact that he does not come from a traditional computer science background. Instead, he treats it as a reason to learn faster and prove himself through real output.',
    defaultAnswer: [
      'Oosu does not hide the fact that he does not come from a traditional computer science background. Instead, he treats it as a reason to learn faster and prove himself through real output.',
      '',
      'During bootcamp and project work, he learned alongside people with stronger technical backgrounds and pushed himself to keep up through practice, questions, documentation, and project-based learning.',
      '',
      'His strength is not that he knew everything from the beginning. It is that he can identify what he does not know, learn quickly, use AI and documentation effectively, and turn that learning into working products.',
    ].join('\n'),
    detailedAnswer: [
      'Oosu treats the non-CS starting point as a condition that requires more deliberate proof, not as something to hide.',
      '',
      'That is why he tried not to stop at lectures alone. He moved through team projects, full-stack implementation, a RAG-based portfolio system, deployment, and operational documentation. When he does not know something, his loop is to identify the gap, use documentation and AI tools carefully, verify through code, and turn the result into a working artifact.',
      '',
      'At work, this means he should not pretend to know what he does not know. He should clarify quickly, organize what he learns to team standards, and connect it to working output.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'profile.learning_style',
      'career.timeline',
      'project.askoosu.fact',
      'postmortem.instagram-clone-fullstack-lessons',
    ],
    visibility: 'limited',
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      'Answer only when the user directly raises recruiter-risk concerns.',
      'Do not turn this concern bank into visible recommended questions.',
    ],
    matchedEntityIds: ['recruiter', 'profile', 'career'],
    confidence: 0.95,
  }),

  // 4. Programming Transition (RU)
  createRecruiterRiskAnswer({
    id: 'faq.recruiter.programming_transition.default',
    intentId: 'recruiter.programming_transition',
    entityId: 'recruiter',
    language: 'ru',
    quickLabel: 'Причины перехода',
    displayQuestion: 'Почему вы перешли в сферу ИТ и программирования?',
    alternativeDisplayQuestions: [
      'Зачем вам кодинг после собственного бизнеса?',
      'Что подтолкнуло сменить сферу деятельности?',
    ],
    patterns: [
      'почему айти',
      'зачем перешел в программирование',
      'почему решил стать тестировщиком',
      'причина смены профессии',
      'почему ушел из бизнеса',
      'why programming',
      'why transition into programming',
      'why become a developer',
      'career transition reason',
      'why software development',
    ],
    shortAnswer:
      'Переход Романа в программирование и QA — это осознанный выбор в пользу создания масштабируемых и проверяемых решений, развивающий его многолетний опыт работы с данными и бизнес-процессами.',
    defaultAnswer: [
      'Переход в сферу ИТ не был спонтанным решением. Это логичный шаг к поиску той деятельности, которая максимально раскрывает его аналитические и инженерные сильные стороны.',
      '',
      'Работая в аналитике данных, Роман чувствовал нехватку созидательного процесса. Запуск собственного офлайн-бизнеса (винотеки) дал автономию, но показал, насколько физический бизнес привязывает человека к месту и времени.',
      '',
      'Переломным моментом стала травма во время работы, потребовавшая госпитализации. В этот период бизнес не мог функционировать нормально без его личного участия. Это сделало ограничения привязанного к локации бизнеса очевидными.',
      '',
      'ИТ дает другой путь: созданные цифровые продукты и автотесты работают непрерывно, легко масштабируются и становятся мощнее при интеграции с AI. Для Романа это возможность создавать надежные, работающие системы.',
    ].join('\n'),
    detailedAnswer: [
      'Этот переход не следует трактовать как «побег от рутины» или «желание работать из любой точки». Это рациональное стремление к масштабируемости и автоматизации процессов.',
      '',
      'И через аналитику данных, и через бизнес-операции Роман всегда стремился решать проблемы пользователей. Работа с кодом и качеством ПО (QA) позволяет делать это на системном уровне. В компании он использует свой разносторонний опыт, чтобы находить скрытые риски и обеспечивать высокое качество релизов.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'career.timeline',
      'career.oosu_salon',
      'profile.development_philosophy',
      'project.askoosu.fact',
    ],
    visibility: 'limited',
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      'Answer only when the user directly raises recruiter-risk concerns.',
      'Do not turn this concern bank into visible recommended questions.',
    ],
    matchedEntityIds: ['recruiter', 'profile', 'career'],
    confidence: 0.95,
  }),

  // 4. Programming Transition (EN)
  createRecruiterRiskAnswer({
    id: 'faq.recruiter.programming_transition.default',
    intentId: 'recruiter.programming_transition',
    entityId: 'recruiter',
    language: 'en',
    quickLabel: 'Transition reason',
    displayQuestion: 'Why did you transition into programming?',
    alternativeDisplayQuestions: [
      'Why software development?',
      'Why switch from entrepreneurship to development?',
    ],
    patterns: [
      'why programming',
      'why transition into programming',
      'why become a developer',
      'career transition reason',
      'why software development',
      'why did Oosu switch careers',
    ],
    shortAnswer:
      "Oosu's transition into programming was not simply about following a trend. Programming was a choice to solve problems in a more scalable and repeatable way, extending offline operating experience into software and AI-based product building.",
    defaultAnswer: [
      "Oosu's transition into programming was not simply about following a trend. It was part of a longer process of finding the type of work that fits his strengths and constraints better.",
      '',
      'While working in data analysis, he felt that the fixed structure of corporate work did not fully match how he wanted to build and explore. Later, he started and operated a wine bar expecting more autonomy, but he learned that operating a physical business can tie a person even more tightly to time and place.',
      '',
      'A major turning point came when he was injured while operating the store and had to be hospitalized. During that period, the store could not operate normally and revenue stopped. That experience made the limits of a location-bound business very clear.',
      '',
      'Programming offered a different path. Software can run repeatedly once built, scale beyond one physical location, and become even more powerful when combined with AI. For Oosu, programming is not just a career switch. It is a move toward solving problems in a more scalable and flexible way.',
    ].join('\n'),
    detailedAnswer: [
      'This transition should not be framed as "he disliked company life" or "he simply wanted freedom." The more accurate frame is that he was looking for a more scalable and repeatable way to solve problems.',
      '',
      'Through data analysis and service operations, Oosu moved closer to real user problems. At the same time, he experienced the limits of operating models that are tightly bound to time and place. The hospitalization period made that limitation concrete, but it should be treated as a structural turning point rather than an emotional story.',
      '',
      'Software became a tool for solving similar problems in a more repeatable way. Inside a company, Oosu wants to bring that perspective into development work that considers user experience, operational risk, and implementation together.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'career.timeline',
      'career.oosu_salon',
      'profile.development_philosophy',
      'project.askoosu.fact',
    ],
    visibility: 'limited',
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      'Answer only when the user directly raises recruiter-risk concerns.',
      'Do not turn this concern bank into visible recommended questions.',
    ],
    matchedEntityIds: ['recruiter', 'profile', 'career'],
    confidence: 0.95,
  }),

  // 5. AI Director (RU)
  createRecruiterRiskAnswer({
    id: 'faq.ai_working_style.ai_director.default',
    intentId: 'ai_working_style.ai_director',
    entityId: 'ai_usage',
    language: 'ru',
    quickLabel: 'AI Director',
    displayQuestion: 'Что означает роль «AI Director» в контексте вашей работы?',
    alternativeDisplayQuestions: [
      'Что это за должность такая?',
      'Как вы управляете продуктом с помощью ИИ?',
    ],
    patterns: [
      'AI Director',
      'кто такой AI Director',
      'стиль работы с AI',
      'управление продуктом с помощью ИИ',
      'интеграция AI в разработку',
      'AI working style',
      'AI product loop',
      'AI product builder',
      'using AI across product roles',
    ],
    shortAnswer:
      '«AI Director» — это не формальная должность, а подход к работе: координация проектирования, разработки, тестирования и развертывания продукта с использованием AI в качестве эффективного исполнителя.',
    defaultAnswer: [
      '«AI Director» — это концепция работы, а не официальная штатная позиция. Роман не видит ценность разработчика эпохи AI в одной лишь генерации строк кода.',
      '',
      'Сегодня, когда границы между планированием, дизайном, разработкой и контролем качества размываются, ключевым навыком становится понимание языков всех этих ролей и объединение их в единый продуктовый цикл с помощью ИИ-ассистентов.',
      '',
      'ИИ генерирует варианты и ускоряет рутину. Но именно человек определяет ценность задачи, оценивает безопасность, проверяет работу API и гарантирует качество.',
    ].join('\n'),
    detailedAnswer: [
      'AI Director — это умение связать воедино планирование, кодинг, тестирование и релиз, используя ИИ для автоматизации рутины.',
      '',
      'В Ask Romeo ИИ помог ускорить написание RAG API, шаблонов компонентов и базовых схем данных. Однако решения о разделении кэша FAQ и поиска RAG, использование PostgreSQL/pgvector и обеспечение строгой конфиденциальности — это инженерные решения, принятые и верифицированные Романом лично.',
      '',
      'Этот подход объединяет высокую скорость разработки с человеческой ответственностью за конечный результат.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'decision.why-ai-native-working-thesis',
      'ops.ai-agent-workflow',
      'ops.product-build-loop',
      'project.askoosu.fact',
    ],
    visibility: 'public',
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      'Answer only when the user directly raises recruiter-risk concerns.',
      'Do not turn this concern bank into visible recommended questions.',
    ],
    matchedEntityIds: ['recruiter', 'profile', 'career'],
    confidence: 0.95,
  }),

  // 5. AI Director (EN)
  createRecruiterRiskAnswer({
    id: 'faq.ai_working_style.ai_director.default',
    intentId: 'ai_working_style.ai_director',
    entityId: 'ai_usage',
    language: 'en',
    quickLabel: 'AI Director',
    displayQuestion: 'What does AI Director mean here?',
    alternativeDisplayQuestions: [
      'What is an AI Director working style?',
      'How do you build products with AI?',
    ],
    patterns: [
      'AI Director',
      'AI Director style product builder',
      'AI working style',
      'AI product loop',
      'AI product builder',
      'using AI across product roles',
    ],
    shortAnswer:
      'AI Director is not a formal title here. It is a working style: coordinating problem definition, UX judgment, implementation, content, deployment, and operational feedback with AI as an execution partner.',
    defaultAnswer: [
      'AI Director is not a formal title here. Oosu does not see the AI-era developer role as only writing code faster.',
      '',
      'As the boundaries between product planning, design, engineering, marketing, and operations become less rigid, the valuable skill is not replacing every role alone. It is understanding the language of each role and using AI tools to connect them into one coherent product loop.',
      '',
      'AI expands speed and options. But humans still need to decide which problem matters, which interface feels trustworthy, which message sounds overclaimed, and which data should guide the next iteration.',
      '',
      "Oosu's strength is not competing with AI. It is connecting AI to real users, real product context, and responsible product judgment.",
    ].join('\n'),
    detailedAnswer: [
      'AI Director does not mean replacing planners, designers, developers, and marketers alone with AI. It means almost the opposite: understanding the language of those roles, reviewing AI-generated output in real product context, and connecting the pieces responsibly.',
      '',
      'In AskOosu, AI helped with execution speed: RAG API drafts, component drafts, and data-structure ideas. But the decisions to separate RAG from FAQ cache, use Notion as CMS while keeping PostgreSQL as retrieval cache, and separate public evidence from debug metadata required product judgment and operational awareness.',
      '',
      'So the phrase is closer to a working attitude than a title. Build faster with AI, but keep human responsibility for what gets built and how it is verified.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'decision.why-ai-native-working-thesis',
      'ops.ai-agent-workflow',
      'ops.product-build-loop',
      'project.askoosu.fact',
    ],
    visibility: 'public',
    hasTodo: false,
    freshness: 'stable',
    guardrails: [
      'Answer only when the user directly raises recruiter-risk concerns.',
      'Do not turn this concern bank into visible recommended questions.',
    ],
    matchedEntityIds: ['recruiter', 'profile', 'career'],
    confidence: 0.95,
  }),
];

function createRecruiterRiskAnswer(
  input: RecruiterRiskFaqInput
): FaqAnswer {
  return {
    ...input,
    answer: input.defaultAnswer,
    cacheMode: input.cacheMode ?? 'direct_cache',
    answerSource: 'faq_cache',
    skippedGroq: true,
    visibility: input.visibility ?? 'public',
  };
}
