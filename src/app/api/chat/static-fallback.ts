import { createUIMessageStream, createUIMessageStreamResponse } from 'ai';
import type { UIMessage } from 'ai';
import { romeoProfile, romeoProjects } from '@/lib/romeo-profile';

export function createStaticFallbackResponse({ messages, query, retrievedContext, reason = 'model_unavailable', metadata }: { messages: UIMessage[]; query: string; retrievedContext: string; reason?: 'model_unavailable' | 'rate_limit'; metadata?: unknown }) {
  const answer = buildStaticPortfolioAnswer({ query, retrievedContext, reason });
  const stream = createUIMessageStream<UIMessage>({
    originalMessages: messages,
    execute({ writer }) {
      writer.write({ type: 'start', messageMetadata: metadata });
      writer.write({ type: 'text-start', id: 'fallback-text' });
      writer.write({ type: 'text-delta', id: 'fallback-text', delta: answer });
      writer.write({ type: 'text-end', id: 'fallback-text' });
      writer.write({ type: 'finish', finishReason: 'stop', messageMetadata: addAnswerToMetadata(metadata, answer) });
    },
  });
  return createUIMessageStreamResponse({ stream });
}

function buildStaticPortfolioAnswer({ query, retrievedContext, reason }: { query: string; retrievedContext: string; reason: 'model_unavailable' | 'rate_limit' }) {
  const normalizedQuery = query.toLowerCase();
  const intro = reason === 'rate_limit' ? 'Сейчас много запросов. Отвечу на основе проверяемой информации из портфолио.' : 'Отвечу на основе проверяемой информации из портфолио.';
  if (matches(normalizedQuery, ['проект', 'project', 'portfolio', 'портфолио'])) {
    return [intro, '', 'Ключевые проекты:', '', ...romeoProjects.slice(0, 5).map((project) => `- ${project.title}: ${project.description}${project.links[0]?.url ? `\n  Ссылка: ${project.links[0].url}` : ''}`)].join('\n');
  }
  if (matches(normalizedQuery, ['контакт', 'связь', 'contact', 'collab', 'github'])) {
    return [intro, '', `- GitHub: ${romeoProfile.github}`, `- LinkedIn: ${romeoProfile.linkedin}`, `- Instagram: ${romeoProfile.instagram}`, `- Email: ${romeoProfile.email}`].join('\n');
  }
  if (matches(normalizedQuery, ['стек', 'технолог', 'stack', 'skill', 'ai'])) {
    return [intro, '', 'Romeo работает с React, Next.js, TypeScript, Tailwind CSS, Spring Boot, Node.js и PostgreSQL/MySQL. AI-инструменты применяются для ускорения анализа, реализации и документации с обязательной проверкой результата.', '', 'Ask Romeo объединяет Next.js, чат, Wiki, RAG и метаданные источников, чтобы показывать обоснованность ответов.'].join('\n');
  }
  if (matches(normalizedQuery, ['резюме', 'resume', 'cv'])) return 'Публичная ссылка на резюме пока готовится.';
  if (retrievedContext) return [intro, '', retrievedContext.replace(/^## Retrieved (Portfolio|Wiki) Context\n/, '')].join('\n');
  return [intro, '', `Ask Romeo — диалоговое портфолио ${romeoProfile.name}. Здесь можно спросить о проектах, QA-навыках, технологиях и сотрудничестве.`, '', `GitHub: ${romeoProfile.github}`].join('\n');
}

function matches(query: string, keywords: string[]) { return keywords.some((keyword) => query.includes(keyword)); }

function addAnswerToMetadata(metadata: unknown, answer: string) {
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) return metadata;
  return { ...metadata, answer };
}
