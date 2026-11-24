// ভাষার সব setting এক জায়গায়।
// এই file-এ কোনো server-only import নেই, তাই client component-ও এটা import করতে পারবে।

export const locales = ["bn", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bn";

// User-এর বাছাই করা ভাষা এই cookie-তে থাকবে (spec B-06: "বাছাই মনে থাকে")
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}
