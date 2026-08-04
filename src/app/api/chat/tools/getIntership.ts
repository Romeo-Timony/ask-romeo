import { tool } from 'ai';
import { z } from 'zod';
import { romeoProfile } from '@/lib/romeo-profile';

export const getInternship = tool({
  description:
    'Gives a summary of Romeo Timony career direction, desired roles, and contact links. Use this when the user asks about opportunities, career fit, or hiring context.',
  inputSchema: z.object({}),
  execute: async () => {
    return `Romeo Timony is positioning as an AI-connected Fullstack Developer.

- Desired roles: fullstack developer, AI application developer, and AI service planning/development.
- Current focus: Spring Boot, React, backend/data processing, generative AI application development, and portfolio knowledge systems.
- Differentiator: combines GfK Korea data consulting, Romeo Salon founder/operator experience, frontend renewal work, and AI coding tool practice.
- Location: ${romeoProfile.residence}.

Contact:
- Email: ${romeoProfile.email}
- GitHub: ${romeoProfile.github}
- LinkedIn: ${romeoProfile.linkedin}
- Instagram: ${romeoProfile.instagram}`;
  },
});
