import { getLocale, getTranslations } from "next-intl/server";
import { HOME_TESTIMONIAL_LIMIT } from "@/config/site";
import { defaultLocale, isLocale } from "@/i18n/config";
import { formatNumber } from "@/lib/format";
import { localize } from "@/lib/localized";
import { getMockCourses } from "@/lib/mock-data/courses";
import { getMockTestimonials } from "@/lib/mock-data/testimonials";
import { TestimonialCard } from "./testimonial-card";

// "শিক্ষার্থীরা যা বলছে" (Spec 2.3 #9, FR-REV-01; wireframe 01, 02)।
// পুরোটা server component। Desktop-এ ৩টা পাশাপাশি grid-এ; mobile/tablet-এ একই ৩টা
// পাশে টানা (swipe) সারিতে, শুধু CSS scroll-snap দিয়ে, কোনো JavaScript ছাড়া (D-42)।
export async function TestimonialsSection() {
  const rawLocale = await getLocale();
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations("Testimonials");

  const testimonials = getMockTestimonials().slice(0, HOME_TESTIMONIAL_LIMIT);
  if (testimonials.length === 0) return null;

  const courseTitles = new Map(getMockCourses().map((course) => [course.slug, course.title]));

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mx-auto max-w-[1200px] px-4 py-7 lg:px-6 lg:py-14"
    >
      <h2 id="testimonials-heading" className="mb-1 text-[22px] font-bold lg:mb-1.5 lg:text-[30px]">
        {t("title")}
      </h2>
      <p className="mb-3.5 text-sm text-muted-foreground lg:mb-[22px] lg:text-base">
        {t("subtitle")}
      </p>

      {/*
        Mobile: -mx-4 px-4 দিয়ে সারি screen-এর দুই কিনারা পর্যন্ত যায়, card কিনারায় কেটে দেখায়।
        tabIndex={0}: card-এর ভেতরে চাপার কিছু নেই, তাই keyboard user এই সারিতে এসে ← → দিয়ে টানতে পারেন।
      */}
      <ul
        tabIndex={0}
        aria-label={t("listLabel")}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:snap-none lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {testimonials.map((testimonial) => {
          const courseTitle = courseTitles.get(testimonial.courseSlug);
          return (
            // Mobile-এ card সারির ৮৫% চওড়া (পরেরটার কিনারা দেখা যায়), tablet-এ ~অর্ধেক, desktop-এ grid ঠিক করে
            <li
              key={testimonial.id}
              className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-auto"
            >
              <TestimonialCard
                testimonial={{
                  id: testimonial.id,
                  rating: testimonial.rating,
                  ratingLabel: t("ratingLabel", {
                    rating: formatNumber(testimonial.rating, locale),
                  }),
                  text: testimonial.text,
                  studentName: testimonial.studentName,
                  studentAvatarUrl: testimonial.studentAvatarUrl,
                  courseName: courseTitle ? localize(courseTitle, locale) : null,
                }}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
