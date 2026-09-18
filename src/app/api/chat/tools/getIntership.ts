import { tool } from 'ai';
import { z } from 'zod';
import { romeoProfile } from '@/lib/romeo-profile';

export const getInternship = tool({
  description:
    'Gives a summary of Romeo Timony career direction, desired roles, and contact links. Use this when the user asks about opportunities, career fit, or hiring context.',
  inputSchema: z.object({}),
  execute: async () => {
    return `Romeo Timony is positioning as a Technical Project Manager / Delivery Manager & Fullstack QA Engineer (with AI/Prompt Engineering expertise).

- Desired roles: Technical Project Manager, Delivery Manager, QA Lead / Fullstack QA Engineer.
- Dual-track focus:
  1. Project Management: 20+ years of overall management, 5+ years in IT, leading cross-functional teams (up to 25 people), budgeting (Capex/Opex, T&M, Fixed Price), WBS/CPM, Agile/Scrum/Kanban, DoR/DoD, and delivering Web/Mobile/B2B platforms (Messer, KODE, Quiksilver).
  2. Quality Engineering & Automation: Web/Mobile/API testing, test automation (Python, Playwright, Appium, Pytest), Shift-Left validation, CI/CD pipelines, and AI-assisted QA workflows.
- Differentiator: Eliminates technical "blind spots" as a PM by speaking the engineering language, while bringing business and release-gate discipline to QA.
- Location: ${romeoProfile.locationEn || 'Remote'}.

Contact:
- Email: ${romeoProfile.email}
- GitHub: ${romeoProfile.github}
- LinkedIn: ${romeoProfile.linkedin}
- Telegram: ${romeoProfile.telegram}`;
  },
});
