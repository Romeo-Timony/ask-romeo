'use client';

import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Fragment,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { normalizeMarkdownSpacing } from '@/lib/chat/markdown-spacing';
import { QuoteBlock } from '@/components/ui/quote-block';
import { oosuProfile } from '@/lib/oosu-profile';
import { useDisplayPreferences } from '@/lib/use-display-preferences';
import { cn } from '@/lib/utils';
import { isAskOosuDebugUiEnabled } from '@/lib/debug-ui';
import type { QuestionSurface } from '@/data/question-surfaces.shared';
import {
  resumeProjectSkillGroupsEn,
  resumeProjectSkillGroupsRu,
} from '@/data/resume-project-skills';
import {
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  ExternalLink,
  Github,
  Goal,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MessageSquareText,
  Rocket,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

type RichAnswerPart =
  | {
      type: 'markdown';
      contentKey?: string;
      content?: string;
    }
  | {
      type: 'component';
      component?: string;
      dataKey?: string;
      blockType?: string;
    }
  | {
      type: 'sourceBadges';
      sourceChunkIds?: string[];
    };

type VisualBlock = {
  type: string;
  title?: string;
  dataKey?: string;
  items: unknown[];
};

type MediaRef = {
  assetKey: string;
  kind: string;
  src: string;
  darkSrc?: string;
  mobileSrc?: string;
  mobileDarkSrc?: string;
  alt: string;
  caption?: string;
  status: 'ready' | 'todo' | 'optional';
};

type RichPayload = {
  language: 'ru' | 'en';
  badge?: string;
  todoBadge?: string;
  renderSpecKey?: string;
  richAnswerData?: unknown;
  answerParts: RichAnswerPart[];
  visualBlocks: VisualBlock[];
  mediaRefs: MediaRef[];
  sourceChunkIds: string[];
  hasCanonicalEvidence: boolean;
};

type ProjectItem = {
  id: string;
  title: string;
  label?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  tags: string[];
  href?: string;
};

type ProjectActionHighlight = 'questions' | 'open';

type SkillGroup = {
  group: string;
  skills: SkillItem[];
  evidence: string[];
};

type SkillItem = {
  name: string;
  proficiency?: string;
};

type ContactAction = {
  label: string;
  href: string;
  kind?: string;
};

type DiagramStep = {
  title: string;
  description?: string;
};

type ComparisonTable = {
  leftTitle: string;
  rightTitle: string;
  rows: ComparisonRow[];
};

type ComparisonRow = {
  label: string;
  left: string;
  right: string;
};

export function RichAnswerRenderer({
  metadata,
  markdownContent,
}: {
  metadata?: unknown;
  markdownContent: string;
}) {
  const { language: uiLanguage } = useDisplayPreferences();
  const parsedPayload = parseRichPayload(metadata);
  if (!parsedPayload) return null;

  // Prefer UI language so profile/cards match the selected locale
  // even if the stored answer metadata was generated in another language.
  const payload: RichPayload = {
    ...parsedPayload,
    language: uiLanguage,
    badge: localizeBadge(parsedPayload.badge, uiLanguage),
    todoBadge: localizeTodoBadge(parsedPayload.todoBadge, uiLanguage),
  };

  const parts = normalizeAnswerPartsForDisplay(
    payload.answerParts.length > 0
      ? payload.answerParts
      : buildFallbackParts(payload)
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-2">
        {payload.badge && (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-700/70 dark:bg-emerald-950/30 dark:text-emerald-200">
            <BookOpenCheck className="h-3.5 w-3.5" />
            {payload.badge}
          </span>
        )}
        {payload.todoBadge && (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 dark:border-amber-700/70 dark:bg-amber-950/30 dark:text-amber-200">
            {payload.todoBadge}
          </span>
        )}
      </div>

      {parts.map((part, index) =>
        renderPart({
          part,
          index,
          payload,
          markdownContent,
        })
      )}
    </div>
  );
}

export function hasRichAnswerPayload(metadata: unknown) {
  if (!isRecord(metadata)) return false;
  const richAnswerData = isRecord(metadata.richAnswerData)
    ? metadata.richAnswerData
    : null;

  return (
    Array.isArray(metadata.answerParts) ||
    Array.isArray(metadata.visualBlocks) ||
    Array.isArray(richAnswerData?.visualBlocks)
  );
}

function renderPart({
  part,
  index,
  payload,
  markdownContent,
}: {
  part: RichAnswerPart;
  index: number;
  payload: RichPayload;
  markdownContent: string;
}) {
  if (part.type === 'markdown') {
    const hasLegacyMoreProjects = payload.visualBlocks.some(
      (block) =>
        block.type === 'projectCards' && block.dataKey === 'projects.more'
    );
    const hasCoreSkills = payload.visualBlocks.some(
      (block) => block.type === 'skillChips' && block.dataKey === 'skills.core'
    );
    const hasContactCard = payload.visualBlocks.some(
      (block) => block.type === 'contactCard'
    );
    const localizedProjectContent = [
      'В разделе собраны три проекта из QA-портфолио: Sminex Comfort, Elme Messer и DPD.',
      '',
      'Карточки показывают назначение бизнеса, QA-контекст, используемые технологии и ссылку на сайт.',
      '',
      '---',
      '',
      '> «Качество — это не отсутствие дефектов, а обоснованная уверенность в том, что система выдержит реальные сценарии, изменения и человеческие ошибки.»',
    ].join('\n');
    const localizedSkillContent = [
      'Навыки сгруппированы по проектам, чтобы было видно не только название технологии, но и реальный контекст её применения.',
      '',
      'Ask Romeo показывает работу с AI/RAG и качеством ответов, Sminex — построение и масштабирование QA-процессов, Elme Messer — тестирование web-сервисов и интеграций, DPD — проверку логистической платформы и микросервисной архитектуры.',
      '',
      '---',
      '',
      '> «Зрелость QA определяется не количеством знакомых инструментов, а способностью превратить требования, риски и данные в уверенность перед релизом.»',
    ].join('\n');
    const localizedContactContent = [
      'Связаться со мной можно по электронной почте, через Telegram, GitHub или портфолио. Я открыт к диалогу о задачах Senior QA, построении и развитии QA-процессов, тестировании Web и Mobile, API и микросервисов, а также применении AI/LLM для автоматизации и повышения качества продукта.',
      '',
      '---',
      '',
      '> «Сильное сотрудничество начинается с ясности: какая задача стоит перед командой, какие риски критичны и что будет считаться качественным результатом.»',
    ].join('\n');
    const localizedContent = (
      payload.language === 'ru' && hasCoreSkills
        ? localizedSkillContent
        : payload.language === 'ru' && hasContactCard
        ? localizedContactContent
        : payload.language === 'ru' && hasLegacyMoreProjects
        ? localizedProjectContent
        : (part.content ?? markdownContent)
    )
      .replace(
        'Хороший UX — это не украшение, а отсутствие препятствий для пользователя.',
        'Качество — это не отсутствие дефектов, а обоснованная уверенность в том, что система выдержит реальные сценарии, изменения и человеческие ошибки.'
      )
      .replace(
        'Хороший UX — это не просто красота, а отсутствие препятствий.',
        'Качество — это не отсутствие дефектов, а обоснованная уверенность в том, что система выдержит реальные сценарии, изменения и человеческие ошибки.'
      );
    const content = sanitizeRichMarkdownContent(localizedContent);
    if (!content.trim()) return null;

    return <MarkdownBlock key={`markdown-${index}`} content={content} />;
  }

  if (part.type === 'sourceBadges') {
    return (
      <SourceBadgeList
        key={`sources-${index}`}
        sourceChunkIds={part.sourceChunkIds ?? payload.sourceChunkIds}
        language={payload.language}
        showPublicSources={!payload.hasCanonicalEvidence}
      />
    );
  }

  const block = findVisualBlock(part, payload.visualBlocks);
  if (!block) return null;

  if (block.type === 'projectCards') {
    const hasExplicitWikiBlock = payload.visualBlocks.some(
      (candidate) =>
        candidate.type === 'projectCards' &&
        candidate.dataKey === 'projects.wiki_featured'
    );
    const splitLegacyWiki =
      block.dataKey === 'projects.representative' &&
      !hasExplicitWikiBlock &&
      block.items.some(
        (item) =>
          isRecord(item) &&
          ['sminex_comfort', 'elme_messer', 'dpd'].includes(String(item.id))
      );

    return (
      <ProjectShowcaseCards
        key={`${block.type}-${index}`}
        block={block}
        mediaRefs={payload.mediaRefs}
        language={payload.language}
        splitLegacyWiki={splitLegacyWiki}
      />
    );
  }

  if (block.type === 'skillChips') {
    return (
      <SkillChipGroup
        key={`${block.type}-${index}`}
        block={block}
        language={payload.language}
      />
    );
  }

  if (block.type === 'contactCard') {
    return (
      <ContactCard
        key={`${block.type}-${index}`}
        block={block}
        mediaRefs={payload.mediaRefs}
        language={payload.language}
      />
    );
  }

  if (block.type === 'ctaButtons') {
    return <CtaButtons key={`${block.type}-${index}`} block={block} />;
  }

  if (block.type === 'sourceBadges') {
    return (
      <SourceBadgeList
        key={`${block.type}-${index}`}
        sourceChunkIds={payload.sourceChunkIds}
        language={payload.language}
        showPublicSources={!payload.hasCanonicalEvidence}
      />
    );
  }

  if (block.type === 'imageCard') {
    return (
      <ImageFallbackCards
        key={`${block.type}-${index}`}
        block={block}
        mediaRefs={payload.mediaRefs}
        language={payload.language}
      />
    );
  }

  if (block.type === 'statelessDiagram' || block.type === 'timeline') {
    return <WorkflowSteps key={`${block.type}-${index}`} block={block} />;
  }

  if (block.type === 'comparisonTable') {
    return (
      <ComparisonGrid
        key={`${block.type}-${index}`}
        block={block}
        language={payload.language}
      />
    );
  }

  if (block.type === 'profileCard') {
    return (
      <ProfileHeroCard
        key={`${block.type}-${index}`}
        language={payload.language}
      />
    );
  }

  return null;
}

function MarkdownBlock({ content }: { content: string }) {
  return (
    <div className="prose dark:prose-invert w-full max-w-none whitespace-normal leading-7">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="my-2 break-words first:mt-0 last:mb-0">
              {renderProjectActionText(children)}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-2 list-disc space-y-2 pl-5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 list-decimal space-y-2 pl-5">{children}</ol>
          ),
          li: ({ children }) => <li className="my-0 pl-0">{children}</li>,
          blockquote: ({ children }) => (
            <QuoteBlock attribution="Romeo">{children}</QuoteBlock>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-300"
            >
              {children}
            </a>
          ),
        }}
      >
        {normalizeMarkdownSpacing(content)}
      </Markdown>
    </div>
  );
}

function renderProjectActionText(children: ReactNode): ReactNode {
  if (typeof children === 'string') return renderProjectActionString(children);
  if (Array.isArray(children)) {
    return children.map((child, index) => (
      <Fragment key={`project-action-text-${index}`}>
        {renderProjectActionText(child)}
      </Fragment>
    ));
  }

  return children;
}

function renderProjectActionString(value: string): ReactNode {
  const phrases: Array<{ label: string; action: ProjectActionHighlight }> = [
    { label: 'Связанные вопросы', action: 'questions' },
    { label: 'Открыть ссылку', action: 'open' },
    { label: 'Открыть', action: 'open' },
    { label: 'Questions', action: 'questions' },
    { label: 'related questions', action: 'questions' },
    { label: 'Похожие вопросы', action: 'questions' },
    { label: 'Публичные ссылки', action: 'open' },
    { label: 'Открыть', action: 'open' },
    { label: 'public links', action: 'open' },
    { label: 'Open', action: 'open' },
  ];
  const pattern = new RegExp(
    `(${phrases.map((phrase) => escapeRegExp(phrase.label)).join('|')})`,
    'gi'
  );
  const parts = value.split(pattern).filter((part) => part.length > 0);
  if (parts.length <= 1) return value;

  return parts.map((part, index) => {
    const phrase = phrases.find(
      (candidate) => candidate.label.toLowerCase() === part.toLowerCase()
    );
    if (!phrase) return part;

    return (
      <button
        key={`${part}-${index}`}
        type="button"
        onClick={() => highlightProjectAction(phrase.action)}
        className="text-primary hover:text-primary/80 inline break-words underline underline-offset-4"
      >
        {part}
      </button>
    );
  });
}

function highlightProjectAction(action: ProjectActionHighlight) {
  window.dispatchEvent(
    new CustomEvent<ProjectActionHighlight>('askoosu:highlightProjectAction', {
      detail: action,
    })
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sanitizeRichMarkdownContent(content: string) {
  const hiddenPublicPolicyLines = [
    'Приватные репозитории, черновики резюме и личные адреса не публикуются: показывается только открытый контекст проектов, связи и сотрудничества.',
    'На этом экране оставлены только публичные контакты и информация о проектах, полезная для начала сотрудничества.',
    'Private repositories, unprepared resume links, and personal addresses stay out of the public portfolio response.',
    'This view keeps the focus on public contact channels and project context that can lead into a practical collaboration conversation.',
  ];
  const hiddenPublicPolicyPatterns = [
    new RegExp(
      ['Contact is', 'shown', 'through', 'public', 'channels', 'only\\.'].join(
        ' '
      )
    ),
  ];

  return normalizeMarkdownSpacing(
    content
      .split('\n')
      .filter((line) => {
        const trimmedLine = line.trim();
        return (
          !hiddenPublicPolicyLines.some((hiddenLine) =>
            trimmedLine.includes(hiddenLine)
          ) &&
          !hiddenPublicPolicyPatterns.some((pattern) =>
            pattern.test(trimmedLine)
          )
        );
      })
      .join('\n')
  );
}

function createAskRomeoProject(language: 'ru' | 'en'): ProjectItem {
  return {
    id: 'ask_romeo',
    title: 'Ask Romeo',
    label: 'AI Portfolio',
    subtitle:
      language === 'ru'
        ? 'AI-портфолио с диалоговым интерфейсом'
        : 'AI-connected conversational portfolio',
    description:
      language === 'ru'
        ? 'Интерактивное портфолио на Next.js с Ask UI, RAG-базой знаний и ответами о проектах и опыте Romeo.'
        : 'An interactive Next.js portfolio with an Ask UI, RAG knowledge base, and grounded answers about Romeo\'s projects and experience.',
    image: 'project.askoosu.cover',
    tags: ['Next.js', 'React', 'TypeScript', 'RAG', 'OpenAI'],
    href: oosuProfile.currentPortfolioUrl,
  };
}

function createQaFeaturedProjects(language: 'ru' | 'en'): ProjectItem[] {
  return [
    {
      id: 'sminex_comfort',
      title: 'Sminex Comfort',
      label: 'PropTech',
      subtitle:
        language === 'ru'
          ? 'Web- и мобильная платформа'
          : 'Web and mobile platform',
      description:
        language === 'ru'
          ? 'QA платформы для жителей: пользовательские сценарии, API, интеграции и регрессия перед релизами.'
          : 'QA for a resident platform: user journeys, APIs, integrations, and release regression testing.',
      image: 'project.sminex_comfort.cover',
      tags: ['Next.js', 'React', 'Webpack', 'Yandex Metrica'],
      href: 'https://comfort.sminex.com/',
    },
    {
      id: 'elme_messer',
      title: 'Elme Messer',
      label: 'Enterprise',
      subtitle:
        language === 'ru'
          ? 'Web- и мобильная платформа'
          : 'Web and mobile platform',
      description:
        language === 'ru'
          ? 'QA корпоративных цифровых сервисов: функциональность, интеграции, пользовательские сценарии и релизы.'
          : 'QA for enterprise digital services: functionality, integrations, user journeys, and releases.',
      image: 'project.elme_messer.cover',
      tags: ['WordPress', 'jQuery', 'WPML', 'Autoptimize', 'Google Analytics'],
      href: 'https://elmemesser.lv/',
    },
    {
      id: 'dpd',
      title: 'DPD',
      label: 'Logistics',
      subtitle:
        language === 'ru'
          ? 'Web- и мобильная платформа'
          : 'Web and mobile platform',
      description:
        language === 'ru'
          ? 'QA логистических сценариев: отправления, API, интеграции и регрессия критичных процессов доставки.'
          : 'QA for logistics flows: shipments, APIs, integrations, and regression of critical delivery processes.',
      image: 'project.dpd.cover',
      tags: ['WordPress', 'jQuery', 'Bootstrap', 'SiteOrigin', 'Slick'],
      href: 'https://dpd.ru/',
    },
  ];
}

function ProjectShowcaseCards({
  block,
  mediaRefs,
  language,
  splitLegacyWiki = false,
}: {
  block: VisualBlock;
  mediaRefs: MediaRef[];
  language: 'ru' | 'en';
  splitLegacyWiki?: boolean;
}) {
  const featuredProjectIds = new Set([
    'ask_romeo',
    'askoosu',
    'sminex_comfort',
    'elme_messer',
    'dpd',
  ]);
  const parsedProjects = block.items
    .map(parseProjectItem)
    .filter(isDefined);
  const isWikiProjects =
    block.dataKey === 'projects.more' ||
    block.dataKey === 'projects.wiki_featured';
  const visibleProjects = isWikiProjects
    ? parsedProjects.filter((project) => featuredProjectIds.has(project.id))
    : parsedProjects;
  const normalizedProjects = isWikiProjects
    ? visibleProjects.map((project) =>
        project.id === 'askoosu'
          ? { ...project, id: 'ask_romeo', title: 'Ask Romeo' }
          : project
      )
    : visibleProjects;
  const verifiedProjectTags: Record<string, string[]> = {
    sminex_comfort: ['Next.js', 'React', 'Webpack', 'Yandex Metrica'],
    elme_messer: ['WordPress', 'jQuery', 'WPML', 'Autoptimize', 'Google Analytics'],
    dpd: ['WordPress', 'jQuery', 'Bootstrap', 'SiteOrigin', 'Slick'],
  };
  const projectsWithVerifiedTags = normalizedProjects.map((project) => ({
    ...project,
    tags: verifiedProjectTags[project.id] ?? project.tags,
  }));
  const projects =
    isWikiProjects &&
    !projectsWithVerifiedTags.some((project) => project.id === 'ask_romeo')
      ? [createAskRomeoProject(language), ...projectsWithVerifiedTags]
      : projectsWithVerifiedTags;
  const [highlightedAction, setHighlightedAction] =
    useState<ProjectActionHighlight | null>(null);
  const isMoreProjectsRail =
    block.dataKey === 'projects.more' ||
    block.dataKey === 'projects.wiki_featured' ||
    block.title?.toLowerCase().includes('more project');

  useEffect(() => {
    function handleHighlight(event: Event) {
      const action = (event as CustomEvent<ProjectActionHighlight>).detail;
      if (action !== 'questions' && action !== 'open') return;
      setHighlightedAction(action);
      window.setTimeout(() => setHighlightedAction(null), 1600);
    }

    window.addEventListener(
      'askoosu:highlightProjectAction',
      handleHighlight
    );
    return () =>
      window.removeEventListener(
        'askoosu:highlightProjectAction',
        handleHighlight
      );
  }, []);

  if (splitLegacyWiki) {
    return (
      <div className="space-y-4">
        <ProjectShowcaseCards
          block={{
            type: 'projectCards',
            title: 'Featured Projects',
            dataKey: 'projects.original_featured',
            items: createQaFeaturedProjects(language),
          }}
          mediaRefs={mediaRefs}
          language={language}
        />
        <ProjectShowcaseCards
          block={{
            ...block,
            title: language === 'ru' ? 'Дополнительно' : 'Additional',
            dataKey: 'projects.wiki_featured',
          }}
          mediaRefs={mediaRefs}
          language={language}
        />
      </div>
    );
  }

  if (projects.length === 0) return null;

  const sectionTitle =
    block.dataKey === 'projects.wiki_featured' ||
    block.dataKey === 'projects.more'
      ? language === 'ru'
        ? 'Дополнительно'
        : 'Additional'
      : language === 'ru' && block.title === 'Featured Projects'
        ? 'Избранные проекты'
        : block.title;

  return (
    <section className="space-y-2" aria-label={sectionTitle ?? 'Projects'}>
      <div className="flex items-center justify-between gap-3">
        {sectionTitle && (
          <h3 className="min-w-0 text-sm font-semibold tracking-normal">
            {sectionTitle}
          </h3>
        )}
        {isMoreProjectsRail && (
          <span className="text-muted-foreground shrink-0 text-xs">
            {language === 'ru' ? 'Листайте в стороны' : 'Scroll for more'}
          </span>
        )}
      </div>
      <div
        className={
          isMoreProjectsRail
            ? 'flex snap-x gap-3 overflow-x-auto pb-2'
            : 'grid grid-cols-1 gap-3 md:grid-cols-3'
        }
      >
        {projects.map((project) => (
          <article
            key={project.id}
            className={cn(
              'group overflow-hidden rounded-lg border border-neutral-200/80 bg-neutral-100/70 text-foreground shadow-sm dark:border-neutral-800 dark:bg-neutral-900/90',
              isMoreProjectsRail && 'w-[18rem] shrink-0 snap-start'
            )}
          >
            <MediaPreview
              assetKey={project.image}
              mediaRefs={mediaRefs}
              className={isMoreProjectsRail ? 'aspect-[4/3]' : 'aspect-[16/10]'}
              language={language}
            />
            <div className="space-y-3 p-3">
              <div className="space-y-1">
                <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                  <span className="bg-background/80 text-muted-foreground inline-flex max-w-full min-w-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold">
                    <span className="min-w-0 truncate">
                      {project.label ?? project.subtitle ?? project.id}
                    </span>
                  </span>
                </div>
                <h4 className="min-w-0 text-lg font-semibold tracking-normal break-words">
                  {project.title}
                </h4>
                {project.subtitle && (
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {project.subtitle}
                  </p>
                )}
              </div>
              {project.description && (
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {project.description}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-background/70 text-muted-foreground inline-flex max-w-full min-w-0 rounded-md border px-2 py-0.5 text-[11px]"
                  >
                    <span className="min-w-0 truncate">{tag}</span>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {surfaceForProject(project.id) && (
                  <button
                    type="button"
                    onClick={() => switchQuestionSurface(project.id)}
                    data-project-action="questions"
                    className={cn(
                      'bg-background/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary/50 inline-flex h-8 max-w-full min-w-0 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:outline-none',
                      highlightedAction === 'questions' &&
                        'border-primary/70 bg-primary/10 text-primary ring-2 ring-primary/30'
                    )}
                  >
                    <MessageSquareText className="h-3.5 w-3.5" />
                    <span className="min-w-0 truncate">
                      {language === 'ru' ? 'Вопросы' : 'Questions'}
                    </span>
                  </button>
                )}
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-project-action="open"
                    className={cn(
                      'bg-background/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary/50 inline-flex h-8 max-w-full min-w-0 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:outline-none',
                      highlightedAction === 'open' &&
                        'border-primary/70 bg-primary/10 text-primary ring-2 ring-primary/30'
                    )}
                  >
                    <span className="min-w-0 truncate">
                      {language === 'ru' ? 'Открыть' : 'Open'}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ComparisonGrid({
  block,
  language,
}: {
  block: VisualBlock;
  language: 'ru' | 'en';
}) {
  const tables = block.items.map(parseComparisonTable).filter(isDefined);
  if (tables.length === 0) return null;

  return (
    <section className="space-y-2" aria-label={block.title ?? 'Comparison'}>
      {block.title && (
        <h3 className="text-sm font-semibold tracking-normal">{block.title}</h3>
      )}
      <div className="space-y-3">
        {tables.map((table, tableIndex) => (
          <div
            key={`${table.leftTitle}-${table.rightTitle}-${tableIndex}`}
            className="overflow-hidden rounded-lg border bg-white/70 dark:bg-white/[0.05]"
          >
            <div className="grid grid-cols-[0.72fr_1fr_1fr] border-b bg-slate-50 text-xs font-semibold dark:bg-slate-900/40">
              <div className="px-3 py-2 text-slate-500 dark:text-slate-400">
                {language === 'ru' ? 'Критерий' : 'Criteria'}
              </div>
              <div className="min-w-0 truncate border-l px-3 py-2">
                {table.leftTitle}
              </div>
              <div className="min-w-0 truncate border-l px-3 py-2">
                {table.rightTitle}
              </div>
            </div>
            {table.rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[0.72fr_1fr_1fr] border-b last:border-b-0"
              >
                <div className="min-w-0 bg-slate-50/70 px-3 py-2 text-xs font-medium break-words text-slate-600 dark:bg-slate-900/25 dark:text-slate-300">
                  {row.label}
                </div>
                <div className="min-w-0 border-l px-3 py-2 text-xs leading-relaxed break-words">
                  {row.left}
                </div>
                <div className="min-w-0 border-l px-3 py-2 text-xs leading-relaxed break-words">
                  {row.right}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillChipGroup({
  block,
  language,
}: {
  block: VisualBlock;
  language: 'ru' | 'en';
}) {
  const skillItems =
    block.dataKey === 'skills.core'
      ? language === 'ru'
        ? resumeProjectSkillGroupsRu
        : resumeProjectSkillGroupsEn
      : block.items;
  const skillGroups = skillItems.map(parseSkillGroup).filter(isDefined);
  if (skillGroups.length === 0) return null;
  const sectionTitle =
    block.dataKey === 'skills.core' && language === 'ru'
      ? 'Навыки, подтверждённые опытом'
      : block.title;

  return (
    <section className="space-y-3" aria-label={sectionTitle ?? 'Skills'}>
      {sectionTitle && (
        <h3 className="text-sm font-semibold tracking-normal">{sectionTitle}</h3>
      )}
      <div className="space-y-4">
        {skillGroups.map((group) => (
          <div
            key={group.group}
            className="rounded-lg border bg-white/80 p-3 shadow-sm dark:bg-white/[0.05]"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-slate-950 p-1.5 text-white dark:bg-white dark:text-slate-950">
                <Code2 className="h-4 w-4" />
              </div>
              <h4 className="min-w-0 text-base font-semibold tracking-normal break-words">
                {group.group}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={`${group.group}-${skill.name}`}
                  className="inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-lg border border-slate-950 bg-slate-950 px-3 py-1.5 text-sm text-white shadow-sm dark:border-white/15 dark:bg-white/10"
                >
                  <span className="min-w-0 truncate">{skill.name}</span>
                  {skill.proficiency && (
                    <span className="shrink-0 rounded-md bg-white/12 px-1.5 py-0.5 text-[10px] text-white/70">
                      {localizeSkillProficiency(skill.proficiency, language)}
                    </span>
                  )}
                </span>
              ))}
            </div>
            {group.evidence.length > 0 && (
              <div className="text-muted-foreground mt-3 space-y-1.5 text-xs leading-relaxed">
                <p className="font-medium text-slate-600 dark:text-slate-300">
                  {language === 'ru' ? 'Контекст использования' : 'Used in context'}
                </p>
                <ul className="space-y-1">
                  {group.evidence.map((evidence) => (
                    <li key={evidence} className="break-words">
                      {evidence}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function localizeSkillProficiency(
  proficiency: string,
  language: 'ru' | 'en'
) {
  if (language !== 'ru') return proficiency;

  const labels: Record<string, string> = {
    confident: 'уверенно',
    usable: 'использую',
    learning: 'изучаю',
    experimental: 'эксперимент',
  };

  return labels[proficiency] ?? proficiency;
}

function ContactCard({
  block,
  mediaRefs,
  language,
}: {
  block: VisualBlock;
  mediaRefs: MediaRef[];
  language: 'ru' | 'en';
}) {
  const parsedActions = block.items
    .map(parseContactAction)
    .filter(isDefined);
  const actionsWithTelegram = parsedActions.some(
    (action) => action.kind?.toLowerCase().includes('telegram')
  )
    ? parsedActions
    : [
        ...parsedActions,
        {
          label: 'Telegram',
          href: oosuProfile.telegram,
          kind: 'telegram',
        },
      ];
  const orderedActions = [...actionsWithTelegram].sort((left, right) => {
    const leftIsPortfolio = left.kind?.toLowerCase().includes('portfolio')
      ? 1
      : 0;
    const rightIsPortfolio = right.kind?.toLowerCase().includes('portfolio')
      ? 1
      : 0;
    return leftIsPortfolio - rightIsPortfolio;
  });
  const actions = orderedActions
    .map((action) => ({
      ...action,
      href:
        action.kind?.toLowerCase().includes('email') ||
        action.href.startsWith('mailto:')
          ? `mailto:${oosuProfile.email}`
          : action.kind?.toLowerCase().includes('portfolio')
          ? language === 'ru'
            ? '/projects?lang=rus&theme=dark'
            : '/projects?lang=en&theme=dark'
          : action.href,
      label:
        language === 'ru'
          ? localizeContactActionLabel(action.label)
          : action.label,
    }));

  return (
    <section className="rounded-lg border bg-slate-50 p-4 shadow-sm dark:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-full border bg-white shadow-sm dark:bg-slate-900">
            <MediaPreview
              assetKey="profile.oosu.portrait"
              mediaRefs={mediaRefs}
              className="h-full w-full"
              compact
              language={language}
            />
          </div>
          <div className="min-w-0">
            <h3 className="min-w-0 text-xl font-bold tracking-normal break-words">
              {oosuProfile.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {language === 'ru' ? 'Бриф для сотрудничества' : 'Collaboration Brief'}
            </p>
          </div>
        </div>
        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 sm:px-3 sm:text-sm dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {language === 'ru' ? 'Открыт' : 'Open'}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <ContactBriefItem
          icon={CalendarDays}
          title={language === 'ru' ? 'Режим' : 'Mode'}
          text={
            language === 'ru'
              ? 'Открыт к разговору о проектах и сотрудничестве'
              : 'Open to project and collaboration conversations'
          }
        />
        <ContactBriefItem
          icon={Globe2}
          title={language === 'ru' ? 'Локация' : 'Location'}
          text={
            language === 'ru' ? oosuProfile.location : oosuProfile.locationEn
          }
        />
              <ContactBriefItem
                icon={Layers3}
                title={language === 'ru' ? 'Специализация' : 'Specialization'}
                text={
                  language === 'ru'
                    ? 'Senior QA: процессы качества, Shift-Left, Web и Mobile, API, интеграции, микросервисы и AI-автоматизация.'
                    : 'Senior QA: quality processes, Shift-Left, Web and Mobile, APIs, integrations, microservices, and AI-assisted automation.'
                }
              />
              <ContactBriefItem
                icon={Rocket}
                title={language === 'ru' ? 'Стек' : 'Stack'}
                text={
                  language === 'ru'
                    ? 'Web/Mobile, REST/SOAP, SQL, Postman, Swagger, Allure TestOps, Sentry, Kibana, Grafana, Charles, Docker, Kafka и CI/CD.'
                    : 'Web/Mobile, REST/SOAP, SQL, Postman, Swagger, Allure TestOps, Sentry, Kibana, Grafana, Charles, Docker, Kafka, and CI/CD.'
                }
              />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            {language === 'ru' ? 'Что я даю' : 'What I bring'}
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
            {language === 'ru'
              ? 'Сильная сторона — связывать требования, качество, автоматизацию и AI-инструменты в рабочий процесс команды. Важно быстро находить риски и доводить продукт до стабильного релиза.'
              : 'I connect ideas into screens, APIs, data flows, and AI answer experiences. I care about fast prototypes that still feel clear, usable, and real enough to discuss.'}
          </p>
        </div>
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold">
            <Goal className="h-4 w-4" />
            {language === 'ru' ? 'Цель' : 'Goal'}
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
            {language === 'ru'
              ? 'Помогать командам выпускать надёжное ПО и применять AI там, где это реально ускоряет QA и инженерные процессы.'
              : 'I want to build more AI-connected products that people can actually use and understand: playful where it helps, but working where it matters.'}
          </p>
        </div>
      </div>

      {actions.length > 0 && (
        <div className="mt-3">
          <CtaButtons
            block={{ ...block, type: 'ctaButtons', items: actions }}
          />
        </div>
      )}
    </section>
  );
}

function localizeContactActionLabel(label: string) {
  const labels: Record<string, string> = {
    Email: 'Почта',
    Portfolio: 'Портфолио',
    Contact: 'Связаться',
  };

  return labels[label] ?? label;
}

function ContactBriefItem({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="flex min-w-0 gap-3 rounded-lg border bg-white p-3 dark:bg-slate-950/40">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-700 dark:text-slate-200" />
      <div className="min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground mt-1 text-sm leading-5 break-words">
          {text}
        </p>
      </div>
    </div>
  );
}

function CtaButtons({ block }: { block: VisualBlock }) {
  const actions = block.items.map(parseContactAction).filter(isDefined);
  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => {
        const Icon = iconForAction(action.kind ?? action.label);
        const opensInCurrentTab =
          action.href.startsWith('mailto:') || action.href.startsWith('/');

        return (
          <a
            key={`${action.label}-${action.href}`}
            href={action.href}
            target={opensInCurrentTab ? undefined : '_blank'}
            rel={
              opensInCurrentTab
                ? undefined
                : 'noopener noreferrer'
            }
            className="bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 max-w-full min-w-0 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition"
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="min-w-0 truncate">{action.label}</span>
          </a>
        );
      })}
    </div>
  );
}

function WorkflowSteps({ block }: { block: VisualBlock }) {
  const steps = block.items.map(parseDiagramStep).filter(isDefined);
  if (steps.length === 0) return null;

  return (
    <section className="space-y-2" aria-label={block.title ?? 'Workflow'}>
      {block.title && (
        <h3 className="text-sm font-semibold tracking-normal">{block.title}</h3>
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
        {steps.map((step, index) => (
          <div
            key={`${step.title}-${index}`}
            className="rounded-lg border border-[#0D9487]/20 bg-[#0D9487]/10 p-3 dark:border-[#0D9487]/35 dark:bg-[#0D9487]/15"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0D9487] text-xs font-semibold text-white shadow-sm">
                {index + 1}
              </span>
              <h4 className="min-w-0 flex-1 whitespace-nowrap text-[13px] leading-5 font-semibold">
                {getWorkflowStepTitle(block.dataKey, index, step.title)}
              </h4>
            </div>
            {step.description && (
              <p className="text-muted-foreground text-xs leading-relaxed">
                {step.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function getWorkflowStepTitle(
  dataKey: string | undefined,
  index: number,
  fallbackTitle: string
) {
  if (dataKey !== 'qa.ai.workflow') return fallbackTitle;

  return ['Контекст', 'AI-идеи', 'Проверка', 'QA-тесты', 'Релиз'][index] ?? fallbackTitle;
}

function ImageFallbackCards({
  block,
  mediaRefs,
  language,
}: {
  block: VisualBlock;
  mediaRefs: MediaRef[];
  language: 'ru' | 'en';
}) {
  const imageItems = block.items
    .map((item) => (isRecord(item) ? item : null))
    .filter(isDefined);
  if (imageItems.length === 0) return null;

  return (
    <section className="space-y-2" aria-label={block.title ?? 'Images'}>
      {block.title && (
        <h3 className="text-sm font-semibold tracking-normal">{block.title}</h3>
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {imageItems.map((item, index) => {
          const assetKey = parseString(item.image);
          const media = assetKey ? findMediaRef(mediaRefs, assetKey) : null;
          const caption = parseString(item.caption) ?? media?.caption;

          return (
            <div
              key={`${assetKey ?? 'image'}-${index}`}
              className="overflow-hidden rounded-lg border bg-white/70 dark:bg-white/[0.05]"
            >
              <MediaPreview
                assetKey={assetKey ?? undefined}
                mediaRefs={mediaRefs}
                language={language}
              />
              <p className="text-muted-foreground p-3 text-xs leading-relaxed">
                {media?.status === 'ready'
                  ? caption
                  : language === 'ru'
                    ? 'Превью скоро появится'
                    : 'Preview asset pending'}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const PROFILE_TAGS = [
  'Fullstack',
  'QA',
  'AI',
  'RAG',
  'System Design',
  'APIs',
  'CI/CD',
  'UI/UX',
] as const;

function ProfileHeroCard({ language }: { language: 'ru' | 'en' }) {
  const isRu = language === 'ru';

  return (
    <section className="overflow-hidden rounded-lg border bg-white/80 shadow-sm dark:bg-white/[0.05]">
      <div className="grid gap-4 p-4 md:grid-cols-[0.95fr_1.15fr] md:items-center">
        <div className="overflow-hidden rounded-lg border bg-slate-100 dark:bg-slate-900">
          <ProgressiveProfileMotion />
        </div>
        <div className="min-w-0 space-y-3">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold tracking-normal break-words md:text-3xl">
              {oosuProfile.name}
            </h3>
            <p className="text-muted-foreground text-base">
              {isRu ? oosuProfile.title : oosuProfile.titleEn}
            </p>
            <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <MapPin className="h-3.5 w-3.5" />
              {isRu ? oosuProfile.location : oosuProfile.locationEn}
            </p>
          </div>

          {isRu ? (
            <>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                Специализируюсь на современных веб-приложениях, автоматизации
                тестирования и внедрении AI в процессы разработки.
              </p>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                Работаю на стыке frontend, backend и quality engineering —
                проектирую архитектуру, надёжные API, автоматизацию и применяю
                LLM, RAG и AI-ассистентов, чтобы быстрее и увереннее выпускать
                продукт.
              </p>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                Предпочитаю инженерный подход: сначала понять задачу, затем
                выбрать самое простое и надёжное решение, которое легко
                поддерживать и масштабировать.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                I specialize in modern web apps, test automation, and integrating
                AI into development workflows.
              </p>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                I work at the intersection of frontend, backend, and quality
                engineering — designing architectures, reliable APIs, automation,
                and applying LLM, RAG, and AI assistants to ship faster with
                confidence.
              </p>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                I prefer an engineering approach: understand the problem first,
                then choose the simplest reliable solution that is easy to
                maintain and scale.
              </p>
            </>
          )}
        </div>
      </div>
      <div className="border-t px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          {PROFILE_TAGS.map((tag) => (
            <span
              key={tag}
              className="bg-background text-muted-foreground rounded-lg border px-2.5 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgressiveProfileMotion() {
  return (
    <div
      className="relative aspect-[4/5] h-full w-full md:aspect-[5/6]"
      role="img"
      aria-label="Romeo Timony profile portrait"
    >
      <Image
        src="/images/profile/romeo-profile.png"
        alt="Romeo Timony"
        width={864}
        height={1144}
        priority
        className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
        sizes="(min-width: 768px) 360px, calc(100vw - 3rem)"
      />
    </div>
  );
}

function MediaPreview({
  assetKey,
  mediaRefs,
  className,
  compact = false,
  preferMobile = false,
  language,
}: {
  assetKey?: string;
  mediaRefs: MediaRef[];
  className?: string;
  compact?: boolean;
  preferMobile?: boolean;
  language: 'ru' | 'en';
}) {
  const storedMedia = assetKey ? findMediaRef(mediaRefs, assetKey) : null;
  const media =
    assetKey === 'profile.oosu.portrait'
      ? {
          ...(storedMedia ?? {
            assetKey,
            kind: 'profile',
          }),
          src: '/images/profile/romeo-timony-new.webp',
          darkSrc: undefined,
          mobileSrc: undefined,
          mobileDarkSrc: undefined,
          alt: 'Romeo Timony portrait',
          status: 'ready' as const,
        }
      : assetKey === 'project.askoosu.cover'
      ? {
          ...(storedMedia ?? {
            assetKey,
            kind: 'project',
          }),
          src: '/images/projects/ask-romeo-cover.webp',
          darkSrc: '/images/projects/ask-romeo-cover.webp',
          mobileSrc: undefined,
          mobileDarkSrc: undefined,
          alt: 'Ask Romeo interface preview',
          status: 'ready' as const,
        }
      : assetKey === 'project.dpd.cover'
        ? {
            ...(storedMedia ?? {
              assetKey,
              kind: 'project',
            }),
            src: '/images/projects/dpd-cover-new.webp',
            darkSrc: undefined,
            mobileSrc: undefined,
            mobileDarkSrc: undefined,
            alt: 'DPD website interface preview',
            status: 'ready' as const,
          }
        : assetKey === 'project.sminex_comfort.cover'
          ? {
              ...(storedMedia ?? {
                assetKey,
                kind: 'project',
              }),
              src: '/images/projects/sminex-comfort-cover-new.webp',
              darkSrc: undefined,
              mobileSrc: undefined,
              mobileDarkSrc: undefined,
              alt: 'Sminex Comfort interface preview',
              status: 'ready' as const,
            }
          : assetKey === 'project.elme_messer.cover'
            ? {
                ...(storedMedia ?? {
                  assetKey,
                  kind: 'project',
                }),
                src: '/images/projects/elme-messer-cover.webp',
                darkSrc: undefined,
                mobileSrc: undefined,
                mobileDarkSrc: undefined,
                alt: 'Elme Messer website preview',
                status: 'ready' as const,
              }
            : storedMedia;
  const canRenderImage =
    media?.status === 'ready' && media.src && media.src !== 'TODO_ASSET';

  if (canRenderImage) {
    const darkSrc =
      media.darkSrc && media.darkSrc !== 'TODO_ASSET' ? media.darkSrc : null;
    const mobileSrc =
      media.mobileSrc && media.mobileSrc !== 'TODO_ASSET'
        ? media.mobileSrc
        : null;
    const mobileDarkSrc =
      media.mobileDarkSrc && media.mobileDarkSrc !== 'TODO_ASSET'
        ? media.mobileDarkSrc
        : null;

    return (
      <div
        className={cn(
          'relative overflow-hidden bg-slate-100 dark:bg-slate-900',
          compact ? 'h-full w-full' : 'aspect-[16/9]',
          className
        )}
      >
        {darkSrc ? (
          <>
            <Image
              src={mobileSrc ?? media.src}
              alt={media.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover dark:hidden"
            />
            <Image
              src={mobileDarkSrc ?? darkSrc}
              alt={media.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="hidden object-cover dark:block"
            />
          </>
        ) : preferMobile && mobileSrc ? (
          <Image
            src={mobileSrc}
            alt={media.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : mobileSrc ? (
          <>
            <Image
              src={mobileSrc}
              alt={media.alt}
              fill
              sizes="(max-width: 640px) 100vw, 0px"
              className="object-cover sm:hidden"
            />
            <Image
              src={media.src}
              alt={media.alt}
              fill
              sizes="(max-width: 640px) 0px, 50vw"
              className="hidden object-cover sm:block"
            />
          </>
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'text-muted-foreground flex items-center justify-center bg-[linear-gradient(135deg,rgba(15,23,42,0.08),rgba(14,165,233,0.10),rgba(16,185,129,0.10))] p-3 text-center text-xs dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(14,165,233,0.10),rgba(16,185,129,0.08))]',
        compact ? 'h-full w-full' : 'aspect-[16/9]',
        className
      )}
    >
      <span>{getPendingAssetLabel(language, compact)}</span>
    </div>
  );
}

function SourceBadgeList({
  sourceChunkIds,
  language,
  showPublicSources,
}: {
  sourceChunkIds: string[];
  language: 'ru' | 'en';
  showPublicSources: boolean;
}) {
  const isDebugMode = useMemo(isAskOosuDebugUiEnabled, []);
  const [isExpanded, setIsExpanded] = useState(false);

  if (sourceChunkIds.length === 0) return null;

  const copy = getSourceBadgeCopy(language);

  if (!isDebugMode && !showPublicSources) return null;

  return (
    <div
      className="space-y-2"
      aria-label={isDebugMode ? copy.debugAriaLabel : copy.publicAriaLabel}
    >
      <button
        type="button"
        className={cn(
          'focus-visible:ring-ring/50 inline-flex max-w-full items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium outline-none focus-visible:ring-[3px]',
          isDebugMode
            ? 'border-violet-300 bg-violet-50 text-violet-800 dark:border-violet-700/70 dark:bg-violet-950/30 dark:text-violet-200'
            : 'bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        )}
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((current) => !current)}
      >
        <BookOpenCheck className="h-3.5 w-3.5 shrink-0" />
        <span className="min-w-0 truncate">
          {isExpanded ? copy.hideSources : copy.viewSources}
        </span>
        <span className="bg-background/80 rounded-md px-1.5 py-0.5 text-[10px]">
          {sourceChunkIds.length}
        </span>
      </button>

      {isExpanded && (
        <div className="flex flex-wrap gap-2">
          {sourceChunkIds.map((chunkId, index) => (
            <span
              key={chunkId}
              className="bg-background text-muted-foreground inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs"
            >
              <BookOpenCheck className="text-foreground h-3.5 w-3.5 shrink-0" />
              <span className="min-w-0 truncate">
                {isDebugMode ? chunkId : copy.sourceLabel(index + 1)}
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function getPendingAssetLabel(language: 'ru' | 'en', compact: boolean) {
  if (language === 'ru') return compact ? 'Скоро' : 'Превью скоро появится';
  return compact ? 'Pending' : 'Preview asset pending';
}

function getSourceBadgeCopy(language: 'ru' | 'en') {
  if (language === 'ru') {
    return {
      viewSources: 'Показать источники',
      hideSources: 'Скрыть источники',
      publicAriaLabel: 'Источники ответа',
      debugAriaLabel: 'Отладочная информация источников',
      sourceLabel: (index: number) => `Wiki Romeo · источник ${index}`,
    };
  }

  return {
    viewSources: 'View sources',
    hideSources: 'Hide sources',
    publicAriaLabel: 'Answer sources',
    debugAriaLabel: 'Source chunk debug metadata',
    sourceLabel: (index: number) => `Romeo Wiki source ${index}`,
  };
}

function buildFallbackParts(payload: RichPayload): RichAnswerPart[] {
  return [
    { type: 'markdown', contentKey: 'defaultAnswer' },
    ...payload.visualBlocks.map((block) => ({
      type: 'component' as const,
      component: componentNameForBlock(block.type),
      blockType: block.type,
      dataKey: block.dataKey,
    })),
  ];
}

function normalizeAnswerPartsForDisplay(parts: RichAnswerPart[]) {
  const hasProfileHeroCard = parts.some(
    (part) => part.type === 'component' && part.component === 'ProfileHeroCard'
  );

  if (!hasProfileHeroCard) return parts;

  return parts.filter((part) => part.type !== 'markdown');
}

function findVisualBlock(part: RichAnswerPart, blocks: VisualBlock[]) {
  if (part.type !== 'component') return null;

  return (
    blocks.find((block) => block.dataKey && block.dataKey === part.dataKey) ??
    blocks.find((block) => block.type === part.blockType) ??
    blocks.find(
      (block) => componentNameForBlock(block.type) === part.component
    ) ??
    null
  );
}

function componentNameForBlock(blockType: string) {
  const componentByType: Record<string, string> = {
    profileCard: 'ProfileHeroCard',
    projectCards: 'ProjectShowcaseCards',
    skillChips: 'SkillChipGroup',
    timeline: 'CareerTimeline',
    comparisonTable: 'ComparisonGrid',
    statelessDiagram: 'AIWorkflowSteps',
    imageCard: 'ImageCard',
    contactCard: 'ContactCard',
    ctaButtons: 'CtaButtons',
    sourceBadges: 'SourceBadgeList',
  };

  return componentByType[blockType] ?? blockType;
}

function localizeBadge(
  badge: string | undefined,
  language: 'ru' | 'en'
): string | undefined {
  if (!badge) return badge;
  const map: Record<string, { ru: string; en: string }> = {
    'From Romeo Wiki': { ru: 'Из Wiki Romeo', en: 'From Romeo Wiki' },
    'Из Wiki Romeo': { ru: 'Из Wiki Romeo', en: 'From Romeo Wiki' },
  };
  return map[badge]?.[language] ?? badge;
}

function localizeTodoBadge(
  badge: string | undefined,
  language: 'ru' | 'en'
): string | undefined {
  if (!badge) return badge;
  const map: Record<string, { ru: string; en: string }> = {
    'Some assets pending': { ru: 'Часть материалов скоро появится', en: 'Some assets pending' },
    'Часть материалов скоро появится': {
      ru: 'Часть материалов скоро появится',
      en: 'Some assets pending',
    },
  };
  return map[badge]?.[language] ?? badge;
}

function parseRichPayload(metadata: unknown): RichPayload | null {
  if (!isRecord(metadata)) return null;

  const richAnswerData = metadata.richAnswerData;
  const nestedRichData = isRecord(richAnswerData) ? richAnswerData : null;
  const visualBlockSource = Array.isArray(metadata.visualBlocks)
    ? metadata.visualBlocks
    : Array.isArray(nestedRichData?.visualBlocks)
      ? nestedRichData.visualBlocks
      : [];
  const mediaRefSource = Array.isArray(metadata.mediaRefs)
    ? metadata.mediaRefs
    : Array.isArray(nestedRichData?.mediaRefs)
      ? nestedRichData.mediaRefs
      : [];
  const sourceChunkIdsSource = Array.isArray(metadata.sourceChunkIds)
    ? metadata.sourceChunkIds
    : Array.isArray(nestedRichData?.sourceChunkIds)
      ? nestedRichData.sourceChunkIds
      : [];

  const visualBlocks = visualBlockSource
    .map(parseVisualBlock)
    .filter(isDefined);
  const answerParts = Array.isArray(metadata.answerParts)
    ? metadata.answerParts.map(parseAnswerPart).filter(isDefined)
    : [];

  if (visualBlocks.length === 0 && answerParts.length === 0) return null;

  return {
    language: metadata.language === 'ru' ? 'ru' : 'en',
    badge: parseString(metadata.badge) ?? undefined,
    todoBadge: parseString(metadata.todoBadge) ?? undefined,
    renderSpecKey: parseString(metadata.renderSpecKey) ?? undefined,
    richAnswerData,
    answerParts,
    visualBlocks,
    mediaRefs: mediaRefSource.map(parseMediaRef).filter(isDefined),
    sourceChunkIds: parseStringArray(sourceChunkIdsSource),
    hasCanonicalEvidence:
      Array.isArray(metadata.sources) && metadata.sources.length > 0,
  };
}

function parseAnswerPart(value: unknown): RichAnswerPart | null {
  if (!isRecord(value)) return null;
  const type = parseString(value.type);

  if (type === 'markdown') {
    return {
      type,
      contentKey: parseString(value.contentKey) ?? undefined,
      content: parseString(value.content) ?? undefined,
    };
  }

  if (type === 'component') {
    return {
      type,
      component: parseString(value.component) ?? undefined,
      dataKey: parseString(value.dataKey) ?? undefined,
      blockType: parseString(value.blockType) ?? undefined,
    };
  }

  if (type === 'sourceBadges') {
    return {
      type,
      sourceChunkIds: parseStringArray(value.sourceChunkIds),
    };
  }

  return null;
}

function parseVisualBlock(value: unknown): VisualBlock | null {
  if (!isRecord(value)) return null;
  const type = parseString(value.type);
  if (!type) return null;

  return {
    type,
    title: parseString(value.title) ?? undefined,
    dataKey: parseString(value.dataKey) ?? undefined,
    items: Array.isArray(value.items) ? value.items : [],
  };
}

function parseMediaRef(value: unknown): MediaRef | null {
  if (!isRecord(value)) return null;
  const assetKey = parseString(value.assetKey);
  const kind = parseString(value.kind);
  const src = parseString(value.src);
  const alt = parseString(value.alt);
  const status =
    value.status === 'ready' ||
    value.status === 'todo' ||
    value.status === 'optional'
      ? value.status
      : null;

  if (!assetKey || !kind || !src || !alt || !status) return null;

  return {
    assetKey,
    kind,
    src,
    darkSrc: parseString(value.darkSrc) ?? undefined,
    mobileSrc: parseString(value.mobileSrc) ?? undefined,
    mobileDarkSrc: parseString(value.mobileDarkSrc) ?? undefined,
    alt,
    caption: parseString(value.caption) ?? undefined,
    status,
  };
}

function parseProjectItem(value: unknown): ProjectItem | null {
  if (!isRecord(value)) return null;
  const id = parseString(value.id);
  const title = parseString(value.title);
  if (!id || !title) return null;

  return {
    id,
    title,
    label: parseString(value.label) ?? undefined,
    subtitle: parseString(value.subtitle) ?? undefined,
    description: parseString(value.description) ?? undefined,
    image: parseString(value.image) ?? undefined,
    tags: parseStringArray(value.tags),
    href: parseString(value.href) ?? undefined,
  };
}

function parseSkillGroup(value: unknown): SkillGroup | null {
  if (!isRecord(value)) return null;
  const group = parseString(value.group);
  if (!group) return null;

  return {
    group,
    skills: Array.isArray(value.skills)
      ? value.skills.map(parseSkillItem).filter(isDefined)
      : [],
    evidence: parseStringArray(value.evidence),
  };
}

function parseSkillItem(value: unknown): SkillItem | null {
  if (typeof value === 'string') {
    const name = value.trim();
    return name ? { name } : null;
  }

  if (!isRecord(value)) return null;
  const name = parseString(value.name);
  if (!name) return null;

  return {
    name,
    proficiency: parseString(value.proficiency) ?? undefined,
  };
}

function parseContactAction(value: unknown): ContactAction | null {
  if (!isRecord(value)) return null;
  const label = parseString(value.label);
  const href = parseString(value.href);
  if (!label || !href) return null;

  return {
    label,
    href,
    kind: parseString(value.kind) ?? undefined,
  };
}

function parseDiagramStep(value: unknown): DiagramStep | null {
  if (!isRecord(value)) return null;
  const title = parseString(value.title);
  if (!title) return null;

  return {
    title,
    description: parseString(value.description) ?? undefined,
  };
}

function parseComparisonTable(value: unknown): ComparisonTable | null {
  if (!isRecord(value)) return null;
  const leftTitle = parseString(value.leftTitle);
  const rightTitle = parseString(value.rightTitle);
  const rows = Array.isArray(value.rows)
    ? value.rows.map(parseComparisonRow).filter(isDefined)
    : [];

  if (!leftTitle || !rightTitle || rows.length === 0) return null;

  return {
    leftTitle,
    rightTitle,
    rows,
  };
}

function parseComparisonRow(value: unknown): ComparisonRow | null {
  if (!isRecord(value)) return null;
  const label = parseString(value.label);
  const left = parseString(value.left);
  const right = parseString(value.right);

  if (!label || !left || !right) return null;

  return { label, left, right };
}

function surfaceForProject(projectId: string): QuestionSurface | null {
  const normalizedId = projectId.trim().toLowerCase();
  const surfaceByProjectId: Record<string, QuestionSurface> = {
    ask_romeo: 'project.askoosu',
    askoosu: 'project.askoosu',
    askoosu_2026: 'project.askoosu',
    instagram_clone: 'project.instagram',
    instagram: 'project.instagram',
    sticks_and_stones: 'project.sticks',
    sticks: 'project.sticks',
    portfoliooh: 'project.portfoliooh',
    portfolio_oh: 'project.portfoliooh',
    portfoli_oh: 'project.portfoliooh',
  };

  return surfaceByProjectId[normalizedId] ?? null;
}

function switchQuestionSurface(projectId: string) {
  const surface = surfaceForProject(projectId);
  if (!surface || typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('askoosu:question-surface', {
      detail: { surface },
    })
  );
}

function iconForAction(kind: string) {
  const normalizedKind = kind.toLowerCase();
  if (normalizedKind.includes('telegram')) return MessageSquareText;
  if (normalizedKind.includes('github')) return Github;
  if (normalizedKind.includes('linkedin')) return Linkedin;
  if (normalizedKind.includes('mail') || normalizedKind.includes('email')) {
    return Mail;
  }
  if (normalizedKind.includes('portfolio')) return BriefcaseBusiness;
  return Sparkles;
}

function findMediaRef(mediaRefs: MediaRef[], assetKey: string) {
  return mediaRefs.find((media) => media.assetKey === assetKey) ?? null;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
