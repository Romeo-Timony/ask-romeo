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
      ru: 'Качество — это не отсутствие дефектов, а обоснованная уверенность в том, что система выдержит реальные сценарии, изменения и человеческие ошибки.',
      en: 'Quality is not the absence of defects, but justified confidence that the system can withstand real-world scenarios, change, and human error.',
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
      ru: 'Управление проектом — это искусство превращать неопределенность в прозрачный план, а риски — в управляемые и своевременные решения.',
      en: 'Project management is the art of turning uncertainty into a clear plan and risks into manageable, timely decisions.',
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
      ru: 'Зрелость QA определяется не количеством найденных багов, а способностью превратить требования, риски и данные в уверенность перед релизом.',
      en: 'QA maturity is measured not by the number of bugs found, but by the ability to turn requirements, risks, and data into release confidence.',
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
      ru: 'Главная задача PM — не просто закрывать задачи в спринте, а гарантировать, что команда создает продукт, решающий реальную проблему бизнеса и пользователей.',
      en: 'A PM’s primary goal is not just closing sprint tasks, but ensuring the team delivers a product that truly solves real business and user problems.',
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
      ru: 'Предотвратить дефект на этапе анализа требований в разы дешевле и ценнее для бизнеса, чем героически ловить его перед самым релизом.',
      en: 'Preventing a defect during requirements analysis is far cheaper and more valuable to the business than heroically catching it right before release.',
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
      ru: 'Сильная команда держится на прозрачных ожиданиях, доверии и общем контексте, где каждый понимает смысл каждой задачи.',
      en: 'A strong team thrives on transparent expectations, trust, and shared context, where everyone understands the purpose behind every task.',
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
      ru: 'Автоматизация тестирования эффективна тогда, когда она защищает бизнес-критичные пути и ускоряет поставку, а не пишется ради красивых цифр покрытия.',
      en: 'Test automation is truly effective when it protects business-critical paths and accelerates delivery, rather than chasing vanity coverage numbers.',
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
      ru: 'Успешный релиз — это точный баланс между скоростью Time-to-Market, надежностью архитектуры и управляемостью ожиданий стейкхолдеров.',
      en: 'A successful release is a precise balance between Time-to-Market speed, architectural stability, and stakeholder expectation management.',
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
      ru: 'Сильный QA видит систему целиком: от архитектуры API и устойчивости сервисов до эмоционального комфорта конечного пользователя.',
      en: 'A strong QA sees the entire system: from API architecture and service resilience to the end user’s emotional comfort.',
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
      ru: 'Лучший способ уложиться в сроки — не срезать углы в качестве, а вовремя декомпозировать задачи, отсекать лишнее и фокусироваться на главном.',
      en: 'The best way to hit deadlines is not cutting corners on quality, but early task decomposition, eliminating waste, and focusing on what matters.',
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
      ru: 'Сильный специалист видит качество как ответственность всей системы и команды, а не отдельный этап перед отправкой в продакшн.',
      en: 'A strong specialist treats quality as a system-wide and team responsibility, not a separate checkpoint right before production.',
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
      ru: 'Сильное сотрудничество начинается с ясности: какую задачу мы решаем, какие риски критичны и что считается качественным результатом.',
      en: 'Strong collaboration starts with clarity: the problem we are solving, the critical risks, and what counts as a quality outcome.',
    },
  },
];

export const qaQuotes = contextualQuotes.filter((q) => q.role === 'qa');
export const pmQuotes = contextualQuotes.filter((q) => q.role === 'pm');

export function getAlternatingQuote(
  index: number,
  language: ChatLanguage = 'ru'
): ContextualQuote {
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
