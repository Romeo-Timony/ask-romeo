import { tool } from "ai";
import { z } from "zod";

export const getProjects = tool({
  description:
    'Show Romeo Timony portfolio projects across Project Management and Quality Engineering: Sminex App, Messer B2B & ATMOX, DPD, KODE (Mozen, Dizli), Nord Domos, Quiksilver, and Ask Romeo.',
  inputSchema: z.object({}),
  execute: async () => {
    return "Here are Romeo's portfolio projects across PM and QA:\n- Project & Product Management: Messer Group (Product Manager / IT PM: B2B portal, Sana Commerce, IoT E-Monitoring, ATMOX rebranding), KODE (IT Project Administrator: Mozen FinTech, Dizli Kuwait logistics, Best.Petersburg), Nord Domos (Project Manager: turnkey eco-hotel cluster and luxury estates >200M RUB), Quiksilver (Brand & Product Manager: early e-commerce sneaker drops platform), Elme Messer Gaas (Head of Prospective Projects: 30+ industrial EPC projects).\n- Quality Engineering & QA: Sminex Tech (Lead QA Engineer: Super App resident ecosystem, 700 Appium tests, Playwright, Kafka, API Gateway), DPD Russia (QA Engineer: logistics platform, SOAP/WSDL, RabbitMQ DLQ, Oracle DB), Messer Group (QA Engineer: Pairwise PICT test design, IoT telemetry).\n- AI & Personal Projects: Ask Romeo (Conversational RAG digital twin), QA Assistant Telegram, Onboard, incoming_lids, and AI-assisted Test Design pipelines.";
  },
});
