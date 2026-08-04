export type DisplayTheme = 'light' | 'dark';
export type DisplayLanguage = 'ru' | 'en';

export type PreferenceTokens = {
  theme?: DisplayTheme;
  lang?: DisplayLanguage;
};

export const DISPLAY_PREFERENCES_STORAGE_KEY = 'ask-romeo-display-preferences';

const themeTokens = new Set(['dark', 'light']);

export function normalizeTheme(
  value?: string | null
): DisplayTheme | undefined {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  return themeTokens.has(normalized) ? (normalized as DisplayTheme) : undefined;
}

export function normalizeLanguage(
  value?: string | null
): DisplayLanguage | undefined {
  if (!value) return undefined;

  const normalized = value.toLowerCase();
  // Internal locale keys stay 'ko'/'en' for FAQ/i18n compatibility.
  // Public URL params: lang=rus (Russian), lang=eng (English).
  if (['ko', 'kr', 'korean', 'ru', 'rus', 'russian'].includes(normalized))
    return 'ru';
  if (['en', 'eng', 'english'].includes(normalized)) return 'en';

  return undefined;
}

/** Serialize language for public URLs (`lang=rus` / `lang=eng`). */
export function toUrlLanguage(language: DisplayLanguage): string {
  return language === 'ru' ? 'rus' : 'eng';
}

export function parsePreferenceTokens(tokens: string[]): PreferenceTokens {
  return tokens.reduce<PreferenceTokens>((result, rawToken) => {
    const decodedToken = decodeURIComponent(rawToken).toLowerCase();
    const pieces = decodedToken
      .split(/[\s_-]+/)
      .map((piece) => piece.trim())
      .filter(Boolean);

    pieces.forEach((piece) => {
      const theme = normalizeTheme(piece);
      const lang = normalizeLanguage(piece);

      if (theme) result.theme = theme;
      if (lang) result.lang = lang;
    });

    return result;
  }, {});
}

export function parsePreferenceSearchParams(searchParams: {
  get(name: string): string | null;
}): PreferenceTokens {
  return {
    theme:
      normalizeTheme(searchParams.get('theme')) ??
      normalizeTheme(searchParams.get('mode')),
    lang:
      normalizeLanguage(searchParams.get('lang')) ??
      normalizeLanguage(searchParams.get('locale')),
  };
}

export function parsePreferencePath(pathname: string): PreferenceTokens {
  return parsePreferenceTokens(pathname.split('/').filter(Boolean));
}

export function detectBrowserLanguage(): DisplayLanguage {
  if (typeof navigator === 'undefined') return 'ru';

  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  if (languages.some((language) => language.toLowerCase().startsWith('en'))) {
    return 'en';
  }

  // Default to Russian UI (stored as internal 'ko' locale key).
  return 'ru';
}

export function detectSystemTheme(): DisplayTheme {
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function readStoredDisplayPreferences(): PreferenceTokens {
  if (typeof window === 'undefined') return {};

  try {
    const rawValue = window.localStorage.getItem(
      DISPLAY_PREFERENCES_STORAGE_KEY
    );
    if (!rawValue) return {};

    const parsedValue = JSON.parse(rawValue) as PreferenceTokens;

    return {
      theme: normalizeTheme(parsedValue.theme),
      lang: normalizeLanguage(parsedValue.lang),
    };
  } catch {
    return {};
  }
}

export function writeStoredDisplayPreferences(preferences: PreferenceTokens) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(
    DISPLAY_PREFERENCES_STORAGE_KEY,
    JSON.stringify(preferences)
  );
}
