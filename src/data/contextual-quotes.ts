import type { ChatLanguage } from '@/lib/i18n/detect-language';

export type ContextualQuoteCategory =
  | 'ai_era'
  | 'ux'
  | 'learning'
  | 'product'
  | 'positioning'
  | 'contact'
  | 'management';

export type QuoteRole = 'qa' | 'pm';

export type ContextualQuote = {
  id: string;
  role: QuoteRole;
  category: ContextualQuoteCategory;
  roleLabel: Record<ChatLanguage, string>;
  text: Record<ChatLanguage, string>;
};

/**
 * Alternating quotes collection: QA Engineer <-> Project Manager.
 * Even indices (0, 2, 4...) are QA Engineer quotes.
 * Odd indices (1, 3, 5...) are Project Manager quotes.
 */
export const contextualQuotes: ContextualQuote[] = [
  // 0: QA
  {
    id: 'qa-1',
    role: 'qa',
    category: 'ux',
    roleLabel: {
      ru: 'QA Engineer',
      en: 'QA Engineer',
    },
    text: {
      ru: 'Качество — это обоснованная уверенность в том, что система выдержит реальные сценарии и нагрузки.',
      en: 'Quality is justified confidence that the system will withstand real-world scenarios and load.',
    },
  },
  // 1: PM
  {
    id: 'pm-1',
    role: 'pm',
    category: 'management',
    roleLabel: {
      ru: 'Project Manager',
      en: 'Project Manager',
    },
    text: {
      ru: 'Управление проектом — это умение превращать неопределенность в четкий план, а риски — в решения.',
      en: 'Project management is turning uncertainty into a clear plan and risks into timely decisions.',
    },
  },
  // 2: QA
  {
    id: 'qa-2',
    role: 'qa',
    category: 'positioning',
    roleLabel: {
      ru: 'QA Engineer',
      en: 'QA Engineer',
    },
    text: {
      ru: 'Зрелость QA измеряется не числом багов, а надежностью и спокойствием команды перед релизом.',
      en: 'QA maturity is measured not by bug count, but by team confidence and release stability.',
    },
  },
  // 3: PM
  {
    id: 'pm-2',
    role: 'pm',
    category: 'product',
    roleLabel: {
      ru: 'Project Manager',
      en: 'Project Manager',
    },
    text: {
      ru: 'Задача PM — не закрывать тикеты, а создавать продукт, решающий реальные задачи бизнеса.',
      en: 'A PM’s mission is not closing tickets, but delivering real value to business and users.',
    },
  },
  // 4: QA
  {
    id: 'qa-3',
    role: 'qa',
    category: 'ux',
    roleLabel: {
      ru: 'QA Engineer',
      en: 'QA Engineer',
    },
    text: {
      ru: 'Предотвратить дефект на этапе требований в разы дешевле, чем героически ловить его перед релизом.',
      en: 'Preventing bugs during requirements review is far cheaper than catching them at release.',
    },
  },
  // 5: PM
  {
    id: 'pm-3',
    role: 'pm',
    category: 'contact',
    roleLabel: {
      ru: 'Project Manager',
      en: 'Project Manager',
    },
    text: {
      ru: 'Сильная команда держится на прозрачных ожиданиях, доверии и общем понимании смысла задач.',
      en: 'A strong team thrives on transparent expectations, trust, and shared purpose in every task.',
    },
  },
  // 6: QA
  {
    id: 'qa-4',
    role: 'qa',
    category: 'learning',
    roleLabel: {
      ru: 'QA Engineer',
      en: 'QA Engineer',
    },
    text: {
      ru: 'Автоматизация ценна тогда, когда защищает бизнес-критичные пути, а не гонится за цифрами покрытия.',
      en: 'Test automation matters when it guards critical user paths, not when chasing vanity metrics.',
    },
  },
  // 7: PM
  {
    id: 'pm-4',
    role: 'pm',
    category: 'management',
    roleLabel: {
      ru: 'Project Manager',
      en: 'Project Manager',
    },
    text: {
      ru: 'Успешный релиз — это баланс между скоростью Time-to-Market, надежностью и ожиданиями бизнеса.',
      en: 'A great release balances Time-to-Market speed, architectural resilience, and clear expectations.',
    },
  },
  // 8: QA
  {
    id: 'qa-5',
    role: 'qa',
    category: 'ai_era',
    roleLabel: {
      ru: 'QA Engineer',
      en: 'QA Engineer',
    },
    text: {
      ru: 'Сильный QA видит систему целиком: от архитектуры API до комфорта конечного пользователя.',
      en: 'Strong QA sees the full picture: from backend architecture to the end-user experience.',
    },
  },
  // 9: PM
  {
    id: 'pm-5',
    role: 'pm',
    category: 'product',
    roleLabel: {
      ru: 'Project Manager',
      en: 'Project Manager',
    },
    text: {
      ru: 'Уложиться в сроки помогает не спешка, а точная декомпозиция и фокус на главном для бизнеса.',
      en: 'Hitting deadlines is driven by early task decomposition and ruthless focus on what matters.',
    },
  },
  // 10: QA
  {
    id: 'qa-6',
    role: 'qa',
    category: 'positioning',
    roleLabel: {
      ru: 'QA Engineer',
      en: 'QA Engineer',
    },
    text: {
      ru: 'Качество — это ответственность всей системы и команды, а не отдельный шаг перед продакшном.',
      en: 'Quality is a shared team discipline across the entire SDLC, not a final gate before prod.',
    },
  },
  // 11: PM
  {
    id: 'pm-6',
    role: 'pm',
    category: 'contact',
    roleLabel: {
      ru: 'Project Manager',
      en: 'Project Manager',
    },
    text: {
      ru: 'Сильное сотрудничество строится на ясности целей, контроле рисков и общем стандарте качества.',
      en: 'Great collaboration stems from clear goals, proactive risk control, and high quality standards.',
    },
  },
];

export const qaQuotes = contextualQuotes.filter((q) => q.role === 'qa');
export const pmQuotes = contextualQuotes.filter((q) => q.role === 'pm');

export function getAlternatingQuote(index: number): ContextualQuote {
  const normalizedIndex =
    ((index % contextualQuotes.length) + contextualQuotes.length) %
    contextualQuotes.length;
  return contextualQuotes[normalizedIndex];
}

export function formatQuoteWithMarks(
  text: string,
  language: ChatLanguage = 'ru'
): string {
  const trimmed = text.replace(/^[«"“\s]+|[»"”\s]+$/g, '').trim();
  return language === 'ru' ? `«${trimmed}»` : `“${trimmed}”`;
}

export function getContextualQuote({
  category,
  role,
  language,
  seed,
  avoidText,
  index,
}: {
  category?: ContextualQuoteCategory;
  role?: QuoteRole;
  language: ChatLanguage;
  seed?: string;
  avoidText?: string;
  index?: number;
}): string {
  let pool = contextualQuotes;

  if (role) {
    pool = pool.filter((quote) => quote.role === role);
  }

  if (category) {
    const categoryMatches = pool.filter((quote) => quote.category === category);
    if (categoryMatches.length > 0) {
      pool = categoryMatches;
    }
  }

  const candidates = pool.length > 0 ? pool : contextualQuotes;
  const unusedCandidates = avoidText
    ? candidates.filter((quote) => !avoidText.includes(quote.text[language]))
    : candidates;
  const activeCandidates =
    unusedCandidates.length > 0 ? unusedCandidates : candidates;

  if (typeof index === 'number') {
    const safeIndex =
      ((index % activeCandidates.length) + activeCandidates.length) %
      activeCandidates.length;
    return activeCandidates[safeIndex].text[language];
  }

  const hashSeed = seed || String(Date.now());
  const calculatedIndex = stableIndex(hashSeed, activeCandidates.length);

  return activeCandidates[calculatedIndex].text[language];
}

function stableIndex(value: string, modulo: number): number {
  if (modulo <= 0) return 0;
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash % modulo;
}
