import { tool } from "ai";
import { z } from "zod";

export const getProjects = tool({
  description:
    'Show Romeo Timony portfolio projects, including Ask Romeo 2026 and Portfoli-Oh! 2025.',
  inputSchema: z.object({}),
  execute: async () => {
    return "Here are Romeo's portfolio projects. Ask Romeo 2026 is the current AI-connected portfolio, and Portfoli-Oh! 2025 is the frontend bootcamp portfolio.";
  },
});
