'use client';

import { cn } from '@/lib/utils';

interface FuturisticQuestionMarkProps {
  className?: string;
  compact?: boolean;
}

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
      <span
        className={cn(
          'relative bg-gradient-to-b from-teal-100 via-cyan-200 to-teal-400 bg-clip-text font-semibold text-transparent drop-shadow-[0_0_18px_rgba(45,212,191,0.55)]',
          compact ? 'text-4xl' : 'text-5xl'
        )}
      >
        ?
      </span>
      <span className="absolute bottom-[28%] h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_10px_rgba(45,212,191,0.9)]" />
    </div>
  );
}
