import type { ChatLanguage } from '@/lib/i18n/detect-language';

export type ContextualQuoteCategory =
  | 'ai_era'
  | 'ux'
  | 'learning'
  | 'product'
  | 'positioning'
  | 'contact';

export type ContextualQuote = {
  text: Record<ChatLanguage, string>;
  category: ContextualQuoteCategory;
};

/**
 * The inherited `ko` locale key is retained for compatibility, but it stores
 * Russian copy. There is no Korean content in this runtime collection.
 */
export const contextualQuotes: ContextualQuote[] = [
  {
    text: {
      ru: 'Сильное сотрудничество начинается с ясности: какую задачу решает команда, какие риски критичны и что считается качественным результатом.',
      en: 'Strong collaboration starts with clarity: the problem the team is solving, the risks that matter, and what a quality outcome means.',
    },
    category: 'contact',
  },
  {
    text: {
      ru: 'AI ускоряет выполнение задач, но ответственность за качество решения остаётся у человека.',
      en: 'AI accelerates execution, but responsibility for solution quality remains human.',
    },
    category: 'ai_era',
  },
  {
    text: {
      ru: 'Качество — это обоснованная уверенность в том, что система выдержит реальные сценарии, изменения и человеческие ошибки.',
      en: 'Quality is justified confidence that a system can withstand real scenarios, change, and human error.',
    },
    category: 'ux',
  },
  {
    text: {
      ru: 'Навык подтверждается не названием технологии, а результатом её применения в реальной задаче.',
      en: 'A skill is proven not by a technology name, but by the result of applying it to a real problem.',
    },
    category: 'learning',
  },
  {
    text: {
      ru: 'Хороший продукт начинается с правильного вопроса и проверяемых критериев результата.',
      en: 'A good product starts with the right question and verifiable outcome criteria.',
    },
    category: 'product',
  },
  {
    text: {
      ru: 'Сильный специалист видит качество как ответственность всей системы, а не отдельный этап перед релизом.',
      en: 'A strong specialist treats quality as a system-wide responsibility, not a separate pre-release stage.',
    },
    category: 'positioning',
  },
];

export function getContextualQuote({
  category,
  language,
  seed,
  avoidText,
}: {
  category?: ContextualQuoteCategory;
  language: ChatLanguage;
  seed: string;
  avoidText?: string;
}) {
  const pool = category
    ? contextualQuotes.filter((quote) => quote.category === category)
    : contextualQuotes;
  const candidates = pool.length > 0 ? pool : contextualQuotes;
  const unusedCandidates = avoidText
    ? candidates.filter((quote) => !avoidText.includes(quote.text[language]))
    : candidates;
  const activeCandidates =
    unusedCandidates.length > 0 ? unusedCandidates : candidates;

  return activeCandidates[stableIndex(seed, activeCandidates.length)].text[
    language
  ];
}

function stableIndex(value: string, modulo: number) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash % modulo;
}
