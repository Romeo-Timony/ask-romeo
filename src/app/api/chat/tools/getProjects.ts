import { tool } from "ai";
import { z } from "zod";

export const getProjects = tool({
  description:
    'Show Romeo Timony portfolio projects: Sminex Comfort, Elme Messer, DPD, Ask Romeo, and others.',
  inputSchema: z.object({}),
  execute: async () => {
    return "Here are Romeo's portfolio projects: Sminex Comfort (Senior QA Engineer, mobile & web resident platform), Elme Messer (QA Engineer, enterprise supplier platform), DPD (QA Engineer, logistics platform), and personal AI/QA projects including Ask Romeo, QA Assistant Telegram, Onboard, incoming_lids, and pikabaka.";
  },
});
