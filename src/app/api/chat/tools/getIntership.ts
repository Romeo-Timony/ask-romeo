import { tool } from 'ai';
import { z } from 'zod';
import { romeoProfile } from '@/lib/romeo-profile';

export const getInternship = tool({
  description:
    'Gives a summary of Romeo Timony career direction, desired roles, and contact links. Use this when the user asks about opportunities, career fit, or hiring context.',
  inputSchema: z.object({}),
  execute: async () => {
    return `Romeo Timony is positioning as a Senior QA Engineer and Fullstack QA/AI engineer.

- Desired roles: Senior QA Engineer, QA Team Lead, Fullstack QA/AI engineer.
- Current focus: Web/Mobile/API testing, test automation (Python, Appium, Pytest), RAG systems, and AI-assisted quality engineering.
- Differentiator: Combines over 5 years of IT QA experience (Sminex, Messer Group, DPD, KODE) with deep QA process optimization, test automation strategy, and hands-on integration of LLMs/AI into the QA workflow.
- Location: ${romeoProfile.locationEn || 'Remote'}.

Contact:
- Email: ${romeoProfile.email}
- GitHub: ${romeoProfile.github}
- LinkedIn: ${romeoProfile.linkedin}
- Telegram: ${romeoProfile.telegram}`;
  },
});
