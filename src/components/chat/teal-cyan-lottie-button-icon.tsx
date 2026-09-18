'use client';

import { Square } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type TealCyanLottieButtonIconProps = {
  isLoading?: boolean;
  size?: number;
};

export function TealCyanLottieButtonIcon({
  isLoading = false,
  size = 42,
}: TealCyanLottieButtonIconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [LottiePlayer, setLottiePlayer] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [iconData, setIconData] = useState<any>(null);

  useEffect(() => {
    let active = true;

    // Load Lordicon and the 276KB animation JSON asynchronously
    // so it never blocks FCP, LCP, or main-thread hydration
    Promise.all([
      import('@lordicon/react').then((m) => m.Player),
      import('../../../public/lottie_Tealcyan.json').then((m) => m.default || m),
    ]).then(([PlayerComp, icon]) => {
      if (active) {
        setLottiePlayer(() => PlayerComp);
        setIconData(icon);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, [isLoading]);

  return (
    <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
      {LottiePlayer && iconData ? (
        <LottiePlayer
          ref={playerRef}
          icon={iconData}
          size={size}
          onReady={() => playerRef.current?.playFromBeginning()}
          onComplete={() => playerRef.current?.playFromBeginning()}
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          aria-hidden="true"
        >
          <circle cx="21" cy="21" r="18" fill="url(#tealCyanGrad)" />
          <path
            d="M21 14L27 21M27 21L21 28M27 21H15"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="tealCyanGrad" x1="6" y1="6" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#14b8a6" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      )}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-[1px]">
          <Square className="h-4 w-4 fill-white text-white drop-shadow-sm" />
        </span>
      )}
    </span>
  );
}
