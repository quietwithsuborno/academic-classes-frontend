import { getLocale, getTranslations } from "next-intl/server";
import { defaultLocale, isLocale } from "@/i18n/config";
import { localize } from "@/lib/localized";
import { getMockFaqs } from "@/lib/mock-data/faqs";
import { FaqAccordion } from "./faq-accordion";

// "সাধারণ জিজ্ঞাসা" (Spec 2.3 #10; wireframe 01, 02)।
// Section server component; শুধু খোলা/বন্ধের অংশ (FaqAccordion) client component।
export async function FaqSection() {
  const rawLocale = await getLocale();
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations("Faq");

  const faqs = getMockFaqs();
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="bg-muted">
      <div className="mx-auto max-w-[900px] px-4 py-7 lg:px-6 lg:py-14">
        <h2
          id="faq-heading"
          className="mb-3.5 text-[22px] font-bold lg:mb-[22px] lg:text-center lg:text-[30px]"
        >
          {t("title")}
        </h2>
        <FaqAccordion
          items={faqs.map((faq) => ({
            id: faq.id,
            question: localize(faq.question, locale),
            answer: localize(faq.answer, locale),
          }))}
        />
      </div>
    </section>
  );
}
