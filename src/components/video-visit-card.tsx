'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useDisplayPreferences } from '@/lib/use-display-preferences';

interface VideoVisitCardProps {
  className?: string;
  label?: string;
  compactControls?: boolean;
}

export function VideoVisitCard({
  className,
  label,
  compactControls = false,
}: VideoVisitCardProps) {
  const { language } = useDisplayPreferences();
  const defaultLabel = language === 'ru' ? 'Видеовизитка' : 'Video visit card';
  const displayLabel = label || defaultLabel;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Video runs silently by default on autoplay loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsMuted(true);

    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    });
  }, []);

  // Toggle sound strictly on button or card click
  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      // Unmute from the exact current video position
      video.muted = false;
      setIsMuted(false);
      if (video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      // Mute/stop sound
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div
      className={cn(
        'group relative isolate aspect-square cursor-pointer overflow-hidden rounded-full border border-white/50 bg-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:shadow-[0_20px_60px_rgba(0,0,0,0.42)]',
        className
      )}
      onClick={() => toggleSound()}
      aria-label={displayLabel}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-center"
        src="/video-visit/romeo-videovizitka.mp4"
        poster="/video-visit/romeo-videovizitka-poster.jpg"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={() => setIsMuted(videoRef.current?.muted ?? true)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,rgba(45,212,191,0.22),transparent_38%),radial-gradient(circle_at_82%_78%,rgba(59,130,246,0.18),transparent_44%),linear-gradient(145deg,rgba(8,47,73,0.15),transparent_48%,rgba(15,23,42,0.25))]" />
      <div className="pointer-events-none absolute inset-0 border border-cyan-200/20 shadow-[inset_0_0_42px_rgba(45,212,191,0.14),0_0_32px_rgba(14,165,233,0.14)]" />

      <button
        type="button"
        onClick={toggleSound}
        className={cn(
          'absolute left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 font-semibold text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:outline-none',
          compactControls
            ? 'bottom-[7%] size-7 p-0'
            : 'bottom-[9%] gap-2 px-4 py-2 text-xs whitespace-nowrap'
        )}
        aria-label={
          !isMuted && isPlaying
            ? language === 'ru' ? 'Остановить звук' : 'Mute sound'
            : language === 'ru' ? 'Включить звук' : 'Play with sound'
        }
      >
        {!isMuted && isPlaying ? (
          <VolumeX
            className={compactControls ? 'size-3.5' : 'size-4'}
            aria-hidden="true"
          />
        ) : (
          <Volume2
            className={compactControls ? 'size-3.5' : 'size-4'}
            aria-hidden="true"
          />
        )}
        {!compactControls && (
          <span>
            {!isMuted && isPlaying
              ? language === 'ru' ? 'Остановить звук' : 'Mute'
              : language === 'ru' ? 'Включить звук' : 'Unmute'}
          </span>
        )}
      </button>
    </div>
  );
}
