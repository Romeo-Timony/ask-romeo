import { tool } from 'ai';
import { z } from 'zod';

export const getSkills = tool({
  description:
    'Show Romeo Timony skills and stack.',
  inputSchema: z.object({}),
  execute: async () => {
    return "You can see Romeo's frontend, fullstack, AI-connected interface, design, and documentation skills above.";
  },
});
