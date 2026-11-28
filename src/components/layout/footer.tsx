import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { COPYRIGHT_YEAR, routes, siteConfig, socialLinks } from "@/config/site";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getNumberLocale } from "@/lib/format";
import { localize } from "@/lib/localized";
import { BackToTop } from "./back-to-top";
import { Logo } from "./logo";
import { SocialIcon } from "./social-icon";

// Footer (Spec 2.3 #11, FR-WEB-01; wireframe 01, 02)। সব page-এ, root layout থেকে (D-47)।
// Mobile: (১) logo + পরিচিতি পাশাপাশি; (২) যোগাযোগ | সোশ্যাল; (৩) নীতিমালা; (৪) ©।
// Desktop: ৪ কলাম — logo ও পরিচিতি | যোগাযোগ | নীতিমালা | সোশ্যাল মিডিয়া; নিচে ©।
// পুরোটা server component: কোনো click state নেই।

const linkClass =
  "flex min-h-11 items-center underline-offset-4 transition-colors hover:text-primary hover:underline lg:min-h-0";

export async function Footer() {
  const rawLocale = await getLocale();
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations("Footer");
  const { contact } = siteConfig;

  // সালে হাজারের কমা চাই না (২,০২৬ না, ২০২৬), তাই formatNumber না
  const year = new Intl.NumberFormat(getNumberLocale(locale), { useGrouping: false }).format(
    COPYRIGHT_YEAR
  );

  const policies = [
    { href: routes.privacyPolicy, label: t("privacyPolicy") },
    { href: routes.refundPolicy, label: t("refundPolicy") },
    { href: routes.terms, label: t("terms") },
  ];

  return (
    <footer className="border-t">
      {/* Mobile-এ নিচে ১০৪px ফাঁকা: ভাসমান ৩ button আর WhatsApp যেন © না ঢাকে (B-05) */}
      <div className="mx-auto max-w-[1200px] px-4 pt-7 pb-[104px] lg:px-6 lg:pt-11 lg:pb-7">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-[15px] lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] lg:gap-9">
          {/* ১. Logo ও পরিচিতি: mobile-এ পাশাপাশি, desktop-এ একটার নিচে আরেকটা */}
          <div className="col-span-2 flex items-start gap-3 lg:col-span-1 lg:flex-col">
            <Logo className="shrink-0" />
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground lg:text-[15px]">
              {t("about")}
            </p>
          </div>

          {/* ২. যোগাযোগ */}
          <div className="flex flex-col gap-2.5">
            <h2 className="font-bold">{t("contactTitle")}</h2>
            <address className="flex flex-col text-sm leading-relaxed text-muted-foreground not-italic lg:gap-1 lg:text-[15px]">
              <span>{localize(contact.address, locale)}</span>
              <a
                href={contact.phoneHref}
                aria-label={`${t("phoneLabel")}: ${contact.phoneDisplay}`}
                className={linkClass}
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                aria-label={`${t("emailLabel")}: ${contact.email}`}
                className={`${linkClass} break-all`}
              >
                {contact.email}
              </a>
              <span>{t("tradeLicense", { number: contact.tradeLicenseNumber })}</span>
            </address>
          </div>

          {/* ৩. নীতিমালা: mobile-এ সবার শেষে (order-1), desktop-এ নিজের জায়গায় */}
          <nav aria-labelledby="footer-policies" className="order-1 flex flex-col gap-0 lg:order-none lg:gap-2.5">
            <h2 id="footer-policies" className="mb-1 font-bold lg:mb-0">
              {t("policiesTitle")}
            </h2>
            {policies.map((policy) => (
              <Link key={policy.href} href={policy.href} className={linkClass}>
                {policy.label}
              </Link>
            ))}
          </nav>

          {/* ৪. সোশ্যাল মিডিয়া: শুধু icon, এক সারিতে (D-51); সব link নতুন tab-এ */}
          <nav aria-labelledby="footer-social" className="flex flex-col gap-1.5 lg:gap-2.5">
            <h2 id="footer-social" className="font-bold">
              {t("socialTitle")}
            </h2>
            <ul className="-ml-2 flex gap-1">
              {socialLinks.map((social) => (
                <li key={social.key}>
                  {/* লেখা নেই, তাই নাম aria-label-এ: "Facebook (নতুন ট্যাবে খুলবে)" */}
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} ${t("opensNewTab")}`}
                    title={social.label}
                    className="flex size-11 items-center justify-center rounded-md transition-transform duration-200 ease-out hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:hover:scale-100"
                  >
                    <SocialIcon name={social.key} className="size-7" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/*
          © আর "উপরে ফিরে যান": desktop-এ এক সারিতে (© বাঁয়ে, button ডানে)।
          Mobile-এ button ©-এর উপরে, বাঁয়ে (flex-col-reverse): ডান কোণে পরে ভাসমান WhatsApp বসবে,
          সেখানে রাখলে button ঢাকা পড়ত।
        */}
        <div className="mt-6 flex flex-col-reverse items-start gap-3 border-t pt-3 lg:flex-row lg:items-center lg:justify-between lg:pt-4">
          <p className="text-sm text-muted-foreground">{t("copyright", { year })}</p>
          <BackToTop label={t("backToTop")} />
        </div>
      </div>
    </footer>
  );
}
