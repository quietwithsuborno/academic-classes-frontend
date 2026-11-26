// সংখ্যা দেখানোর নিয়ম এক জায়গায়।
// বাংলায় বাংলা অঙ্ক আর হাজারের কমা (২৫,০০০), English-এ 25,000।

import type { Locale } from "@/i18n/config";

const numberLocales: Record<Locale, string> = {
  bn: "bn-BD",
  en: "en-US",
};

/** Intl-এর locale নাম (যেমন "bn-BD"); client component-এ পাঠানোর জন্য */
export function getNumberLocale(locale: Locale): string {
  return numberLocales[locale];
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(numberLocales[locale]).format(value);
}
