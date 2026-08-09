import type { ChatLanguage } from '@/lib/i18n/detect-language';
import type { FaqAnswer } from '@/lib/faq/answers';

type PhilosophyAnswerInput = Omit<
  FaqAnswer,
  'answer' | 'cacheMode' | 'answerSource' | 'skippedGroq' | 'visibility'
> & {
  cacheMode?: FaqAnswer['cacheMode'];
  visibility?: FaqAnswer['visibility'];
};

const BASE_GUARDRAILS = [
  'Serve only after recruiter-risk matching has had priority.',
  "Frame this as Romeo's working thesis, not a universal industry claim.",
  'Do not say teams disappear, people are replaced, or one person is always better than a team.',
  'Keep human judgment, collaboration, and verification central.',
];

export const PHILOSOPHY_ANSWERS: FaqAnswer[] = [
  // 1. AI-era Competitiveness / Developer Future (RU)
  createPhilosophyAnswer({
    id: 'faq.vision.ai_developer_future.default',
    intentId: 'vision.ai_developer_future',
    entityId: 'oosu_philosophy',
    language: 'ru',
    quickLabel: 'ИИ и конкуренция',
    displayQuestion: 'Может ли разработчик, который активно использует ИИ, оставаться конкурентоспособным в будущем?',
    alternativeDisplayQuestions: [
      'Каковы шансы разработчиков против ИИ?',
      'Не обесценит ли ИИ навыки написания кода?',
    ],
    patterns: [
      'разработчик в эпоху ИИ',
      'зависимость от ИИ',
      'конкурентоспособность в будущем',
      'нужны ли разработчики если ИИ делает всё',
      'как выжить разработчику в эпоху ИИ',
      'AI era developer',
      'AI tool dependency',
      'future competitiveness',
      'do developers matter if AI does everything',
      'developers who survive the AI era',
    ],
    shortAnswer:
      'Есть разница между разработчиком, который умеет использовать ИИ, и тем, кого ИИ заменит. Роман постоянно проводит эксперименты, чтобы нащупать эту грань.',
    defaultAnswer: [
      'Вот как я думаю об этом.',
      '',
      'Вопрос «зачем нужны разработчики, если ИИ пишет код?» исходит из предположения, что разработчик — это просто генератор кода.',
      '',
      'Я проводил эксперименты, используя Claude Code, Gemini CLI и Codex одновременно, чтобы в одиночку вести проекты, для которых обычно требуется целая команда. Например, клон Instagram: 22 таблицы БД, схема связей из 7 доменов, Next.js на фронтенде, Spring Boot на бэкенде и PostgreSQL. Работая один в темпе небольшой команды, я понял: есть вещи, которые ИИ сделать не может.',
      '',
      'ИИ не может решить, **что именно нужно создавать**. Какие функции действительно нужны пользователям, какие проектные решения вызовут проблемы в будущем, какой технический долг мы создаем сегодня — все это остается задачей человека.',
      '',
      'Я делаю ставку на то, чтобы быть человеком, который принимает эти решения быстро и аргументированно. А не на то, насколько быстро я умею писать код вручную.',
    ].join('\n'),
    detailedAnswer: [
      'Если конкретнее, при работе с ИИ роль разработчика перестраивается в три ключевые функции:',
      '',
      '**1. Архитектурный судья.** ИИ хорош в реализации, но не понимает долгосрочных компромиссов. Если спросить ИИ «почему этот подход вызовет проблемы позже?», он даст ответ — но подходит ли этот ответ контексту конкретного проекта, решает человек. В Ask Romeo ИИ предлагал варианты реализации RAG, но окончательное решение о разделении FAQ и RAG принимал я.',
      '',
      '**2. Продуктовый навигатор.** Решать, что именно создавать — это по-прежнему задача человека. В клоне Instagram выбор таких AI-функций, как модерация комментариев и генерация тегов, был продиктован пониманием болей пользователей, а не просто технической возможностью.',
      '',
      '**3. Оркестратор ИИ-инструментов.** Управление несколькими моделями в параллели — это понимание сильных и слабых сторон каждой модели и умение правильно распределять задачи.',
      '',
      'Разработчик, который сочетает в себе эти три роли, будет востребован в эпоху ИИ. Именно к этому я стремлюсь.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      leadVisual: 'vision_card',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'profile.ai_workflow',
      'project.askoosu.fact',
      'project.instagram_clone.fact',
      'profile.strengths',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: BASE_GUARDRAILS,
    matchedEntityIds: ['oosu_philosophy', 'ai_thesis', 'profile', 'ai_era_competitiveness'],
    confidence: 0.95,
  }),

  // 1. AI-era Competitiveness / Developer Future (EN)
  createPhilosophyAnswer({
    id: 'faq.vision.ai_developer_future.default',
    intentId: 'vision.ai_developer_future',
    entityId: 'oosu_philosophy',
    language: 'en',
    quickLabel: 'AI-era edge',
    displayQuestion: 'Can a developer who relies this heavily on AI tools still be competitive in the future?',
    alternativeDisplayQuestions: [
      'What is your edge against AI?',
      'Will coding skills become obsolete?',
    ],
    patterns: [
      'AI era developer',
      'AI tool dependency',
      'future competitiveness',
      'do developers matter if AI does everything',
      'developers who survive the AI era',
    ],
    shortAnswer:
      "There's a difference between a developer who uses AI well and a developer who gets replaced by AI. Romeo is currently running experiments on that exact distinction.",
    defaultAnswer: [
      'Here is how Romeo thinks about this question.',
      '',
      'The question "what\'s the point of developers if AI writes code?" seems to come from a framing that sees AI as nothing more than a code generator.',
      '',
      'Romeo has used Claude Code, Gemini CLI, and Codex simultaneously to run projects that would normally require a multi-person team — solo. The Instagram clone: 22 tables, 7-domain ERD, Next.js frontend + Spring Boot backend + PostgreSQL. Running this alone at a pace close to a four-person team, what Romeo discovered was this: there are things AI genuinely cannot do.',
      '',
      'AI cannot decide **what to build**. Which features users actually need, what design choices will create problems down the road, what technical debt a decision made today will generate three months from now — these are still jobs for humans.',
      '',
      'Romeo is betting on being the person who makes those judgments quickly and with sound reasoning. Not on how fast Romeo can type code.',
    ].join('\n'),
    detailedAnswer: [
      'To be more specific — working with AI, Romeo has noticed the developer\'s role being restructured into three functions.',
      '',
      '**1. Architecture judge**',
      'AI is good at implementation but doesn\'t grasp the trade-offs in design decisions. Ask AI "why will this approach cause problems later?" and it\'ll give an answer — but whether that answer fits the current project\'s context is still a human judgment call. Ask Romeo\'s RAG architecture decisions — the reason for separating FAQ cache and RAG routing — AI proposed options, but Romeo judged and decided.',
      '',
      '**2. Product direction definer**',
      'Deciding what to build is still a human domain. In the Instagram clone, choosing AI features like comment harassment detection was not because they were technically feasible — it was because Romeo understood the real friction points in social platforms. That judgment came from years of observing user behavior patterns.',
      '',
      '**3. AI orchestrator**',
      'Setting architecture with Claude Code, delegating implementation to Codex, running large-scale refactoring with Gemini CLI — this isn\'t simply "being good at AI tools." It\'s a meta-judgment: understanding each model\'s strengths and weaknesses, and deciding which judgments to delegate where.',
      '',
      'The developer who can do all three simultaneously is the competitive developer in the AI era. That\'s the direction Romeo is actively building himself toward.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      leadVisual: 'vision_card',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'profile.ai_workflow',
      'project.askoosu.fact',
      'project.instagram_clone.fact',
      'profile.strengths',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: BASE_GUARDRAILS,
    matchedEntityIds: ['oosu_philosophy', 'ai_thesis', 'profile', 'ai_era_competitiveness'],
    confidence: 0.95,
  }),

  // 2. Future of Teams (RU)
  createPhilosophyAnswer({
    id: 'faq.vision.team_future.default',
    intentId: 'vision.team_future',
    entityId: 'ai_thesis.team',
    language: 'ru',
    quickLabel: 'Будущее команд',
    displayQuestion: 'Будут ли нужны командные проекты в будущем? Разве работы в одиночку с ИИ недостаточно?',
    alternativeDisplayQuestions: [
      'Исчезнут ли классические команды разработчиков?',
      'Каковы плюсы командной работы при наличии мощного ИИ?',
    ],
    patterns: [
      'будущее командной разработки',
      'нужны ли команды в эпоху ИИ',
      'работа в одиночку с ИИ',
      'будущее сотрудничества',
      'future of team projects',
      'do teams matter in the AI era',
      'working alone with AI',
      'future of team collaboration',
      'working with AI agents',
    ],
    shortAnswer:
      'Я не думаю, что команды исчезнут. Но то, как команды формируются и какие роли в них востребованы, определенно меняется. Этот сдвиг уже начался.',
    defaultAnswer: [
      'Если честно, я проживаю этот эксперимент на собственном опыте.',
      '',
      'В проекте клона Instagram я в одиночку спроектировал API бэкенда, описал ER-диаграмму на 22 таблицы, сгенерировал тестовые данные и провел полную отладку, запуская параллельно ИИ-ассистентов. Мне удалось закрыть объем работы, который обычно делят четыре человека, в разумные сроки.',
      '',
      'Вот к какому выводу я пришел:',
      '',
      '**Чем более задача алгоритмична и понятна, тем меньше для нее нужна команда.** Четкие спецификации, повторяющиеся шаблоны кода — ИИ-ассистенты быстро забирают эту рутину.',
      '',
      '**Чем больше задача требует продуктового суждения и выбора направления, тем больше нужны люди.** Что именно создавать, какие приоритеты выбрать, что решение означает для бизнеса и пользователей — ИИ здесь не помощник. И эта часть работы становится важнее.',
      '',
      'Поэтому вектор движения не в том, что «команды исчезнут», а в том, что **изменится их состав**. Доля чистых исполнителей сократится, а доля людей, определяющих направление и оркестрирующих ИИ, вырастет.',
    ].join('\n'),
    detailedAnswer: [
      'Если говорить конкретнее о моих целях:',
      '',
      '**Сценарий А: Работа в команде.** Я могу выступать связующим звеном — понимать технический контекст разработки, переводить его на язык бизнеса и координировать процессы. Понимание работы ИИ-инструментов позволяет оптимизировать флоу всей команды.',
      '',
      '**Сценарий B: Работа в мини-группе.** В роли Product Owner я могу напрямую взаимодействовать с ИИ-агентами, закрывая вопросы как по коду, так и по тестированию и деплою. Ask Romeo — тому подтверждение: проект от архитектуры RAG до фронтенда и деплоя построен мной с помощью ИИ.',
      '',
      'Я могу ошибаться, и ценность классических больших команд может сохраняться дольше, чем я думаю. Но если этот тренд подтвердится, моя ставка окажется верной.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      leadVisual: 'vision_card',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'project.instagram_clone.fact',
      'profile.ai_workflow',
      'profile.work_style',
      'career.target_role',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: BASE_GUARDRAILS,
    matchedEntityIds: ['oosu_philosophy', 'ai_thesis', 'profile', 'ai_thesis.team'],
    confidence: 0.95,
  }),

  // 2. Future of Teams (EN)
  createPhilosophyAnswer({
    id: 'faq.vision.team_future.default',
    intentId: 'vision.team_future',
    entityId: 'ai_thesis.team',
    language: 'en',
    quickLabel: 'Team future',
    displayQuestion: 'Will team projects still be necessary in the future? Isn\'t working alone with AI enough?',
    alternativeDisplayQuestions: [
      'Do teams matter in the AI era?',
      'Working alone with AI vs team work.',
    ],
    patterns: [
      'future of team projects',
      'do teams matter in the AI era',
      'working alone with AI',
      'future of team collaboration',
      'working with AI agents',
    ],
    shortAnswer:
      "Romeo doesn't think teams disappear. But how teams are composed, and what roles are needed, is clearly changing. Romeo thinks that shift has already started.",
    defaultAnswer: [
      'Honestly — Romeo is living this experiment in real time.',
      '',
      'The Instagram clone project: in a four-person team, Romeo took on backend API design, documentation of a 22-table ERD, seed data generation, and full-stack debugging — solo, running AI agents in parallel. Romeo managed to cover what four people would normally split up, at a reasonable pace.',
      '',
      'Here is the conclusion Romeo drew.',
      '',
      '**The more a job is "well-defined execution," the less a team is needed.** Clear specs, repeating patterns, automatable work — AI agents are rapidly displacing this. Previously, multiple people split this kind of work between them.',
      '',
      '**The more a job is "judgment and direction-setting," the more humans are still needed.** What to build, which priorities to pursue, what a decision means for the business and the user — AI isn\'t good at this. And it\'s becoming more important, not less.',
      '',
      'So Romeo sees the direction as not "teams shrink," but **"how teams are composed changes."** The proportion of execution headcount will decrease; the proportion of people who set direction and orchestrate AI will grow.',
    ].join('\n'),
    detailedAnswer: [
      'To be more concrete about where Romeo is placing his bets:',
      '',
      '**Scenario A: When there\'s a team**',
      'Romeo can step into a PM / QA Lead role and lead the workflow — including the team\'s AI usage — across developers, designers, and data roles. A PM who understands technical context and sets product direction.',
      '',
      '**Scenario B: When working solo or in a small group**',
      'As Product Owner, Romeo directly collaborates with AI agents while covering both developer and designer roles. Ask Romeo is the proof — from RAG architecture design to frontend UI to deployment, built solo with AI.',
      '',
      'Becoming someone who can operate in both modes — that\'s what Romeo is preparing for right now.',
      '',
      'Romeo could be wrong. The value of team collaboration might persist far longer than expected. But if the direction holds, this bet seems worth making.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      leadVisual: 'vision_card',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'project.instagram_clone.fact',
      'profile.ai_workflow',
      'profile.work_style',
      'career.target_role',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: BASE_GUARDRAILS,
    matchedEntityIds: ['oosu_philosophy', 'ai_thesis', 'profile', 'ai_thesis.team'],
    confidence: 0.95,
  }),

  // 3. PM or Developer (RU)
  createPhilosophyAnswer({
    id: 'faq.vision.pm_or_developer.default',
    intentId: 'vision.pm_or_developer',
    entityId: 'ai_thesis.role_fit',
    language: 'ru',
    quickLabel: 'PM или разработчик',
    displayQuestion: 'Вы позиционируете себя как разработчик эпохи ИИ, но кто вы на самом деле — программист или PM?',
    alternativeDisplayQuestions: [
      'В какой роли вы хотите работать?',
      'Вы менеджер продуктов или инженер?',
    ],
    patterns: [
      'PM или разработчик',
      'кто вы по роли',
      'ваша специализация',
      'менеджер или инженер',
      'PM or developer',
      'what is your role',
      'position',
      'aren\'t you a PM',
      'which one are you',
      'developer or product manager',
    ],
    shortAnswer:
      'На самом деле — и то, и другое. В эпоху ИИ эти две роли больше не обязаны быть разделенными.',
    defaultAnswer: [
      'Этот вопрос кажется мне классическим разделением из прошлого.',
      '',
      'Раньше «человек, который решает, что делать» (PM) и «человек, который делает» (разработчик) были разными людьми. Разделение труда существовало потому, что одному человеку было тяжело качественно делать и то, и другое одновременно.',
      '',
      'Когда ИИ берет на себя большую часть рутинного кодинга, смысл этого разделения начинает теряться. Становится возможным быть человеком, который оценивает продуктовые требования и сам же реализует их на практике.',
      '',
      'Я нахожусь как раз на стыке этих ролей. В Ask Romeo я одновременно выступал и как PM (какой должен быть UX, какие нужны ограничения для ИИ), и как разработчик (архитектура RAG, API-эндпоинты, компоненты UI, QA-тесты).',
    ].join('\n'),
    detailedAnswer: [
      'Если говорить о позициях, к которым я готов:',
      '',
      '**В команде: Роль PM / QA Lead.** Специалист, который понимает технический контекст, может говорить на одном языке с инженерами, проектировать тест-планы и организовывать эффективную работу с использованием ИИ.',
      '',
      '**В небольшом проекте: Product Owner + реализация.** Самостоятельное ведение продукта с координацией ИИ-агентов. Это уровень выше обычного fullstack-разработчика: управление не просто технологическими слоями, а совмещение уровней принятия решений и их реализации.',
      '',
      'Я джуниор-специалист, и я этого не отрицаю. Но я развиваю навыки, которые будут востребованы в новой эпохе разработки.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      leadVisual: 'vision_card',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'career.target_role',
      'profile.strengths',
      'profile.ai_workflow',
      'project.askoosu.fact',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: BASE_GUARDRAILS,
    matchedEntityIds: ['oosu_philosophy', 'ai_thesis', 'profile', 'ai_thesis.role_fit'],
    confidence: 0.95,
  }),

  // 3. PM or Developer (EN)
  createPhilosophyAnswer({
    id: 'faq.vision.pm_or_developer.default',
    intentId: 'vision.pm_or_developer',
    entityId: 'ai_thesis.role_fit',
    language: 'en',
    quickLabel: 'PM or developer',
    displayQuestion: 'You call yourself an "AI era developer" — but are you a programmer or a PM?',
    alternativeDisplayQuestions: [
      'PM or developer?',
      'What is your target role?',
    ],
    patterns: [
      'PM or developer',
      'what is your role',
      'position',
      'aren\'t you a PM',
      'which one are you',
      'developer or product manager',
    ],
    shortAnswer:
      'Honestly — both. And Romeo thinks those two might not need to be separate categories anymore.',
    defaultAnswer: [
      'This question feels like a taxonomy from the old world.',
      '',
      'Previously, "the person who decides what to build" and "the person who builds it" were different people. PMs set direction, developers implemented. The division of labor existed because it was hard for one person to excel at both.',
      '',
      'When AI takes on a large portion of implementation, the rationale for that division starts to break down. "Someone who judges what to build while also directly building it" becomes possible.',
      '',
      'Romeo is the person running experiments at that boundary. In Ask Romeo, Romeo was simultaneously PM (what to build, what the UX should be, what guardrails are needed) and developer (RAG architecture, API routing, frontend components).',
    ].join('\n'),
    detailedAnswer: [
      'To be honest about the positions Romeo is preparing for — there are two.',
      '',
      '**When there\'s a team: PM / QA Lead role**',
      'A PM who understands technical context, sets product direction, and communicates meaningfully with developers and designers. Romeo thinks "technical PM" becomes more important in the AI era. Teams using AI will need someone who designs the AI usage approach itself and optimizes the workflow.',
      '',
      '**When working solo or in a small group: Product Owner + execution**',
      'Romeo sets the direction and directly develops while orchestrating AI agents. This is what Romeo thinks of as the next stage beyond "full-stack" — not crossing technology layers, but covering the judgment layer and the execution layer simultaneously.',
      '',
      'Right now Romeo is a junior developer. Romeo is not denying that. But what Romeo is building isn\'t "a good junior developer" — it\'s "a new role that the AI era needs."',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      leadVisual: 'vision_card',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'career.target_role',
      'profile.strengths',
      'profile.ai_workflow',
      'project.askoosu.fact',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: BASE_GUARDRAILS,
    matchedEntityIds: ['oosu_philosophy', 'ai_thesis', 'profile', 'ai_thesis.role_fit'],
    confidence: 0.95,
  }),

  // 4. AI Workflow Origin (RU)
  createPhilosophyAnswer({
    id: 'faq.vision.ai_workflow_origin.default',
    intentId: 'vision.ai_workflow_origin',
    entityId: 'ai_thesis',
    language: 'ru',
    quickLabel: 'AI воркфлоу',
    displayQuestion: 'Как и когда сформировался ваш подход к работе с ИИ?',
    alternativeDisplayQuestions: [
      'Как устроена ваша совместная работа с нейросетями?',
      'Как вы контролируете качество кода от ИИ?',
    ],
    patterns: [
      'как вы используете ИИ',
      'ваш подход к промптингу',
      'стиль работы с нейросетями',
      'интеграция ИИ в работу',
      'AI usage approach',
      'AI workflow',
      'how do you use AI',
      'AI tool usage',
      'AI collaboration style',
    ],
    shortAnswer:
      'Это не было спланировано заранее. Я просто искал способы решать задачи быстрее и эффективнее, и этот рабочий процесс сложился сам собой.',
    defaultAnswer: [
      'Мой процесс работы с ИИ развивался следующим образом.',
      '',
      'Сначала я просто просил ИИ написать код. Проблема обнаружилась сразу: код работал, но при малейшем сбое я не мог его починить, потому что не понимал логику его работы. Тогда я изменил подход: ИИ пишет код, но архитектура, логика и понимание работы системы всегда остаются за мной.',
      '',
      'Затем я стал распределять роли между инструментами. Claude Code — для сложных архитектурных решений и отладки логики. Codex — для быстрой реализации простых компонентов. Gemini — для рефакторинга и работы с большим контекстом всей кодовой базы.',
      '',
      'Реальной проверкой стал проект клона Instagram. Там я в одиночку закрыл бэкенд, базу данных и интеграцию AI-функций, убедившись, что параллельное управление несколькими моделями отлично работает на практике.',
    ].join('\n'),
    detailedAnswer: [
      'Ключевые принципы моего воркфлоу:',
      '',
      '**Принятие решений — за человеком, написание кода — за ИИ.** Если полностью отдать проектирование на откуп ИИ, получится проект, который невозможно поддерживать. Я беру у ИИ скорость реализации, но не перекладываю на него ответственность за архитектуру.',
      '',
      '**Ожидайте ошибки ИИ и проверяйте их.** Нейросети ошибаются, галлюцинируют и предлагают неоптимальный код. Чтобы заметить это, нужно самому понимать тему. Перед тем, как отдать задачу ИИ, я всегда изучаю документацию и основы технологии.',
      '',
      '**Постоянное улучшение процессов.** Я фиксирую ошибки, веду базу знаний в Notion, автоматизирую рутину. Это помогает повышать качество и скорость моей работы на мета-уровне.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      leadVisual: 'vision_card',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'profile.ai_workflow',
      'career.timeline',
      'project.instagram_clone.fact',
      'project.askoosu.fact',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: BASE_GUARDRAILS,
    matchedEntityIds: ['oosu_philosophy', 'ai_thesis', 'profile'],
    confidence: 0.95,
  }),

  // 4. AI Workflow Origin (EN)
  createPhilosophyAnswer({
    id: 'faq.vision.ai_workflow_origin.default',
    intentId: 'vision.ai_workflow_origin',
    entityId: 'ai_thesis',
    language: 'en',
    quickLabel: 'AI workflow',
    displayQuestion: 'This way of working with AI — when and how did it develop?',
    alternativeDisplayQuestions: [
      'How did your AI collaboration approach develop?',
      'Oosu\'s AI workflow history.',
    ],
    patterns: [
      'AI usage approach',
      'AI workflow',
      'how do you use AI',
      'AI tool usage',
      'AI collaboration style',
    ],
    shortAnswer:
      'It wasn\'t planned from the start. Romeo kept experimenting to solve problems faster, and this workflow is what emerged.',
    defaultAnswer: [
      'Romeo\'s AI workflow evolved like this.',
      '',
      'At first it was just "I\'ll ask AI to write the code." The problem surfaced immediately — the code AI gave Romeo ran, but Romeo couldn\'t debug it because Romeo didn\'t understand why it behaved that way. So Romeo shifted: delegate implementation to AI, but make sure Romeo understands the design and flow first.',
      '',
      'Then Romeo started assigning distinct roles to each AI tool. Claude Code for architecture decisions and complex debugging — "why should this be designed this way." Codex for fast implementation delegation when specs are clear. Gemini CLI for large-scale codebase refactoring — when a lot of context is needed.',
      '',
      'The Instagram clone project was the real-world validation. In a four-person team project, Romeo covered backend + DB + AI feature integration solo, and confirmed that orchestrating three AIs in parallel actually works.',
    ].join('\n'),
    detailedAnswer: [
      'The core principles of Romeo\'s current workflow:',
      '',
      '**Judgment is mine, execution belongs to AI.** What to build, which design to choose, what downstream impact a decision will have — if Romeo fully delegates these judgments to AI, Romeo ends up with a codebase Romeo doesn\'t understand. The responsibility for judgment always stays with Romeo; Romeo borrows AI\'s speed for execution.',
      '',
      '**Anticipate and verify AI\'s mistakes.** AI sometimes follows patterns into the wrong direction, misses context, or confidently gives broken code. To catch this, Romeo needs to already know something. So even when Romeo delegates implementation, Romeo always tries to understand the core concepts of the relevant technology first.',
      '',
      '**Continuously improve the workflow itself.** Accumulating error logs, auto-committing algorithm solutions to GitHub, tracking learning patterns — all of this is about improving "how Romeo learns and how Romeo works" at a meta level.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      leadVisual: 'vision_card',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'profile.ai_workflow',
      'career.timeline',
      'project.instagram_clone.fact',
      'project.askoosu.fact',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: BASE_GUARDRAILS,
    matchedEntityIds: ['oosu_philosophy', 'ai_thesis', 'profile'],
    confidence: 0.95,
  }),

  // 5. AI Philosophy Summary (RU)
  createPhilosophyAnswer({
    id: 'faq.vision.ai_philosophy_summary.default',
    intentId: 'vision.ai_philosophy_summary',
    entityId: 'ai_thesis',
    language: 'ru',
    quickLabel: 'AI философия',
    displayQuestion: 'Как бы вы сформулировали свое отношение к ИИ в одной фразе?',
    alternativeDisplayQuestions: [
      'Какова ваша философия работы с нейросетями?',
      'ИИ для вас — инструмент или коллега?',
    ],
    patterns: [
      'отношение к ИИ',
      'философия работы с ИИ',
      'что для вас ИИ',
      'взгляд на нейросети',
      'thoughts on AI',
      'AI philosophy',
      'how do you see AI',
      'AI perspective',
      'attitude toward AI',
    ],
    shortAnswer:
      'ИИ — это не просто инструмент, это скорее коллега. Но не тот, который сам знает, что делать, а тот, кому нужно задавать четкое направление и контролировать результат.',
    defaultAnswer: [
      'Называть ИИ просто «инструментом» — значит недооценивать его возможности. Называть его «коллегой» — излишне одушевлять.',
      '',
      'Ближе всего аналогия: **«очень способный стажер без контекста»**. Он делает все быстро и аккуратно, но ему нужно постоянно объяснять, зачем мы это делаем, какие у нас ограничения и как эта задача связана с остальными частями проекта.',
      '',
      'Поэтому главный навык работы с ИИ — это **передача контекста**. Дело не в составлении хитрых промптов, а в умении четко структурировать задачу, рамки изменений и критерии проверки так, чтобы модель могла их обработать.',
      '',
      'Я развивал этот навык на прошлых этапах: анализируя данные в GfK, управляя процессами в винотеке и проектируя интерфейсы. Все это помогает мне точно формулировать задачи для ИИ-ассистентов сегодня.',
    ].join('\n'),
    detailedAnswer: [
      'По мере усложнения ИИ-агентов ключевой становится роль **оркестратора**.',
      '',
      'Управление параллельной работой нескольких ассистентов (Claude Code, Gemini, Codex), интеграция результатов их генерации и ведение проекта в едином направлении — это работа, похожая на дирижирование оркестром. Дирижер не обязан играть на скрипке лучше скрипача, но он должен понимать, как звучит все произведение целиком.',
      '',
      'Разработчик новой эпохи все больше напоминает такого дирижера. И мой разносторонний бэкграунд (аналитика, бизнес-операции, QA, fullstack) дает мне отличную базу для этой роли.',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      leadVisual: 'vision_card',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'profile.ai_workflow',
      'profile.values',
      'profile.long_intro',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: BASE_GUARDRAILS,
    matchedEntityIds: ['oosu_philosophy', 'ai_thesis', 'profile'],
    confidence: 0.95,
  }),

  // 5. AI Philosophy Summary (EN)
  createPhilosophyAnswer({
    id: 'faq.vision.ai_philosophy_summary.default',
    intentId: 'vision.ai_philosophy_summary',
    entityId: 'ai_thesis',
    language: 'en',
    quickLabel: 'AI philosophy',
    displayQuestion: 'How would you summarize your perspective on AI in one phrase?',
    alternativeDisplayQuestions: [
      'What is your AI philosophy?',
      'AI perspective.',
    ],
    patterns: [
      'thoughts on AI',
      'AI philosophy',
      'how do you see AI',
      'AI perspective',
      'attitude toward AI',
    ],
    shortAnswer:
      'AI isn\'t a tool. It\'s closer to a teammate. But not a teammate who follows instructions well — it\'s a teammate who needs direction from Romeo to do its job.',
    defaultAnswer: [
      'Calling AI a "tool" feels like an underestimation. Calling it a "colleague" feels like over-anthropomorphizing.',
      '',
      'The analogy Romeo finds closest is **"an exceptionally capable new hire with no context."** Executes fast and well — but Romeo has to continuously explain why this matters, and how this decision connects to everything else.',
      '',
      'So the core capability for working well with AI is **"communicating context clearly."** More than writing good prompts — it\'s structuring and conveying "why this decision matters in this project" in a way AI can actually process.',
      '',
      'Romeo has been deliberately training toward that. Breaking down complex data for clients at GfK, operating the wine store where Romeo had to understand and decide on all context, structuring user context — all of this connects to "context delivery capability" when working with AI.',
    ].join('\n'),
    detailedAnswer: [
      'As AI agents multiply, Romeo thinks the **orchestrator role** becomes the most critical.',
      '',
      'Working with multiple AI agents simultaneously — Claude Code, Gemini CLI, Codex — understanding each one\'s strengths, deciding which judgments to delegate where, integrating each agent\'s output, and steering everything in a consistent direction. That\'s the orchestrator\'s job.',
      '',
      'It\'s like a conductor. A conductor doesn\'t need to play violin as well as the violinist. But they need to know how the full piece should sound, what role each section plays, and when to bring whom forward.',
      '',
      'Romeo thinks the AI era developer increasingly resembles that conductor. And Romeo thinks he has the background to do that role well — data analytics, service operations, QA, full-stack development experience all connect to "the ability to understand the full context while coordinating each part."',
    ].join('\n'),
    renderSpec: {
      layout: 'text_only',
      density: 'standard',
      leadVisual: 'vision_card',
      components: ['SourceBadgeList'],
    },
    visualBlocks: [{ type: 'sourceBadges' }],
    sourceChunkIds: [
      'profile.ai_workflow',
      'profile.values',
      'profile.long_intro',
    ],
    hasTodo: false,
    freshness: 'stable',
    guardrails: BASE_GUARDRAILS,
    matchedEntityIds: ['oosu_philosophy', 'ai_thesis', 'profile'],
    confidence: 0.95,
  }),
];

export function findPhilosophyAnswerById(
  id: string | null | undefined,
  language: ChatLanguage
) {
  if (!id) return null;
  return (
    PHILOSOPHY_ANSWERS.find(
      (answer) => answer.id === id && answer.language === language
    ) ??
    PHILOSOPHY_ANSWERS.find(
      (answer) => answer.intentId === id && answer.language === language
    ) ??
    PHILOSOPHY_ANSWERS.find(
      (answer) => answer.legacyIds?.includes(id) && answer.language === language
    ) ??
    null
  );
}

function createPhilosophyAnswer(input: PhilosophyAnswerInput): FaqAnswer {
  return {
    ...input,
    answer: input.defaultAnswer,
    cacheMode: input.cacheMode ?? 'direct_cache',
    answerSource: 'philosophy_docs',
    skippedGroq: true,
    visibility: input.visibility ?? 'public',
  };
}
