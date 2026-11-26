"use server";

import { cookies } from "next/headers";
import { isLocale, LOCALE_COOKIE } from "./config";

// Header-এর ভাষা button থেকে ডাকা হয় (Spec B-06)।
// Cookie এক বছর থাকে, তাই পরের বার এলেও একই ভাষা দেখায়।
export async function setLocale(locale: string) {
  if (!isLocale(locale)) return;

  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
