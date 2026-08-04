import { PreferenceSync } from '@/components/preference-sync';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import {
  defaultDescription,
  defaultTitle,
  seoKeywords,
  siteName,
  siteUrl,
} from '@/lib/seo';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import type { Viewport } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import './globals.css';

const preferenceInitScript = `
(() => {
  const themeTokens = new Set(['dark', 'light']);
  const languageMap = new Map([
    ['ko', 'ko'],
    ['kr', 'ko'],
    ['korean', 'ko'],
    ['ru', 'ko'],
    ['rus', 'ko'],
    ['russian', 'ko'],
    ['en', 'en'],
    ['eng', 'en'],
    ['english', 'en'],
  ]);

  const tokensFromPath = window.location.pathname
    .split('/')
    .filter(Boolean)
    .flatMap((token) => decodeURIComponent(token).toLowerCase().split(/[\\s_-]+/));

  const search = new URLSearchParams(window.location.search);
  const tokens = [
    search.get('theme'),
    search.get('mode'),
    search.get('lang'),
    search.get('locale'),
    ...tokensFromPath,
  ].filter(Boolean).map((token) => String(token).toLowerCase());

  const explicitTheme = tokens.find((token) => themeTokens.has(token));
  const explicitLanguage = tokens.map((token) => languageMap.get(token)).find(Boolean);
  let storedTheme;
  let storedLanguage;
  try {
    const storedPreferences = JSON.parse(window.localStorage.getItem('ask-romeo-display-preferences') || '{}');
    storedTheme = themeTokens.has(storedPreferences.theme) ? storedPreferences.theme : undefined;
    storedLanguage = languageMap.get(storedPreferences.lang);
  } catch {}
  const systemTheme = 'dark'; // Dark theme is always the default.
  const browserLanguage = 'ru'; // Russian is always the default.
  const theme = explicitTheme || storedTheme || systemTheme;
  const language = explicitLanguage || storedLanguage || browserLanguage;

  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
  document.documentElement.lang = language === 'ru' ? 'ru' : 'en';
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s | Ask Romeo',
  },
  description: defaultDescription,
  keywords: seoKeywords,
  authors: [
    {
      name: 'Romeo Timony',
      url: 'https://github.com/Romeo-Timony',
    },
  ],
  creator: 'Romeo Timony',
  publisher: 'Romeo Timony',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    creator: '@Romeo-Timony',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg?v=3',
        sizes: 'any',
      },
    ],
    shortcut: '/favicon.svg?v=3',
    apple: '/apple-touch-icon.png?v=2',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const shouldLoadVercelAnalytics =
  process.env.VERCEL === '1' ||
  process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === 'true';
const cloudflareAnalyticsToken =
  process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg?v=3" sizes="any" />
        <script dangerouslySetInnerHTML={{ __html: preferenceInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="bg-background min-h-screen font-sans antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <PreferenceSync />
          </Suspense>
          <main className="flex min-h-screen flex-col">{children}</main>
          <Toaster />
          {cloudflareAnalyticsToken ? (
            <Script
              src="https://static.cloudflareinsights.com/beacon.min.js"
              strategy="afterInteractive"
              defer
              data-cf-beacon={JSON.stringify({
                token: cloudflareAnalyticsToken,
              })}
            />
          ) : null}
          {shouldLoadVercelAnalytics ? <Analytics /> : null}
        </ThemeProvider>
      </body>
    </html>
  );
}
