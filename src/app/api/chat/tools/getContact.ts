import { tool } from 'ai';
import { z } from 'zod';

export const getContact = tool({
  description:
    'Show Romeo Timony contact links: email, GitHub, LinkedIn, and Instagram.',
  inputSchema: z.object({}),
  execute: async () => {
    return 'Here are Romeo Timony contact links. Use the card above to open GitHub, LinkedIn, Instagram, or email.';
  },
});
