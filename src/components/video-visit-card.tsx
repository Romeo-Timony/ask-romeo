'use client';

import { cn } from '@/lib/utils';

interface VideoVisitCardProps {
  className?: string;
  label?: string;
}

/**
 * Centerpiece video business-card slot.
 * Drop an mp4/webm into /public/video-visit and point the sources here later.
 */
export function VideoVisitCard({
  className,
  label = 'Video visit card',
}: VideoVisitCardProps) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-3xl border border-white/50 bg-gradient-to-b from-slate-100/90 to-slate-200/70 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:from-white/[0.08] dark:to-white/[0.02] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]',
        className
      )}
      aria-label={label}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(24,139,117,0.22),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(36,107,254,0.18),transparent_50%)]" />
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/50 text-sm font-semibold tracking-wide text-slate-700 backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-slate-100">
          RT
        </div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {label}
        </p>
        <p className="max-w-[16rem] text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Placeholder — video will appear here soon
        </p>
      </div>
    </div>
  );
}
