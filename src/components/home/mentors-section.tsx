import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRightIcon } from "lucide-react";
import { HOME_MENTOR_LIMIT, routes } from "@/config/site";
import { defaultLocale, isLocale } from "@/i18n/config";
import { localize } from "@/lib/localized";
import { getMockMentors } from "@/lib/mock-data/mentors";
import { MentorCard } from "./mentor-card";

// "আমাদের মেন্টর" (Spec 2.3 #8; wireframe 01, 02)।
// পুরোটা server component: click-এ কোনো state বদলায় না, card-গুলো শুধু link।
export async function MentorsSection() {
  const rawLocale = await getLocale();
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations("Mentors");

  const mentors = getMockMentors().slice(0, HOME_MENTOR_LIMIT);
  if (mentors.length === 0) return null;

  return (
    <section aria-labelledby="mentors-heading" className="bg-muted">
      <div className="mx-auto max-w-[1200px] px-4 py-7 lg:px-6 lg:py-14">
        <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-3 lg:mb-5">
          <h2 id="mentors-heading" className="text-[22px] font-bold lg:text-[30px]">
            {t("title")}
          </h2>
          <Link
            href={routes.mentors}
            className="hidden items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline lg:flex"
          >
            {t("viewAll")}
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] lg:gap-5">
          {mentors.map((mentor) => (
            <li key={mentor.id}>
              <MentorCard
                mentor={{
                  id: mentor.id,
                  name: localize(mentor.name, locale),
                  subject: localize(mentor.subject, locale),
                  university: localize(mentor.university, locale),
                  photoUrl: mentor.photoUrl,
                  href: routes.mentorDetail(mentor.slug),
                }}
              />
            </li>
          ))}
        </ul>

        {/* Mobile-এ নিচে পুরো চওড়া button; desktop-এ link শিরোনামের পাশে */}
        <Link
          href={routes.mentors}
          className="mt-3.5 flex h-12 items-center justify-center rounded-md border-[1.5px] border-primary bg-card font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground lg:hidden"
        >
          {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}
