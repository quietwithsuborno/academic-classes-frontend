import { getLocale, getTranslations } from "next-intl/server";
import {
  BookOpenIcon,
  PresentationIcon,
  UsersIcon,
  VideoIcon,
  type LucideIcon,
} from "lucide-react";
import { defaultLocale, isLocale } from "@/i18n/config";
import { CountUp } from "@/components/common/count-up";
import { getNumberLocale } from "@/lib/format";
import { getMockStats } from "@/lib/mock-data/stats";
import type { StatKey } from "@/lib/types";

const icons: Record<StatKey, LucideIcon> = {
  students: UsersIcon,
  courses: BookOpenIcon,
  mentors: PresentationIcon,
  videoLectures: VideoIcon,
};

// "সংখ্যায় আমরা" (Spec section 5) — wireframe 01 ও 02।
// Mobile: ২×২ আলাদা card, শুধু সংখ্যা আর লেখা।
// Desktop: একটা সাদা card-এ ৪ ঘর পাশাপাশি, প্রতিটায় icon; card-টা hero-র নিচের
// কিনারায় একটু উঠে বসে (-mt-7)।
// id="stats": পরে mobile-এর ভাসমান button এই section দেখা গেলে উঠে আসবে (B-02)।
export async function StatsSection() {
  const rawLocale = await getLocale();
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations("Stats");
  const stats = getMockStats();

  return (
    <section
      id="stats"
      aria-label={t("sectionLabel")}
      className="relative z-10 mx-auto max-w-[1200px] px-4 pt-5 lg:-mt-7 lg:px-6 lg:pt-0"
    >
      <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-0 lg:rounded-xl lg:border lg:bg-card lg:shadow-[0_8px_24px_rgb(0_0_0/0.08)]">
        {stats.map((stat) => {
          const Icon = icons[stat.key];
          return (
            <li
              key={stat.key}
              className="flex rounded-[10px] border bg-card p-3.5 lg:items-center lg:gap-3.5 lg:rounded-none lg:border-0 lg:border-r lg:bg-transparent lg:p-6 lg:last:border-r-0"
            >
              <span
                aria-hidden="true"
                className="hidden size-12 shrink-0 place-items-center rounded-[10px] bg-secondary text-primary lg:grid"
              >
                <Icon className="size-6" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[22px] leading-tight font-bold lg:text-[26px]">
                  {/* key={locale}: ভাষা বদলালে নতুন করে বসে, নতুন অঙ্কে গোনে */}
                  <CountUp
                    key={locale}
                    value={stat.value}
                    numberLocale={getNumberLocale(locale)}
                    suffix="+"
                  />
                </span>
                <span className="text-sm text-muted-foreground lg:text-[15px]">
                  {t(stat.key)}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
