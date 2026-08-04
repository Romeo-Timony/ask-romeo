import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'Return a concise personal introduction of Romeo Timony. Use it when the user asks who Romeo is.',
  inputSchema: z.object({}),
  execute: async () => {
    return {
      presentation:
        'Romeo Timony is an AI-connected Fullstack Developer building Ask Romeo, a 2026 conversational portfolio that connects frontend experience, backend logic, and LLM-powered answers.',
    };
  },
});
