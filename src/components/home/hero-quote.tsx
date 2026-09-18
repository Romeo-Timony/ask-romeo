'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  contextualQuotes,
  type ContextualQuote,
  formatQuoteWithMarks,
} from '@/data/contextual-quotes';
import type { ChatLanguage } from '@/lib/i18n/detect-language';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';

interface HeroQuoteProps {
  language: ChatLanguage;
}

const STORAGE_KEY = 'ask_romeo_hero_quote_index';

export function HeroQuote({ language }: HeroQuoteProps) {
  // Index 0 (QA Engineer) for clean, matching SSR
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const advanceQuote = useCallback((direction: 1 | -1 = 1) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next =
          (prev + direction + contextualQuotes.length) % contextualQuotes.length;
        try {
          window.localStorage.setItem(STORAGE_KEY, String(next));
        } catch {
          // Ignore localStorage errors in private browsing/sandboxes
        }
        return next;
      });
      setIsFading(false);
    }, 180);
  }, []);

  // Hydrate from localStorage and alternate on every page load / visit ("раз через раз, каждый раз новые")
  useEffect(() => {
    setMounted(true);
    let nextIndex = 0;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        if (!Number.isNaN(parsed)) {
          // Advance to the next alternating quote on every visit
          nextIndex = (parsed + 1) % contextualQuotes.length;
        }
      }
      window.localStorage.setItem(STORAGE_KEY, String(nextIndex));
    } catch {
      nextIndex = 1; // Fallback to alternating PM quote
    }
    setCurrentIndex(nextIndex);
  }, []);

  // Auto-rotate every 12 seconds so the user sees quotes alternate live
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      advanceQuote(1);
    }, 12000);
    return () => clearInterval(interval);
  }, [mounted, advanceQuote]);

  const currentQuote: ContextualQuote =
    contextualQuotes[currentIndex] ?? contextualQuotes[0];
  const isRu = language === 'ru';
  const quoteText = formatQuoteWithMarks(
    currentQuote.text[language] || currentQuote.text.ru,
    language
  );
  const isPm = currentQuote.role === 'pm';

  return (
    <div className="group mt-2 flex max-w-xl flex-col items-center">
      <p
        onClick={() => advanceQuote(1)}
        title={isRu ? 'Нажмите для следующей цитаты' : 'Click for next quote'}
        className={cn(
          'text-muted-foreground cursor-pointer select-none text-xs leading-relaxed font-medium italic transition-opacity duration-300 sm:text-sm hover:text-foreground/90',
          isFading ? 'opacity-0' : 'opacity-100'
        )}
      >
        {quoteText}
      </p>

      <button
        type="button"
        onClick={() => advanceQuote(1)}
        title={isRu ? 'Переключить цитату' : 'Next quote'}
        aria-label={
          isRu
            ? `Цитата: ${currentQuote.roleLabel[language]}. Нажмите для следующей`
            : `Quote: ${currentQuote.roleLabel[language]}. Click for next`
        }
        className={cn(
          'mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-background/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 shadow-xs backdrop-blur-md transition-all hover:bg-background/80 hover:text-foreground active:scale-95 dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.1]',
          isFading ? 'opacity-60' : 'opacity-100'
        )}
      >
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full transition-colors',
            isPm
              ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.7)]'
              : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]'
          )}
        />
        <span>{currentQuote.roleLabel[language]}</span>
        <RefreshCw className="ml-0.5 h-2.5 w-2.5 opacity-40 transition-transform duration-300 group-hover:rotate-180 group-hover:opacity-80" />
      </button>
    </div>
  );
}
