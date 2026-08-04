'use client';

import { cn } from '@/lib/utils';

interface FuturisticQuestionMarkProps {
  className?: string;
  compact?: boolean;
}

/**
 * Futuristic "?" badge. Uses a custom glyph so we don't get the font's own
 * question-mark period plus a second decorative dot.
 */
export function FuturisticQuestionMark({
  className,
  compact = false,
}: FuturisticQuestionMarkProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        compact ? 'h-20 w-20' : 'h-28 w-28',
        className
      )}
      aria-label="Ask Romeo"
      role="img"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(20,184,166,0.35),transparent_62%)] blur-md" />
      <div className="absolute inset-[12%] rounded-full border border-teal-400/35 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-black/90 shadow-[0_0_28px_rgba(20,184,166,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl" />
      <div className="absolute inset-[22%] rounded-full border border-cyan-300/15 bg-[radial-gradient(circle_at_30%_25%,rgba(94,234,212,0.18),transparent_55%)]" />
      <svg
        viewBox="0 0 64 64"
        className={cn(
          'relative drop-shadow-[0_0_18px_rgba(45,212,191,0.55)]',
          compact ? 'h-10 w-10' : 'h-12 w-12'
        )}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ask-romeo-qmark" x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ccfbf1" />
            <stop offset="0.5" stopColor="#a5f3fc" />
            <stop offset="1" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
        {/* hook only */}
        <path
          d="M22 22.5c0-6.2 4.8-11 11-11s11 4.8 11 11c0 4.4-2.4 7.4-5.8 9.4-2.8 1.7-4.7 3.6-4.7 7.1v2.5"
          fill="none"
          stroke="url(#ask-romeo-qmark)"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* single dot */}
        <circle cx="32" cy="50.5" r="3.4" fill="url(#ask-romeo-qmark)" />
      </svg>
    </div>
  );
}
