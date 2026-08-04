'use client';
import { useEffect } from 'react';

import fluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    try {
      fluidCursor();
    } catch (error) {
      console.warn('Fluid cursor disabled:', error);
    }
  }, []);

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
