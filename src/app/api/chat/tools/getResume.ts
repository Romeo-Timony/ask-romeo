import { tool } from 'ai';
import { z } from 'zod';

export const getResume = tool({
  description:
    'Show Romeo Timony resume placeholders for future Russian and English Notion resume links.',
  inputSchema: z.object({}),
  execute: async () => {
    return 'Resume links are not connected yet. Russian and English Notion resume slots are prepared for a later update.';
  },
});
