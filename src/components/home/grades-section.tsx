import { getLocale, getTranslations } from "next-intl/server";
import { defaultLocale, isLocale } from "@/i18n/config";
import { localize } from "@/lib/localized";
import { getMockGrades } from "@/lib/mock-data/grades";
import { GradeCard } from "./grade-card";

// "তোমার শ্রেণি বেছে নাও" (Spec section 6, B-08)।
// শ্রেণির তালিকা data থেকে (D-04); card-গুলো client component, কারণ click-এ filter বদলায়।
// নাম/বর্ণনা এখানেই চালু ভাষায় বেছে card-কে সাধারণ লেখা হিসেবে দেওয়া হয় (D-30)।
export async function GradesSection() {
  const rawLocale = await getLocale();
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations("Grades");
  const grades = getMockGrades();

  if (grades.length === 0) return null;

  return (
    <section
      aria-labelledby="grades-heading"
      className="mx-auto max-w-[1200px] px-4 pt-8 pb-2 lg:px-6 lg:pt-16 lg:pb-6"
    >
      <h2 id="grades-heading" className="mb-1 text-[22px] font-bold lg:mb-1.5 lg:text-[30px]">
        {t("title")}
      </h2>
      <p className="mb-3.5 text-sm text-muted-foreground lg:mb-[22px] lg:text-base">
        {t("subtitle")}
      </p>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] lg:gap-5">
        {grades.map((grade) => (
          <GradeCard
            key={grade.id}
            grade={{
              slug: grade.slug,
              name: localize(grade.name, locale),
              description: localize(grade.description, locale),
              iconUrl: grade.iconUrl,
            }}
          />
        ))}
      </div>
    </section>
  );
}
