export type ChatLanguage = 'ru' | 'en';

/**
 * Supported languages: Russian ('ru') and English ('en').
 */
export function detectLanguage(
  input: string,
  preferredLanguage?: ChatLanguage | null
): ChatLanguage {
  const cyrillicChars =
    input.match(/[\u0410-\u044F\u0401\u0451]/g)?.length ?? 0;
  if (cyrillicChars >= 1) return 'ru';

  const koreanChars = input.match(/[\uAC00-\uD7A3]/g)?.length ?? 0;
  if (koreanChars >= 1) return 'ru';

  const latinChars = input.match(/[a-zA-Z]/g)?.length ?? 0;
  if (latinChars >= 1) return 'en';

  return preferredLanguage ?? 'ru';
}

export function parsePreferredLanguage(value: unknown): ChatLanguage | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  if (
    normalized === 'ru' ||
    normalized === 'rus' ||
    normalized === 'russian'
  ) {
    return 'ru';
  }
  if (
    normalized === 'en' ||
    normalized === 'eng' ||
    normalized === 'english'
  ) {
    return 'en';
  }
  return null;
}
