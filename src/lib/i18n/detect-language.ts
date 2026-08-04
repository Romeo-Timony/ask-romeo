export type ChatLanguage = 'ko' | 'en';

/**
 * Russian is intentionally mapped to the internal `ko` content branch.
 * The project inherited two content branches from AskOosu; `ko` now carries
 * the localized Russian copy while `en` remains English.
 */
export function detectLanguage(
  input: string,
  preferredLanguage?: ChatLanguage | null
): ChatLanguage {
  const koreanChars = input.match(/[\uAC00-\uD7A3]/g)?.length ?? 0;
  const cyrillicChars =
    input.match(/[\u0410-\u044F\u0401\u0451]/g)?.length ?? 0;
  const latinChars = input.match(/[a-zA-Z]/g)?.length ?? 0;

  if (koreanChars >= 2 || cyrillicChars >= 2) return 'ko';
  if (latinChars > koreanChars && latinChars > cyrillicChars) return 'en';

  return preferredLanguage ?? 'ko';
}

export function parsePreferredLanguage(value: unknown): ChatLanguage | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  if (
    normalized === 'ko' ||
    normalized === 'ru' ||
    normalized === 'rus' ||
    normalized === 'russian'
  ) {
    return 'ko';
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
