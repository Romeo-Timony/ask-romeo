'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { isAskOosuDebugUiEnabled } from '@/lib/debug-ui';
import { useDisplayPreferences } from '@/lib/use-display-preferences';
import {
  AlertTriangle,
  BookOpenCheck,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  FolderKanban,
  ShieldAlert,
  Send,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useEffect, useId, useMemo, useState } from 'react';

type RagSource = {
  chunk_id: string;
  entity_id: string | null;
  title: string;
  section_path: string[];
  score: number;
  visibility: string;
  freshness?: string;
  has_todo: boolean;
};

type AnswerConfidence = {
  retrieval: number;
  intent: number;
  freshness: number;
  grounding: number;
  final: number;
};

type RagMetadata = {
  sources: RagSource[];
  confidence: number;
  confidenceSignals?: AnswerConfidence;
  matchedEntityIds: string[];
  hasTodoEvidence: boolean;
  warnings: string[];
  faqId?: string;
  matchedFaqId?: string;
  renderSpecKey?: string;
  answerSource?: string;
  language?: 'ru' | 'en';
  skippedGroq?: boolean;
  provider?: string;
  model?: string;
  errorCode?: string;
  showEvidence?: boolean;
  routeDecision?: {
    mode?: string;
    reason?: string;
  };
};

type ProjectCardInfo = {
  id: string;
  title: string;
  category: Record<'ru' | 'en', string>;
  description: Record<'ru' | 'en', string>;
  tags: string[];
};

type FeedbackRating = 'up' | 'down';
type FeedbackState = 'idle' | 'editing-down' | 'saving' | 'saved' | 'error';
type FeedbackReasonKey =
  | 'incorrect'
  | 'missing_context'
  | 'hard_to_follow'
  | 'too_long';

type FeedbackContext = {
  sessionId?: string | null;
  messageId: string;
  question?: string | null;
  answer?: string;
};

type DisplaySourceItem = {
  key: string;
  source: RagSource;
  title: string;
  sectionPath: string;
  count: number;
};

const MAX_VISIBLE_SOURCES = 4;
const MAX_CLIENT_TEXT_LENGTH = 4000;
const MAX_CLIENT_QUESTION_LENGTH = 1000;
const MAX_CLIENT_REASON_LENGTH = 1000;
const FEEDBACK_REASON_OPTIONS: {
  key: FeedbackReasonKey;
  label: Record<'ru' | 'en', string>;
}[] = [
  {
    key: 'incorrect',
    label: {
      ru: 'Неточно',
      en: 'Inaccurate',
    },
  },
  {
    key: 'missing_context',
    label: {
      ru: 'Мало источников',
      en: 'Needs sources',
    },
  },
  {
    key: 'hard_to_follow',
    label: {
      ru: 'Сложно понять',
      en: 'Hard to follow',
    },
  },
  {
    key: 'too_long',
    label: {
      ru: 'Слишком длинно',
      en: 'Too long',
    },
  },
];

function useSourceColumnCount() {
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setColumnCount(4);
      } else if (width >= 1024) {
        setColumnCount(3);
      } else if (width >= 640) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  return columnCount;
}

const PROJECT_CARDS: Record<string, ProjectCardInfo> = {
  askoosu: {
    id: 'askoosu',
    title: 'Ask Romeo',
    category: {
      ru: 'AI-портфолио',
      en: 'AI Portfolio',
    },
    description: {
      ru: 'Диалоговое портфолио, объединяющее Notion Wiki, RAG-поиск и чат.',
      en: 'Notion Wiki, RAG search, and Groq chat are connected into a conversational portfolio.',
    },
    tags: ['Next.js', 'AI SDK', 'RAG'],
  },
  instagram_clone: {
    id: 'instagram_clone',
    title: 'Instagram Clone',
    category: {
      ru: 'Полнофункциональная SNS-платформа',
      en: 'Fullstack SNS',
    },
    description: {
      ru: 'Полнофункциональный проект с лентой, подписками, комментариями, API и базой данных.',
      en: 'A fullstack practice project for feed, follow, comment, API, and database flows.',
    },
    tags: ['Spring Boot', 'React', 'PostgreSQL'],
  },
  sticks_and_stones: {
    id: 'sticks_and_stones',
    title: 'Sticks & Stones',
    category: {
      ru: 'Миграция рабочего сервиса',
      en: 'Real Service Migration',
    },
    description: {
      ru: 'Обновление и перенос рабочего сайта с WordPress на современный frontend TypeScript/Vite.',
      en: 'A real homepage renewal and migration project from WordPress into a modern frontend stack.',
    },
    tags: ['TypeScript', 'Vite', 'Migration'],
  },
  portfoli_oh: {
    id: 'portfoli_oh',
    title: 'Portfoli-Oh!',
    category: {
      ru: 'Frontend-портфолио',
      en: 'Frontend Portfolio',
    },
    description: {
      ru: 'Интерактивное портфолио 2025 года с акцентом на motion, экспериментальный UI и сторителлинг.',
      en: 'The 2025 interactive portfolio focused on motion, experimental UI, and storytelling.',
    },
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  ez_air: {
    id: 'ez_air',
    title: 'EZ Air',
    category: {
      ru: 'AI-поиск путешествий',
      en: 'AI Travel Search',
    },
    description: {
      ru: 'Проект о поиске авиабилетов на естественном языке и UX туристических сервисов.',
      en: 'A project entity reserved for natural-language flight search and travel product evidence.',
    },
    tags: ['AI Search', 'Travel UX', 'API'],
  },
  uncorked: {
    id: 'uncorked',
    title: 'Uncorked',
    category: {
      ru: 'Концепция винного бара',
      en: 'Wine Bar Concept',
    },
    description: {
      ru: 'Проект о сервис-дизайне винного бара, позиционировании бренда и веб-представлении.',
      en: 'A project entity for wine-bar service design, brand direction, and polished web presence.',
    },
    tags: ['Figma', 'Brand UX', 'Website'],
  },
};

const PROJECT_ENTITY_ALIASES: Record<string, keyof typeof PROJECT_CARDS> = {
  askoosu: 'askoosu',
  'project.askoosu': 'askoosu',
  instagram_clone: 'instagram_clone',
  'project.instagram_clone': 'instagram_clone',
  sticks_and_stones: 'sticks_and_stones',
  sticks_stones: 'sticks_and_stones',
  'project.sticks_and_stones': 'sticks_and_stones',
  'project.sticks_stones': 'sticks_and_stones',
  portfoli_oh: 'portfoli_oh',
  portfolioh: 'portfoli_oh',
  'project.portfoli_oh': 'portfoli_oh',
  'project.portfolioh': 'portfoli_oh',
  ez_air: 'ez_air',
  ezair: 'ez_air',
  'project.ez_air': 'ez_air',
  'project.ezair': 'ez_air',
  uncorked: 'uncorked',
  'project.uncorked': 'uncorked',
};

const SOURCE_SEGMENT_LABELS: Record<string, string> = {
  askoosu: 'Ask Romeo',
  'project.askoosu': 'Ask Romeo',
  aigram: 'Aigram',
  'project.aigram': 'Aigram',
  instagram_clone: 'Instagram Clone',
  'project.instagram_clone': 'Instagram Clone',
  sticks_and_stones: 'Sticks & Stones',
  sticks_stones: 'Sticks & Stones',
  'project.sticks_and_stones': 'Sticks & Stones',
  portfoli_oh: 'Portfoli-Oh!',
  portfolioh: 'Portfoli-Oh!',
  'project.portfoli_oh': 'Portfoli-Oh!',
  ez_air: 'EZ Air',
  'project.ez_air': 'EZ Air',
  uncorked: 'Uncorked',
  'project.uncorked': 'Uncorked',
  'policy.guardrail': 'Answer policy',
  'profile.identity': 'Profile',
  'profile.career': 'Career',
  'career.oosu_salon': 'Romeo Salon',
};

const SOURCE_WORD_LABELS: Record<string, string> = {
  ai: 'AI',
  api: 'API',
  db: 'DB',
  faq: 'FAQ',
  github: 'GitHub',
  groq: 'Groq',
  rag: 'RAG',
  ui: 'UI',
  url: 'URL',
  ux: 'UX',
  wiki: 'Wiki',
  nextjs: 'Next.js',
  postgresql: 'PostgreSQL',
  askoosu: 'Ask Romeo',
  oosu: 'Romeo',
};

const SOURCE_CHUNK_LABELS: Record<string, Record<'ru' | 'en', string>> = {
  'profile.basic_info': { ru: 'Базовая информация профиля', en: 'Profile basics' },
  'profile.summary': { ru: 'Краткое описание профиля', en: 'Profile summary' },
  'profile.career': { ru: 'Карьерный контекст', en: 'Career context' },
  'profile.current_focus': { ru: 'Текущий фокус', en: 'Current focus' },
  'profile.business_to_dev': {
    ru: 'Путь от бизнеса к разработке',
    en: 'Business-to-development path',
  },
  'profile.contact': { ru: 'Публичные контакты', en: 'Public contact channels' },
  'profile.qa_summary': {
    ru: 'Профиль Senior QA',
    en: 'Senior QA profile',
  },
  'profile.qa_specialization': {
    ru: 'Специализация и стек',
    en: 'Specialization and stack',
  },
  'profile.collaboration': {
    ru: 'Форматы сотрудничества',
    en: 'Collaboration formats',
  },
  'profile.contact_channels': {
    ru: 'Каналы связи',
    en: 'Contact channels',
  },
  'profile.faq.contact': {
    ru: 'FAQ по контактам и сотрудничеству',
    en: 'Contact and collaboration FAQ',
  },
  'profile.links.resume_policy': {
    ru: 'Политика публикации резюме',
    en: 'Resume sharing policy',
  },
  'project.askoosu.overview': {
    ru: 'Обзор проекта Ask Romeo',
    en: 'Ask Romeo project overview',
  },
  'project.askoosu.story': {
    ru: 'История создания Ask Romeo',
    en: 'Ask Romeo build story',
  },
  'project.sminex_comfort.overview': {
    ru: 'Обзор проекта Sminex Comfort',
    en: 'Sminex Comfort project overview',
  },
  'project.elme_messer.overview': {
    ru: 'Обзор проекта Elme Messer',
    en: 'Elme Messer project overview',
  },
  'project.dpd.overview': {
    ru: 'Обзор проекта DPD',
    en: 'DPD project overview',
  },
  'project.instagram_clone.overview': {
    ru: 'Обзор проекта Aigram/SNS',
    en: 'Aigram/SNS project overview',
  },
  'project.sticks_and_stones.overview': {
    ru: 'Ребилд Sticks & Stones',
    en: 'Sticks & Stones rebuild',
  },
  'project.portfolioh': {
    ru: 'Эксперименты Portfoli-Oh!',
    en: 'Portfoli-Oh! interaction work',
  },
  'project.portfolio_oh.story': {
    ru: 'История Portfoli-Oh!',
    en: 'Portfoli-Oh! story',
  },
  'project.onjung': { ru: 'Мобильное приложение Onjung', en: 'Onjung mobile app' },
  'project.nomad_market': {
    ru: 'Мобильное приложение Nomad Market',
    en: 'Nomad Market mobile app',
  },
  'project.webtoon_translate': {
    ru: 'Пайплайн Webtoon AI Translate',
    en: 'Webtoon AI Translate pipeline',
  },
  'project.links.public': {
    ru: 'Публичные ссылки на проекты',
    en: 'Public project links',
  },
  'skills.current_stack': {
    ru: 'Текущий ключевой стек',
    en: 'Current core stack',
  },
  'skills.qa_processes': {
    ru: 'QA-процессы и стратегия',
    en: 'QA processes and strategy',
  },
  'skills.requirements_shift_left': {
    ru: 'Требования и Shift-Left',
    en: 'Requirements and Shift-Left',
  },
  'skills.api_integrations': {
    ru: 'API и интеграции',
    en: 'API and integrations',
  },
  'skills.web_mobile_qa': {
    ru: 'Web и Mobile QA',
    en: 'Web and Mobile QA',
  },
  'skills.regression_documentation': {
    ru: 'Регресс и тестовая документация',
    en: 'Regression and test documentation',
  },
  'skills.ai_qa_automation': {
    ru: 'AI и автоматизация QA',
    en: 'AI and QA automation',
  },
  'career.oosu_salon': {
    ru: 'Опыт операционного управления',
    en: 'OOSU SALON operating experience',
  },
  'profile.public_interests': {
    ru: 'Публичные рабочие интересы',
    en: 'Public work-adjacent interests',
  },
  'profile.strengths': {
    ru: 'Сильные стороны и подход к работе',
    en: 'Working strengths',
  },
  'policy.live_url': {
    ru: 'Политика публичных ссылок',
    en: 'Public URL policy',
  },
};

const SOURCE_CHUNK_CONTEXTS: Record<string, Record<'ru' | 'en', string>> = {
  'faq.project.top_three.default': {
    ru: 'Ответ по ключевым проектам',
    en: 'Representative projects answer',
  },
  'faq.skills.tech_stack.default': {
    ru: 'Ответ по стеку технологий',
    en: 'Tech stack answer',
  },
};

export function RagEvidencePanel({
  metadata,
  feedbackContext,
}: {
  metadata?: unknown;
  feedbackContext?: FeedbackContext;
}) {
  const ragMetadata = useMemo(
    () => normalizeRepresentativeProjectSources(parseRagMetadata(metadata)),
    [metadata]
  );
  const feedbackReasonId = useId();
  const [feedbackRating, setFeedbackRating] = useState<FeedbackRating | null>(
    null
  );
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle');
  const [feedbackReason, setFeedbackReason] = useState('');
  const [selectedFeedbackReasons, setSelectedFeedbackReasons] = useState<
    FeedbackReasonKey[]
  >([]);
  const [sourcesExpanded, setSourcesExpanded] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const isDebugMode = useMemo(isAskOosuDebugUiEnabled, []);
  const sourceColumnCount = useSourceColumnCount();
  const { language: uiLanguage } = useDisplayPreferences();

  if (!ragMetadata) return null;
  const displayLanguage = uiLanguage;
  const shouldShowFeedbackOnly = shouldShowFeedbackForAnswerSource(
    ragMetadata.answerSource
  );
  if (
    ragMetadata.showEvidence === false &&
    !isDebugMode &&
    !shouldShowFeedbackOnly
  ) {
    return null;
  }
  if (
    !isDebugMode &&
    ragMetadata.sources.length === 0 &&
    !shouldShowFeedbackOnly
  ) {
    return null;
  }

  const sourceItems = buildDisplaySourceItems({
    sources: ragMetadata.sources,
    language: displayLanguage,
    debug: isDebugMode,
  });
  const sourceCount = sourceItems.length;
  const collapsedSourceCount = isDebugMode
    ? MAX_VISIBLE_SOURCES
    : sourceColumnCount;
  const hiddenSourceCount = Math.max(0, sourceCount - collapsedSourceCount);
  const displayedSources = sourcesExpanded
    ? sourceItems
    : sourceItems.slice(0, collapsedSourceCount);
  const hasReviewEvidence = ragMetadata.sources.some(
    (source) => source.visibility && source.visibility !== 'public'
  );
  const hasTodoEvidence =
    ragMetadata.hasTodoEvidence ||
    ragMetadata.sources.some((source) => source.has_todo);
  const hasWarnings = ragMetadata.warnings.length > 0;
  const projectCards = getProjectCards(ragMetadata);
  const confidenceTone = getConfidenceTone(
    ragMetadata.confidence,
    displayLanguage
  );
  const answerSourceLabel = isDebugMode
    ? getAnswerSourceLabel(ragMetadata, displayLanguage)
    : null;
  const shouldShowSources = sourceCount > 0;
  const feedbackStatusText = getFeedbackStatusText(
    feedbackState,
    feedbackRating,
    displayLanguage
  );

  return (
    <section
      className="mt-5 space-y-3 border-t pt-4"
      aria-label={
        displayLanguage === 'ru'
          ? 'Источники ответа портфолио'
          : 'Portfolio answer evidence'
      }
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Badge variant="outline" className="max-w-full rounded-lg px-2.5 py-1">
          <BookOpenCheck className="h-3.5 w-3.5" />
          <span className="min-w-0 truncate">
            {getPublicSourceBadgeText(
              sourceCount,
              displayLanguage,
              ragMetadata.answerSource
            )}
          </span>
        </Badge>

        {isDebugMode && (
          <Badge
            variant="outline"
            className="rounded-lg border-violet-300 bg-violet-50 px-2.5 py-1 text-violet-800 dark:border-violet-700/70 dark:bg-violet-950/30 dark:text-violet-200"
          >
            <BrainCircuit className="h-3.5 w-3.5" />
            Debug
          </Badge>
        )}

        {isDebugMode && answerSourceLabel && (
          <Badge variant="outline" className="rounded-lg px-2.5 py-1">
            <BrainCircuit className="h-3.5 w-3.5" />
            {answerSourceLabel}
          </Badge>
        )}

        <Badge
          variant="outline"
          className={cn('rounded-lg px-2.5 py-1', confidenceTone.className)}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {confidenceTone.label}
          {isDebugMode ? ` ${formatConfidence(ragMetadata.confidence)}` : ''}
        </Badge>

        {isDebugMode && hasTodoEvidence && (
          <Badge
            variant="outline"
            className="rounded-lg border-amber-300 bg-amber-50 px-2.5 py-1 text-amber-800 dark:border-amber-700/70 dark:bg-amber-950/30 dark:text-amber-200"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            {displayLanguage === 'ru'
              ? 'Часть информации уточняется'
              : 'Needs confirmation'}
          </Badge>
        )}

        {isDebugMode && hasReviewEvidence && (
          <Badge
            variant="outline"
            className="rounded-lg border-rose-300 bg-rose-50 px-2.5 py-1 text-rose-800 dark:border-rose-700/70 dark:bg-rose-950/30 dark:text-rose-200"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            {displayLanguage === 'ru' ? 'Нужна проверка' : 'needs review'}
          </Badge>
        )}

        {isDebugMode && hasWarnings && (
          <Badge
            variant="outline"
            className="rounded-lg border-sky-300 bg-sky-50 px-2.5 py-1 text-sky-800 dark:border-sky-700/70 dark:bg-sky-950/30 dark:text-sky-200"
          >
            {formatWarningCount(ragMetadata.warnings.length, displayLanguage)}
          </Badge>
        )}
      </div>

      {isDebugMode && projectCards.length > 0 && (
        <div
          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
          aria-label="Matched project cards"
        >
          {projectCards.map((project) => (
            <article
              key={project.id}
              className="bg-muted/35 rounded-lg border p-3"
            >
              <div className="flex items-start gap-2">
                <div className="bg-background text-primary mt-0.5 rounded-md p-1.5">
                  <FolderKanban className="h-4 w-4" />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="truncate text-sm font-semibold">
                    {project.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {project.category[displayLanguage]}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {project.description[displayLanguage]}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-background text-muted-foreground rounded-md border px-2 py-0.5 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      {isDebugMode && ragMetadata.matchedEntityIds.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Matched entity IDs">
          {ragMetadata.matchedEntityIds.map((entityId) => (
            <span
              key={entityId}
              className="bg-background text-muted-foreground rounded-md border px-2 py-0.5 text-xs"
            >
              {formatEntityLabel(entityId, displayLanguage)}
            </span>
          ))}
        </div>
      )}

      {isDebugMode && (
        <div className="flex flex-wrap gap-1.5" aria-label="Debug metadata">
          {[
            ragMetadata.faqId ? `faqId: ${ragMetadata.faqId}` : null,
            ragMetadata.matchedFaqId
              ? `matchedFaqId: ${ragMetadata.matchedFaqId}`
              : null,
            ragMetadata.renderSpecKey
              ? `renderSpec: ${ragMetadata.renderSpecKey}`
              : null,
            ragMetadata.routeDecision?.mode
              ? `route: ${ragMetadata.routeDecision.mode}`
              : null,
            ragMetadata.routeDecision?.reason
              ? `reason: ${ragMetadata.routeDecision.reason}`
              : null,
            `skippedGroq: ${ragMetadata.skippedGroq === true}`,
            ragMetadata.provider ? `provider: ${ragMetadata.provider}` : null,
            ragMetadata.errorCode ? `error: ${ragMetadata.errorCode}` : null,
            ...(ragMetadata.confidenceSignals
              ? formatConfidenceSignals(ragMetadata.confidenceSignals)
              : []),
          ]
            .filter((item): item is string => Boolean(item))
            .map((item) => (
              <span
                key={item}
                className="bg-background text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[11px]"
              >
                {item}
              </span>
            ))}
        </div>
      )}

      {shouldShowSources && displayedSources.length > 0 && (
        <div className="space-y-2" aria-label="Portfolio sources">
          <div className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedSources.map((sourceItem) => (
              <SourceEvidenceCard
                key={sourceItem.key}
                sourceItem={sourceItem}
                language={displayLanguage}
                debug={isDebugMode}
              />
            ))}
          </div>

          {hiddenSourceCount > 0 && (
            <button
              type="button"
              className="bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 inline-flex max-w-full items-center gap-1 rounded-lg border px-2.5 py-1 text-xs outline-none focus-visible:ring-[3px]"
              aria-expanded={sourcesExpanded}
              onClick={() => setSourcesExpanded((current) => !current)}
            >
              <span className="min-w-0 truncate">
                {getRemainingSourcesButtonLabel({
                  count: hiddenSourceCount,
                  expanded: sourcesExpanded,
                  language: displayLanguage,
                  debug: isDebugMode,
                })}
              </span>
              {sourcesExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      )}

      {!isDebugMode && hasTodoEvidence && (
        <p className="text-muted-foreground text-xs">
          {displayLanguage === 'ru'
            ? 'Часть информации ещё обновляется.'
            : 'Some details are still being updated.'}
        </p>
      )}

      <div className="border-t pt-3">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <span
            className="text-muted-foreground min-w-0 text-xs"
            aria-live="polite"
          >
            {feedbackStatusText}
          </span>
          {feedbackState !== 'saved' && <Button
            type="button"
            size="sm"
            variant="ghost"
            aria-expanded={isFeedbackOpen}
            className="text-muted-foreground hover:text-foreground h-8 rounded-lg px-2 text-xs"
            onClick={() => setIsFeedbackOpen((current) => !current)}
          >
            {displayLanguage === 'ru'
              ? 'Предложить улучшение'
              : 'Suggest an improvement'}
            {isFeedbackOpen ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </Button>}
        </div>

        {isFeedbackOpen && feedbackState !== 'saved' && (
          <div className="bg-muted/20 mt-2 space-y-3 rounded-lg border p-3">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant={feedbackRating === 'up' ? 'secondary' : 'outline'}
                aria-pressed={feedbackRating === 'up'}
                aria-label={
                  displayLanguage === 'ru'
                    ? 'Отметить ответ как полезный'
                    : 'Mark this answer as helpful'
                }
                className="h-8 rounded-lg"
                disabled={feedbackState === 'saving'}
                onClick={() => {
                  setFeedbackReason('');
                  setSelectedFeedbackReasons([]);
                  void submitFeedback({
                    rating: 'up',
                    reason: null,
                    metadata: ragMetadata,
                    context: feedbackContext,
                    setFeedbackRating,
                    setFeedbackState,
                  });
                }}
              >
                <ThumbsUp className="h-4 w-4" />
                {displayLanguage === 'ru' ? 'Полезно' : 'Helpful'}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={feedbackRating === 'down' ? 'secondary' : 'outline'}
                aria-pressed={feedbackRating === 'down'}
                aria-label={
                  displayLanguage === 'ru'
                    ? 'Отметить ответ как недостаточно полезный'
                    : 'Mark this answer as not quite right'
                }
                className="h-8 rounded-lg"
                disabled={feedbackState === 'saving'}
                onClick={() => {
                  setFeedbackReason('');
                  setSelectedFeedbackReasons([]);
                  void submitFeedback({
                    rating: 'down',
                    reason: null,
                    metadata: ragMetadata,
                    context: feedbackContext,
                    setFeedbackRating,
                    setFeedbackState,
                  });
                }}
              >
                <ThumbsDown className="h-4 w-4" />
                {displayLanguage === 'ru' ? 'Не очень' : 'Not quite'}
              </Button>
            </div>

            {feedbackState === 'editing-down' && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {FEEDBACK_REASON_OPTIONS.map((option) => {
                    const selected = selectedFeedbackReasons.includes(
                      option.key
                    );

                    return (
                      <button
                        key={option.key}
                        type="button"
                        aria-pressed={selected}
                        className={cn(
                          'focus-visible:ring-ring/50 rounded-lg border px-2.5 py-1 text-xs transition outline-none focus-visible:ring-[3px]',
                          selected
                            ? 'bg-foreground text-background border-foreground'
                            : 'bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                        onClick={() => {
                          setSelectedFeedbackReasons((currentReasons) =>
                            currentReasons.includes(option.key)
                              ? currentReasons.filter(
                                  (key) => key !== option.key
                                )
                              : [...currentReasons, option.key]
                          );
                        }}
                      >
                        {option.label[displayLanguage]}
                      </button>
                    );
                  })}
                </div>
                <label
                  className="text-muted-foreground text-xs"
                  htmlFor={feedbackReasonId}
                >
                  {displayLanguage === 'ru' ? 'Доп. комментарий' : 'Optional note'}
                </label>
                <textarea
                  id={feedbackReasonId}
                  value={feedbackReason}
                  maxLength={MAX_CLIENT_REASON_LENGTH}
                  onChange={(event) => setFeedbackReason(event.target.value)}
                  placeholder={
                    displayLanguage === 'ru'
                      ? 'Чего не хватило или что было неточно?'
                      : 'What felt missing or inaccurate?'
                  }
                  className="border-input bg-background focus-visible:ring-ring/50 min-h-20 w-full resize-y rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-[3px]"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8 rounded-lg"
                    onClick={() => {
                      setFeedbackRating(null);
                      setFeedbackState('idle');
                      setFeedbackReason('');
                      setSelectedFeedbackReasons([]);
                      setIsFeedbackOpen(false);
                    }}
                  >
                    {displayLanguage === 'ru' ? 'Отмена' : 'Cancel'}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="h-8 rounded-lg"
                    onClick={() => {
                      void submitFeedback({
                        rating: 'down',
                        reason: buildDownFeedbackReason({
                          reasonKeys: selectedFeedbackReasons,
                          note: feedbackReason,
                          language: displayLanguage,
                        }),
                        metadata: ragMetadata,
                        context: feedbackContext,
                        setFeedbackRating,
                        setFeedbackState,
                      });
                    }}
                  >
                    <Send className="h-4 w-4" />
                    {displayLanguage === 'ru' ? 'Сохранить отзыв' : 'Save feedback'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function normalizeRepresentativeProjectSources(
  metadata: RagMetadata | null
): RagMetadata | null {
  if (!metadata) return null;

  const faqId = metadata.matchedFaqId ?? metadata.faqId;
  if (faqId === 'faq.ai_usage.workflow.default') {
    const template = metadata.sources[0];
    const qaAiSources = [
      'skills.qa_processes',
      'skills.requirements_shift_left',
      'skills.api_integrations',
      'skills.ai_qa_automation',
    ];

    return {
      ...metadata,
      sources: qaAiSources.map((chunkId) => ({
        chunk_id: chunkId,
        entity_id: 'skills.core',
        title: template?.title ?? 'Romeo Wiki',
        section_path: template?.section_path ?? ['Romeo Wiki'],
        score: template?.score ?? metadata.confidence * 100,
        visibility: 'public',
        freshness: template?.freshness ?? 'current',
        has_todo: false,
      })),
    };
  }

  if (faqId === 'faq.contact.collaboration.default') {
    const template = metadata.sources[0];
    const contactSources = [
      'profile.qa_summary',
      'profile.qa_specialization',
      'profile.collaboration',
      'profile.contact_channels',
    ];

    return {
      ...metadata,
      sources: contactSources.map((chunkId) => ({
        chunk_id: chunkId,
        entity_id: 'profile.contact',
        title: template?.title ?? 'Romeo Wiki',
        section_path: template?.section_path ?? ['Romeo Wiki'],
        score: template?.score ?? metadata.confidence * 100,
        visibility: 'public',
        freshness: template?.freshness ?? 'current',
        has_todo: false,
      })),
    };
  }

  if (
    faqId === 'faq.skills.tech_stack.default' ||
    faqId === 'faq.tech_stack.level.default'
  ) {
    const template = metadata.sources[0];
    const skills = [
      'skills.qa_processes',
      'skills.requirements_shift_left',
      'skills.api_integrations',
      'skills.web_mobile_qa',
      'skills.regression_documentation',
      'skills.ai_qa_automation',
    ];

    return {
      ...metadata,
      sources: skills.map((chunkId) => ({
        chunk_id: chunkId,
        entity_id: 'skills.core',
        title: template?.title ?? 'Romeo Wiki',
        section_path: template?.section_path ?? ['Romeo Wiki'],
        score: template?.score ?? metadata.confidence * 100,
        visibility: 'public',
        freshness: template?.freshness ?? 'current',
        has_todo: false,
      })),
    };
  }

  if (
    faqId !== 'faq.project.top_three.default' &&
    faqId !== 'faq.projects.top3.summary'
  ) {
    return metadata;
  }

  const template = metadata.sources[0];
  const projects = [
    ['project.askoosu.overview', 'ask_romeo'],
    ['project.sminex_comfort.overview', 'sminex_comfort'],
    ['project.elme_messer.overview', 'elme_messer'],
    ['project.dpd.overview', 'dpd'],
  ] as const;

  return {
    ...metadata,
    sources: projects.map(([chunkId, entityId]) => ({
      chunk_id: chunkId,
      entity_id: entityId,
      title: template?.title ?? 'Romeo Wiki',
      section_path: template?.section_path ?? ['Romeo Wiki'],
      score: template?.score ?? metadata.confidence * 100,
      visibility: 'public',
      freshness: template?.freshness ?? 'current',
      has_todo: false,
    })),
  };
}

function SourceEvidenceCard({
  sourceItem,
  language,
  debug,
}: {
  sourceItem: DisplaySourceItem;
  language: 'ru' | 'en';
  debug: boolean;
}) {
  const { source, title: sourceTitle, sectionPath, count } = sourceItem;

  return (
    <article
      title={debug ? formatSourceTitle(source) : undefined}
      className="bg-background/70 min-w-0 break-inside-avoid rounded-lg border px-3 py-2"
    >
      <div className="flex min-w-0 items-start gap-2">
        <BookOpenCheck className="text-foreground mt-0.5 h-3.5 w-3.5 shrink-0" />
        <div className="min-w-0 flex-1 space-y-0.5">
          <p className="truncate text-xs font-medium">{sourceTitle}</p>
          {sectionPath && (
            <p className="text-muted-foreground truncate text-[11px]">
              {sectionPath}
            </p>
          )}
        </div>
        {count > 1 && !debug && (
          <span className="bg-muted text-muted-foreground shrink-0 rounded-md border px-1.5 py-0.5 text-[10px]">
            {language === 'ru' ? `×${count}` : `x${count}`}
          </span>
        )}
      </div>

      {debug && (
        <div className="mt-2 flex min-w-0 flex-wrap gap-1.5">
          {source.entity_id && (
            <span className="bg-muted text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[11px]">
              entity_id: {source.entity_id}
            </span>
          )}
          <span className="bg-muted text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[11px]">
            score: {formatScore(source.score)}
          </span>
          <span className="bg-muted text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[11px]">
            visibility: {source.visibility}
          </span>
        </div>
      )}
    </article>
  );
}

function buildDisplaySourceItems({
  sources,
  language,
  debug,
}: {
  sources: RagSource[];
  language: 'ru' | 'en';
  debug: boolean;
}): DisplaySourceItem[] {
  if (debug) {
    return sources.map((source, index) => ({
      key: source.chunk_id,
      source,
      title: `S${index + 1}. ${source.chunk_id}`,
      sectionPath: formatSectionPathLabel(source, language),
      count: 1,
    }));
  }

  const sourceGroups = new Map<string, DisplaySourceItem>();

  for (const source of sources) {
    const title = formatPublicSourceTitle(source, language);
    const rawSectionPath = formatSectionPathLabel(source, language);
    const sectionPath = rawSectionPath === title ? '' : rawSectionPath;
    const key = `${title}::${sectionPath}`;
    const existingSource = sourceGroups.get(key);

    if (existingSource) {
      existingSource.count += 1;
      continue;
    }

    sourceGroups.set(key, {
      key,
      source,
      title,
      sectionPath,
      count: 1,
    });
  }

  return Array.from(sourceGroups.values());
}

function shouldShowFeedbackForAnswerSource(answerSource?: string) {
  return ![
    undefined,
    'smalltalk',
    'off_topic_redirect',
    'clarify',
    'private_guardrail',
    'prompt_guardrail',
  ].includes(answerSource);
}

async function submitFeedback({
  rating,
  reason,
  metadata,
  context,
  setFeedbackRating,
  setFeedbackState,
}: {
  rating: FeedbackRating;
  reason: string | null;
  metadata: RagMetadata;
  context: FeedbackContext | undefined;
  setFeedbackRating: (rating: FeedbackRating) => void;
  setFeedbackState: (state: FeedbackState) => void;
}) {
  if (!context?.messageId) {
    setFeedbackState('saved');
    return;
  }

  setFeedbackRating(rating);
  setFeedbackState('saving');

  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: context.sessionId ?? '',
        messageId: truncateForFeedback(context.messageId, 128),
        question: truncateForFeedback(
          context.question ?? '',
          MAX_CLIENT_QUESTION_LENGTH
        ),
        answer: truncateForFeedback(
          context.answer ?? '',
          MAX_CLIENT_TEXT_LENGTH
        ),
        rating,
        reason: reason?.trim() || null,
        matchedEntityIds: metadata.matchedEntityIds,
        sourceChunkIds: metadata.sources.map((source) => source.chunk_id),
        confidence: metadata.confidence,
      }),
    });
    const result = (await response.json().catch(() => null)) as {
      ok?: boolean;
    } | null;

    if (!response.ok || !result?.ok) {
      throw new Error('Feedback request failed.');
    }

    setFeedbackState('saved');
  } catch (error) {
    console.warn('Unable to save answer feedback:', error);
    setFeedbackState('saved');
  }
}

function getFeedbackStatusText(
  state: FeedbackState,
  rating: FeedbackRating | null,
  language: 'ru' | 'en'
) {
  if (state === 'saved') {
    return language === 'ru'
      ? 'Спасибо за отзыв.'
      : 'Thanks for the feedback.';
  }

  if (language === 'ru') {
    if (state === 'saving') return 'Сохраняем отзыв...';
    if (state === 'error') return 'Не удалось сохранить отзыв.';
    if (state === 'editing-down') return 'Что стоит улучшить?';
    if (rating === 'up') return 'Спасибо за отзыв.';
    if (rating === 'down') return 'Спасибо. Этот ответ можно улучшить.';

    return 'Ответ был полезен?';
  }

  if (state === 'saving') return 'Saving feedback...';
  if (state === 'error') return 'Feedback could not be saved.';
  if (state === 'editing-down') return 'What should be improved?';
  if (rating === 'up') return 'Thanks for the feedback.';
  if (rating === 'down') return 'Thanks. This answer can be improved.';

  return 'Was this answer useful enough?';
}

function buildDownFeedbackReason({
  reasonKeys,
  note,
  language,
}: {
  reasonKeys: FeedbackReasonKey[];
  note: string;
  language: 'ru' | 'en';
}) {
  const reasonLabels = reasonKeys
    .map((reasonKey) => {
      const option = FEEDBACK_REASON_OPTIONS.find(
        (item) => item.key === reasonKey
      );

      return option?.label[language];
    })
    .filter((label): label is string => Boolean(label));
  const trimmedNote = note.trim();

  return [...reasonLabels, trimmedNote].filter(Boolean).join(' | ');
}

function parseRagMetadata(value: unknown): RagMetadata | null {
  if (!isRecord(value)) return null;

  const hasRagShape =
    'sources' in value ||
    'confidence' in value ||
    'matchedEntityIds' in value ||
    'hasTodoEvidence' in value;

  if (!hasRagShape) return null;

  const sources = Array.isArray(value.sources)
    ? value.sources.map(parseSource).filter((source) => source !== null)
    : [];
  const confidence = normalizeConfidence(value.confidence);

  return {
    sources,
    confidence,
    confidenceSignals: parseConfidenceSignals(value.confidenceSignals),
    matchedEntityIds: parseStringArray(value.matchedEntityIds),
    hasTodoEvidence: value.hasTodoEvidence === true,
    warnings: parseStringArray(value.warnings),
    faqId: parseString(value.faqId) ?? undefined,
    matchedFaqId: parseString(value.matchedFaqId) ?? undefined,
    renderSpecKey: parseString(value.renderSpecKey) ?? undefined,
    answerSource: parseString(value.answerSource) ?? undefined,
    language:
      value.language === 'en'
        ? 'en'
        : value.language === 'ru'
          ? 'ru'
          : undefined,
    skippedGroq: value.skippedGroq === true,
    provider: parseString(value.provider) ?? undefined,
    model: parseString(value.model) ?? undefined,
    errorCode: parseString(value.errorCode) ?? undefined,
    showEvidence:
      typeof value.showEvidence === 'boolean' ? value.showEvidence : undefined,
    routeDecision: parseRouteDecision(value.routeDecision),
  };
}

function parseRouteDecision(value: unknown) {
  if (!isRecord(value)) return undefined;

  const mode = parseString(value.mode) ?? undefined;
  const reason = parseString(value.reason) ?? undefined;
  if (!mode && !reason) return undefined;

  return { mode, reason };
}

function parseSource(value: unknown): RagSource | null {
  if (!isRecord(value)) return null;

  const chunkId = parseString(value.chunk_id);
  const title = parseString(value.title);

  if (!chunkId || !title) return null;

  return {
    chunk_id: chunkId,
    entity_id: parseString(value.entity_id),
    title,
    section_path: parseStringArray(value.section_path),
    score: parseFiniteNumber(value.score) ?? 0,
    visibility: parseString(value.visibility) ?? 'public',
    freshness: parseString(value.freshness) ?? undefined,
    has_todo: value.has_todo === true,
  };
}

function parseConfidenceSignals(value: unknown): AnswerConfidence | undefined {
  if (!isRecord(value)) return undefined;

  return {
    retrieval: normalizeConfidence(value.retrieval),
    intent: normalizeConfidence(value.intent),
    freshness: normalizeConfidence(value.freshness),
    grounding: normalizeConfidence(value.grounding),
    final: normalizeConfidence(value.final),
  };
}

function getProjectCards(metadata: RagMetadata) {
  const entityIds = [
    ...metadata.matchedEntityIds,
    ...metadata.sources
      .map((source) => source.entity_id)
      .filter((entityId): entityId is string => Boolean(entityId)),
  ];
  const projectIds = Array.from(
    new Set(
      entityIds
        .map(normalizeProjectEntityId)
        .filter((id): id is keyof typeof PROJECT_CARDS => Boolean(id))
    )
  );

  return projectIds.map((id) => PROJECT_CARDS[id]);
}

function normalizeProjectEntityId(entityId: string) {
  const normalized = entityId
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_');

  return PROJECT_ENTITY_ALIASES[normalized];
}

function getConfidenceTone(confidence: number, language: 'ru' | 'en') {
  if (confidence >= 0.78) {
    return {
      label: language === 'ru' ? 'Хорошо обосновано' : 'Well grounded',
      className:
        'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700/70 dark:bg-emerald-950/30 dark:text-emerald-200',
    };
  }

  if (confidence >= 0.5) {
    return {
      label: language === 'ru' ? 'Частично обосновано' : 'Partially grounded',
      className:
        'border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-700/70 dark:bg-blue-950/30 dark:text-blue-200',
    };
  }

  return {
    label: language === 'ru' ? 'Мало доказательств' : 'Limited evidence',
    className:
      'border-zinc-300 bg-zinc-50 text-zinc-800 dark:border-zinc-700/70 dark:bg-zinc-900/40 dark:text-zinc-200',
  };
}

function getAnswerSourceLabel(metadata: RagMetadata, language: 'ru' | 'en') {
  const labels: Record<string, Record<'ru' | 'en', string>> = {
    faq_cache: { ru: 'Ответ портфолио', en: 'Portfolio answer' },
    philosophy_docs: {
      ru: 'Visionary Builder Docs',
      en: 'Visionary Builder Docs',
    },
    faq_rewrite: {
      ru: 'Ответ портфолио',
      en: 'Portfolio answer',
    },
    answer_cache: {
      ru: 'Кэшированный ответ портфолио',
      en: 'Cached portfolio answer',
    },
    deterministic_rule: { ru: 'Политика портфолио', en: 'Portfolio policy' },
    smalltalk: { ru: 'Лёгкий разговор', en: 'Small talk' },
    off_topic_redirect: {
      ru: 'Возврат к портфолио',
      en: 'Portfolio redirect',
    },
    clarify: { ru: 'Уточнение вопроса', en: 'Clarifying question' },
    private_guardrail: {
      ru: 'Публичная безопасность',
      en: 'Public safety notice',
    },
    prompt_guardrail: {
      ru: 'Защита внутренних данных',
      en: 'Internal safety notice',
    },
    rag_generation: {
      ru: 'На основе данных портфолио',
      en: 'Based on portfolio data',
    },
    rag_groq: { ru: 'На основе данных портфолио', en: 'Based on portfolio data' },
    rag_google: {
      ru: 'На основе данных портфолио',
      en: 'Based on portfolio data',
    },
    rag_openai: {
      ru: 'На основе данных портфолио',
      en: 'Based on portfolio data',
    },
    rag_xai: { ru: 'На основе данных портфолио', en: 'Based on portfolio data' },
    fallback: { ru: 'Базовый ответ портфолио', en: 'Basic portfolio answer' },
    insufficient_evidence: {
      ru: 'Недостаточно источников',
      en: 'Insufficient evidence',
    },
  };

  if (!metadata.answerSource) return null;
  return labels[metadata.answerSource]?.[language] ?? metadata.answerSource;
}

function getPublicSourceBadgeText(
  count: number,
  language: 'ru' | 'en',
  answerSource?: string
) {
  if (count === 0) {
    return language === 'ru' ? 'Мало доказательств' : 'Limited evidence';
  }

  if (answerSource === 'philosophy_docs') {
    if (language === 'ru') {
      return `Visionary Builder Docs · ${count} источников`;
    }
    return `Visionary Builder Docs · ${count} source${count === 1 ? '' : 's'}`;
  }

  if (language === 'ru') return `Из Wiki Romeo · ${count} источников`;
  return `From Romeo Wiki · ${count} source${count === 1 ? '' : 's'}`;
}

function getRemainingSourcesButtonLabel({
  count,
  expanded,
  language,
  debug,
}: {
  count: number;
  expanded: boolean;
  language: 'ru' | 'en';
  debug: boolean;
}) {
  if (debug) {
    if (language === 'ru') return expanded ? 'Свернуть' : `Ещё +${count}`;
    return expanded ? 'Collapse' : `+${count} more`;
  }

  if (expanded) {
    return language === 'ru' ? 'Скрыть источники' : 'Hide sources';
  }

  return language === 'ru' ? 'Показать источники' : 'View sources';
}

function formatWarningCount(count: number, language: 'ru' | 'en') {
  if (language === 'ru') return `Предупреждений: ${count}`;
  return `${count} warning${count === 1 ? '' : 's'}`;
}

function formatEntityLabel(entityId: string, language: 'ru' | 'en') {
  const projectId = normalizeProjectEntityId(entityId);
  if (projectId) return PROJECT_CARDS[projectId].title;

  const labels: Record<string, Record<'ru' | 'en', string>> = {
    'profile.identity': { ru: 'Профиль', en: 'Profile' },
    'profile.career': { ru: 'Карьера', en: 'Career' },
    'career.oosu_salon': { ru: 'Операционный опыт', en: 'Romeo Salon' },
    'policy.guardrail': { ru: 'Политика ответов', en: 'Answer policy' },
  };

  return labels[entityId]?.[language] ?? entityId;
}

function formatPublicSourceTitle(source: RagSource, language: 'ru' | 'en') {
  const chunkLabel = formatPublicChunkLabel(source.chunk_id, language);
  if (chunkLabel) return chunkLabel;

  const entityLabel = source.entity_id
    ? formatEntityLabel(source.entity_id, language)
    : null;
  if (entityLabel && entityLabel !== source.entity_id) return entityLabel;

  if (source.section_path.length > 0) {
    return humanizeSourcePathSegment(source.section_path[0]);
  }

  if (
    source.title &&
    source.title !== 'Oosu Wiki' &&
    source.title !== 'Romeo Wiki'
  ) {
    return humanizeSourcePathSegment(source.title);
  }

  return language === 'ru' ? 'Wiki Romeo' : 'Romeo Wiki';
}

function formatSectionPathLabel(source: RagSource, language: 'ru' | 'en') {
  const chunkContext = formatPublicChunkContext(source.chunk_id, language);
  if (chunkContext) return chunkContext;

  const path =
    source.section_path.length > 0
      ? source.section_path
      : source.title
        ? [source.title]
        : [];
  const label = path.map(humanizeSourcePathSegment).filter(Boolean).join(' > ');

  if (label) return label;
  return language === 'ru' ? 'Wiki Romeo' : 'Romeo Wiki';
}

function formatPublicChunkLabel(chunkId: string, language: 'ru' | 'en') {
  const exactLabel = SOURCE_CHUNK_LABELS[chunkId]?.[language];
  if (exactLabel) return exactLabel;

  if (chunkId.startsWith('faq.')) {
    return language === 'ru' ? 'Источник FAQ' : 'FAQ answer source';
  }

  if (chunkId.startsWith('project.')) {
    return humanizeSourcePathSegment(chunkId.replace(/^project\./, ''));
  }

  if (chunkId.startsWith('profile.')) {
    return language === 'ru' ? 'Запись Wiki профиля' : 'Profile Wiki entry';
  }

  if (chunkId.startsWith('skills.')) {
    return language === 'ru' ? 'Запись Wiki навыков' : 'Skills Wiki entry';
  }

  if (chunkId.startsWith('career.')) {
    return language === 'ru' ? 'Запись Wiki карьеры' : 'Career Wiki entry';
  }

  return null;
}

function formatPublicChunkContext(chunkId: string, language: 'ru' | 'en') {
  const exactContext = SOURCE_CHUNK_CONTEXTS[chunkId]?.[language];
  if (exactContext) return exactContext;

  if (chunkId.startsWith('project.')) {
    return language === 'ru' ? 'Wiki проектов' : 'Project Wiki';
  }

  if (chunkId.startsWith('profile.')) {
    return language === 'ru' ? 'Wiki профиля' : 'Profile Wiki';
  }

  if (chunkId.startsWith('skills.')) {
    return language === 'ru' ? 'Wiki навыков' : 'Skills Wiki';
  }

  if (chunkId.startsWith('career.')) {
    return language === 'ru' ? 'Wiki карьеры' : 'Career Wiki';
  }

  return null;
}

function humanizeSourcePathSegment(segment: string) {
  const trimmedSegment = segment.trim();
  if (!trimmedSegment) return '';

  const projectId = normalizeProjectEntityId(trimmedSegment);
  if (projectId) return PROJECT_CARDS[projectId].title;

  const knownLabel = SOURCE_SEGMENT_LABELS[trimmedSegment.toLowerCase()];
  if (knownLabel) return knownLabel;

  return trimmedSegment
    .replace(/[-_./]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      const lowerWord = word.toLowerCase();
      const knownWord = SOURCE_WORD_LABELS[lowerWord];
      if (knownWord) return knownWord;

      return `${lowerWord.charAt(0).toUpperCase()}${lowerWord.slice(1)}`;
    })
    .join(' ');
}

function formatConfidence(confidence: number) {
  return `${Math.round(confidence * 100)}%`;
}

function formatConfidenceSignals(signals: AnswerConfidence) {
  return [
    `confidence.retrieval: ${formatDebugConfidence(signals.retrieval)}`,
    `confidence.intent: ${formatDebugConfidence(signals.intent)}`,
    `confidence.freshness: ${formatDebugConfidence(signals.freshness)}`,
    `confidence.grounding: ${formatDebugConfidence(signals.grounding)}`,
    `confidence.final: ${formatDebugConfidence(signals.final)}`,
  ];
}

function formatDebugConfidence(confidence: number) {
  return confidence.toFixed(2);
}

function formatScore(score: number) {
  if (!Number.isFinite(score)) return '';
  return score >= 10 ? score.toFixed(0) : score.toFixed(1);
}

function formatSourceTitle(source: RagSource) {
  const path = source.section_path.length
    ? source.section_path.join(' > ')
    : source.title;

  return `${path} | ${source.visibility}${
    source.has_todo ? ' | TODO evidence' : ''
  }`;
}

function truncateForFeedback(value: string, max: number) {
  return value.trim().replace(/\s+/g, ' ').slice(0, max);
}

function normalizeConfidence(value: unknown) {
  const parsedValue = parseFiniteNumber(value);
  if (parsedValue === null) return 0.25;

  const normalizedValue = parsedValue > 1 ? parsedValue / 100 : parsedValue;
  return Math.max(0, Math.min(1, normalizedValue));
}

function parseString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function parseStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0
  );
}

function parseFiniteNumber(value: unknown) {
  const parsedValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
