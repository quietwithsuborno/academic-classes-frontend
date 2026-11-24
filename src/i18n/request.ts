import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "./config";

// প্রতিটা request-এ cookie দেখে ঠিক করা হয় কোন ভাষায় page দেখাবে।
// URL-এ /en বা /bn থাকবে না; ভাষা শুধু cookie দিয়ে চলবে।
export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieValue = store.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieValue) ? cookieValue : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
