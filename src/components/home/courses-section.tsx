import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRightIcon } from "lucide-react";
import { courseCardSettings, HOME_COURSE_LIMIT, routes } from "@/config/site";
import { defaultLocale, isLocale } from "@/i18n/config";
import { formatDecimal, formatPrice } from "@/lib/format";
import { localize } from "@/lib/localized";
import { getMockCourses } from "@/lib/mock-data/courses";
import { getMockGrades } from "@/lib/mock-data/grades";
import { CourseBrowser } from "./course-browser";
import type { CourseCardData } from "./course-card";

// "কোর্সসমূহ" (Spec 2.3, B-08; wireframe 01, 02, 05)।
// Server-এ: data আনা, চালু ভাষায় সব লেখা তৈরি (D-32)।
// Client-এ (CourseBrowser): সব/ফ্রি/পেইড আর শ্রেণির filter।
export async function CoursesSection() {
  const rawLocale = await getLocale();
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations("Courses");

  const grades = getMockGrades();
  const gradeNames = Object.fromEntries(
    grades.map((grade) => [grade.slug, localize(grade.name, locale)])
  );

  const courses: CourseCardData[] = getMockCourses().map((course) => {
    const isFree = course.price === 0;
    const meta: string[] = [];
    if (courseCardSettings.showLectureCount) {
      meta.push(t("lectures", { count: course.lectureCount }));
    }
    if (courseCardSettings.showRating) {
      meta.push(t("rating", { rating: formatDecimal(course.rating, locale) }));
    }
    if (courseCardSettings.showEnrolledCount) {
      meta.push(t("enrolled", { count: course.enrolledCount }));
    }

    return {
      id: course.id,
      gradeSlug: course.gradeSlug,
      isFree,
      title: localize(course.title, locale),
      gradeName: gradeNames[course.gradeSlug] ?? course.gradeSlug,
      imageUrl: course.imageUrl,
      href: routes.courseDetail(course.slug),
      badgeText: isFree ? t("badgeFree") : t("badgePaid"),
      priceText: isFree ? t("priceFree") : formatPrice(course.price, locale),
      meta,
    };
  });

  return (
    <section
      aria-labelledby="courses"
      className="mx-auto max-w-[1200px] px-4 py-7 lg:px-6 lg:py-12"
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3 lg:mb-4">
        {/* id="courses": শ্রেণি card এখানে নামায়; scroll-mt দিয়ে sticky header-এর নিচে থামে (B-08) */}
        {/* tabIndex={-1}: শ্রেণি card চাপার পর keyboard focus এখানে আনা যায় (D-34) */}
        <h2
          id="courses"
          tabIndex={-1}
          className="scroll-mt-24 text-[22px] font-bold outline-none lg:text-[30px]"
        >
          {t("title")}
        </h2>
        <Link
          href={routes.courses}
          className="hidden items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline lg:flex"
        >
          {t("viewAll")}
          <ArrowRightIcon aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <CourseBrowser
        courses={courses}
        gradeNames={gradeNames}
        limit={HOME_COURSE_LIMIT}
        viewAllHref={routes.courses}
        labels={{
          filterGroup: t("filterGroup"),
          tabs: { all: t("tabs.all"), free: t("tabs.free"), paid: t("tabs.paid") },
          details: t("details"),
          empty: t("empty"),
          showAllGrades: t("showAllGrades"),
          viewAll: t("viewAll"),
          resultCount: Array.from({ length: courses.length + 1 }, (_, count) =>
            t("resultCount", { count })
          ),
          clearGrade: Object.fromEntries(
            grades.map((grade) => [grade.slug, t("clearGrade", { grade: gradeNames[grade.slug] })])
          ),
        }}
      />
    </section>
  );
}
