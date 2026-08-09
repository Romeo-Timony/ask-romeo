import { tool } from 'ai';
import { z } from 'zod';

export const getSports = tool({
  description:
    'Shows Romeo visual portfolio archive and reusable profile/project images.',
  inputSchema: z.object({}),
  execute: async () => {
    return 'Here is Romeo visual archive: animated hover profile frames, 2025 portfolio captures, and placeholders for the latest web project screenshots.';
  },
});
