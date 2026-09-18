'use client';
import { useEffect, useState } from 'react';

const FluidCursor = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fluid cursor only makes sense on desktop with a mouse cursor (fine pointer)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isSmallScreen = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || isSmallScreen || prefersReducedMotion) {
      return;
    }

    // Schedule initialization after the main thread is idle to never block FCP/LCP/TBT
    const scheduleInit =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 1200);

    const handle = scheduleInit(async () => {
      try {
        const { default: fluidCursor } = await import('@/hooks/use-FluidCursor');
        setActive(true);
        // Allow canvas element to mount in DOM before starting WebGL
        window.requestAnimationFrame(() => {
          try {
            fluidCursor();
          } catch (error) {
            console.warn('Fluid cursor initialization warning:', error);
          }
        });
      } catch (error) {
        console.warn('Fluid cursor disabled:', error);
      }
    });

    return () => {
      if (typeof window.cancelIdleCallback === 'function' && typeof handle === 'number') {
        window.cancelIdleCallback(handle);
      }
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5]"
      aria-hidden="true"
    >
      <canvas id="fluid" className="pointer-events-none h-screen w-screen" />
    </div>
  );
};

export default FluidCursor;
