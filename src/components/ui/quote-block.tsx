'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { contextualQuotes, formatQuoteWithMarks } from '@/data/contextual-quotes';
import { RefreshCw } from 'lucide-react';

type QuoteBlockVariant = 'default' | 'subtle' | 'highlight';

type QuoteBlockProps = {
  children: ReactNode;
  attribution?: string;
  role?: 'qa' | 'pm';
  roleLabel?: string;
  variant?: QuoteBlockVariant;
};

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(' ');
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

function cleanText(text: string): string {
  return text.toLowerCase().replace(/[^a-zа-яё0-9]/gi, '');
}

export function QuoteBlock({
  children,
  attribution = 'Romeo',
  role: initialRole,
  roleLabel: initialRoleLabel,
  variant = 'default',
}: QuoteBlockProps) {
  const originalRawText = extractText(children);
  const isRu = /[а-яё]/i.test(originalRawText);
  const lang = isRu ? 'ru' : 'en';

  const cleanedOriginal = cleanText(originalRawText);
  const matchedQuoteIndex = contextualQuotes.findIndex((q) => {
    const qRu = cleanText(q.text.ru);
    const qEn = cleanText(q.text.en);
    return (
      (cleanedOriginal.length > 10 && (qRu.includes(cleanedOriginal) || cleanedOriginal.includes(qRu))) ||
      (cleanedOriginal.length > 10 && (qEn.includes(cleanedOriginal) || cleanedOriginal.includes(qEn)))
    );
  });

  const [activeQuoteIndex, setActiveQuoteIndex] = useState<number | null>(
    matchedQuoteIndex >= 0 ? matchedQuoteIndex : null
  );
  const [isRotating, setIsRotating] = useState(false);

  // If user rotated or matched a known quote, use it
  const activeQuote =
    activeQuoteIndex !== null ? contextualQuotes[activeQuoteIndex] : null;

  // Determine role
  let role: 'qa' | 'pm' = initialRole ?? 'qa';
  let badgeLabel = initialRoleLabel;

  if (activeQuote) {
    role = activeQuote.role;
    badgeLabel = activeQuote.roleLabel[lang];
  } else if (!badgeLabel) {
    const isPm = /(pm|project|менедж|управлен|scrum|agile|спринт|срок|бюджет|дедлайн|план)/i.test(
      originalRawText
    );
    const isQa = /(qa|тест|test|качество|дефект|баг|autotest|playwright|pytest|appium|регресс)/i.test(
      originalRawText
    );
    if (isPm && !isQa) {
      role = 'pm';
      badgeLabel = 'Project Manager';
    } else {
      role = 'qa';
      badgeLabel = isRu ? 'QA-инженер' : 'QA Engineer';
    }
  }

  const handleRotate = () => {
    setIsRotating(true);
    setTimeout(() => {
      setActiveQuoteIndex((prev) => {
        const next =
          prev === null
            ? (matchedQuoteIndex >= 0 ? (matchedQuoteIndex + 1) % contextualQuotes.length : 1)
            : (prev + 1) % contextualQuotes.length;
        return next;
      });
      setIsRotating(false);
    }, 150);
  };

  const displayText = activeQuote
    ? formatQuoteWithMarks(activeQuote.text[lang], lang)
    : null;

  return (
    <blockquote
      className={cn(
        'text-foreground/85 border-border/70 my-3 rounded-lg border-t bg-muted/20 px-3 py-2.5 text-sm leading-relaxed italic transition-colors',
        variant === 'subtle' && 'border-border/50 bg-transparent',
        variant === 'highlight' && 'border-primary/60 bg-primary/5'
      )}
    >
      <div className="flex items-start justify-center gap-1.5 text-center">
        <span
          aria-hidden
          className="text-primary/35 mt-0.5 shrink-0 select-none text-lg leading-none"
        >
          &quot;
        </span>
        <div
          className={cn(
            'min-w-0 transition-opacity duration-150 [&>p]:my-0',
            isRotating ? 'opacity-30' : 'opacity-100'
          )}
        >
          {displayText ? <p>{displayText}</p> : children}
        </div>
        <span
          aria-hidden
          className="text-primary/35 mt-0.5 shrink-0 select-none text-lg leading-none"
        >
          &quot;
        </span>
      </div>

      <footer className="text-muted-foreground mt-2 flex flex-wrap items-center justify-center gap-1.5 text-center text-xs not-italic">
        <span className="font-medium text-foreground/80">— {attribution}</span>
        {badgeLabel && (
          <>
            <span className="text-muted-foreground/30 select-none">•</span>
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors',
                role === 'pm'
                  ? 'border border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300'
                  : 'border border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
              )}
            >
              {badgeLabel}
            </span>
          </>
        )}
        <button
          type="button"
          onClick={handleRotate}
          className="text-muted-foreground/60 hover:text-foreground inline-flex items-center gap-1 rounded p-0.5 transition-colors hover:bg-muted/60"
          title={isRu ? 'Сменить цитату (QA ⇄ PM)' : 'Switch quote (QA ⇄ PM)'}
          aria-label={isRu ? 'Сменить цитату (QA ⇄ PM)' : 'Switch quote (QA ⇄ PM)'}
        >
          <RefreshCw
            className={cn(
              'h-3 w-3 transition-transform duration-300',
              isRotating && 'rotate-180'
            )}
          />
        </button>
      </footer>
    </blockquote>
  );
}

