import type { Locale } from "@/i18n/config";
import type { LocalizedText } from "@/lib/types";

// দুই ভাষার লেখা থেকে চালু ভাষারটা বেছে দেয় (D-30)।
// English চাওয়া হলে কিন্তু Admin English না লিখলে, বাংলাটাই দেখায় (ফাঁকা থাকে না)।
export function localize(text: LocalizedText, locale: Locale): string {
  if (locale === "en" && text.en) return text.en;
  return text.bn;
}
