'use client';

import { useRef, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';

import { cn } from '@/lib/utils';

interface VideoVisitCardProps {
  className?: string;
  label?: string;
  compactControls?: boolean;
}

export function VideoVisitCard({
  className,
  label = 'Video visit card',
  compactControls = false,
}: VideoVisitCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);

      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  return (
    <div
      className={cn(
        'group relative isolate aspect-square overflow-hidden rounded-full border border-white/50 bg-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:shadow-[0_20px_60px_rgba(0,0,0,0.42)]',
        className
      )}
      aria-label={label}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-center brightness-[1.04] contrast-[1.06] saturate-[1.08]"
        src="/video-visit/romeo-videovizitka.mp4"
        poster="/video-visit/romeo-videovizitka-poster.jpg"
        autoPlay
        muted
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={() => setIsMuted(videoRef.current?.muted ?? true)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,rgba(45,212,191,0.34),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(59,130,246,0.28),transparent_42%),linear-gradient(145deg,rgba(8,47,73,0.22),transparent_48%,rgba(15,23,42,0.38))] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 border border-cyan-200/20 shadow-[inset_0_0_42px_rgba(45,212,191,0.15),0_0_32px_rgba(14,165,233,0.16)]" />

      <button
        type="button"
        onClick={togglePlayback}
        className={cn(
          'absolute left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 font-semibold text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:outline-none',
          compactControls
            ? 'bottom-[7%] size-7 p-0'
            : 'bottom-[9%] gap-2 px-4 py-2 text-xs whitespace-nowrap'
        )}
        aria-label={
          isMuted
            ? 'Включить звук видеовизитки'
            : isPlaying
            ? 'Приостановить видеовизитку'
            : 'Воспроизвести видеовизитку'
        }
      >
        {isMuted ? (
          <Volume2
            className={compactControls ? 'size-3.5' : 'size-4'}
            aria-hidden="true"
          />
        ) : isPlaying ? (
          <Pause
            className={cn('fill-current', compactControls ? 'size-3.5' : 'size-4')}
            aria-hidden="true"
          />
        ) : (
          <Play
            className={cn('fill-current', compactControls ? 'size-3.5' : 'size-4')}
            aria-hidden="true"
          />
        )}
        {!compactControls && (
          <span>{isMuted ? 'Включить звук' : isPlaying ? 'Пауза' : label}</span>
        )}
      </button>
    </div>
  );
}
