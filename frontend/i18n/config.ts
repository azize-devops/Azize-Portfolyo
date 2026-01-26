export const locales = ["tr", "en", "ru", "zh", "de", "fr", "ar", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const localeNames: Record<Locale, string> = {
  tr: "Turkce",
  en: "English",
  ru: "Русский",
  zh: "中文",
  de: "Deutsch",
  fr: "Francais",
  ar: "العربية",
  es: "Espanol",
};

export const localeFlags: Record<Locale, string> = {
  tr: "🇹🇷",
  en: "🇬🇧",
  ru: "🇷🇺",
  zh: "🇨🇳",
  de: "🇩🇪",
  fr: "🇫🇷",
  ar: "🇸🇦",
  es: "🇪🇸",
};

export const rtlLocales: Locale[] = ["ar"];

export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
