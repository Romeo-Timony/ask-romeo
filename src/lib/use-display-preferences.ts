'use client';

import {
  detectBrowserLanguage,
  detectSystemTheme,
  normalizeLanguage,
  parsePreferencePath,
  parsePreferenceSearchParams,
  readStoredDisplayPreferences,
  toUrlLanguage,
  type DisplayLanguage,
  type DisplayTheme,
  type PreferenceTokens,
  writeStoredDisplayPreferences,
} from '@/lib/preferences';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useDisplayPreferences() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [systemTheme, setSystemTheme] = useState<DisplayTheme>('light');
  const [browserLanguage, setBrowserLanguage] = useState<DisplayLanguage>('ru');
  const [storedPreferences, setStoredPreferences] = useState<PreferenceTokens>(
    {}
  );

  useEffect(() => {
    setSystemTheme(detectSystemTheme());
    setBrowserLanguage(detectBrowserLanguage());
    setStoredPreferences(readStoredDisplayPreferences());

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onThemeChange = () => setSystemTheme(detectSystemTheme());

    media.addEventListener('change', onThemeChange);
    return () => media.removeEventListener('change', onThemeChange);
  }, []);

  const explicitPreferences = useMemo(() => {
    const fromSearch = parsePreferenceSearchParams(searchParams);
    const fromPath = parsePreferencePath(pathname);

    return {
      theme: fromSearch.theme ?? fromPath.theme,
      lang: fromSearch.lang ?? fromPath.lang,
    };
  }, [pathname, searchParams]);

  const theme =
    explicitPreferences.theme ?? storedPreferences.theme ?? systemTheme;
  const language =
    explicitPreferences.lang ?? storedPreferences.lang ?? browserLanguage;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language === 'ru' ? 'ru' : 'en';
  }, [theme, language]);

  // Canonical public URL uses lang=rus / lang=eng.
  useEffect(() => {
    const rawLang = searchParams.get('lang');
    if (!rawLang) return;

    const normalized = normalizeLanguage(rawLang);
    if (!normalized) return;

    const canonical = toUrlLanguage(normalized);
    if (rawLang.toLowerCase() === canonical) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', canonical);
    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  const updateUrlPreference = useCallback(
    (key: 'theme' | 'lang', value: DisplayTheme | DisplayLanguage) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(
        key,
        key === 'lang' ? toUrlLanguage(value as DisplayLanguage) : value
      );

      const nextUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const setThemePreference = useCallback(
    (nextTheme: DisplayTheme) => {
      setStoredPreferences((currentPreferences) => {
        const nextPreferences = {
          ...currentPreferences,
          theme: nextTheme,
        };

        writeStoredDisplayPreferences(nextPreferences);
        return nextPreferences;
      });
      updateUrlPreference('theme', nextTheme);
    },
    [updateUrlPreference]
  );

  const setLanguagePreference = useCallback(
    (nextLanguage: DisplayLanguage) => {
      setStoredPreferences((currentPreferences) => {
        const nextPreferences = {
          ...currentPreferences,
          lang: nextLanguage,
        };

        writeStoredDisplayPreferences(nextPreferences);
        return nextPreferences;
      });
      updateUrlPreference('lang', nextLanguage);
    },
    [updateUrlPreference]
  );

  return {
    theme,
    language,
    explicitTheme: explicitPreferences.theme,
    explicitLanguage: explicitPreferences.lang,
    setThemePreference,
    setLanguagePreference,
  };
}
