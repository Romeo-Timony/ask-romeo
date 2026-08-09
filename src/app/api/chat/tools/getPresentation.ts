import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'Return a concise personal introduction of Romeo Timony. Use it when the user asks who Romeo is.',
  inputSchema: z.object({}),
  execute: async () => {
    return {
      presentation:
        'Romeo Timony is a Fullstack QA/AI engineer specializing in software quality, test automation, and integrating AI into development workflows. He has built the Ask Romeo conversational portfolio to showcase his QA engineering experience and AI orchestration skills.',
    };
  },
});
