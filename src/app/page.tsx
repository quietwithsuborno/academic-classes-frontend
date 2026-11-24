import { getTranslations } from "next-intl/server";

// Step 1-এর শুধু test page: font, ভাষা আর Tailwind ঠিকমতো কাজ করছে কিনা দেখার জন্য।
// Step 2 থেকে আসল Home page এখানে বসবে।
export default async function HomePage() {
  const t = await getTranslations("Home");

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <h1 className="text-2xl font-bold">{t("setupCheck")}</h1>
    </main>
  );
}
