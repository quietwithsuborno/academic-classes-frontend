import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BookOpenIcon, FileTextIcon } from "lucide-react";
import { routes, siteConfig } from "@/config/site";
import { getMockBanners } from "@/lib/mock-data/banners";
import { cn } from "@/lib/utils";
import { BannerSlider } from "./banner-slider";
import { HeroBackground } from "./hero-background";

// Hero ("পরিচিতি") section — wireframe 01 (desktop) ও 02 (mobile)।
// Mobile: banner → বই/ই-বুক (পাশাপাশি দুটি বড় box) → "কোর্সগুলো দেখুন"।
// Desktop: বাম দিকে button-গুলো, ডান দিকে banner।
export async function HeroSection() {
  const t = await getTranslations("Hero");
  const banners = getMockBanners();

  return (
    <section
      aria-label={t("sectionLabel")}
      className="relative overflow-hidden bg-muted"
    >
      {/* ভেসে ওঠা icon (z-[1]): banner-এর (z-0) উপর দিয়েও যায়, button-এর (z-[2]) নিচ দিয়ে */}
      <HeroBackground />
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-3.5 px-4 pt-5 pb-7 lg:flex-row lg:items-center lg:gap-10 lg:px-6 lg:py-8">
        {/* Banner: mobile-এ উপরে, desktop-এ ডানে (lg:order-2)।
            Desktop-এ button-এর অংশ শুধু নিজের মাপের জায়গা নেয় (flex-none),
            বাকি সব জায়গা banner পায় (flex-1), তাই বাম দিকে ফাঁকা থাকে না। */}
        <div className="relative z-0 lg:order-2 lg:min-w-0 lg:flex-1">
          <BannerSlider
            banners={banners}
            labels={{
              region: t("bannerRegion"),
              prev: t("prevBanner"),
              next: t("nextBanner"),
            }}
          />
        </div>

        {/* Button-গুলো: mobile-এ নিচে, desktop-এ বামে */}
        <div className="relative z-[2] mt-1 flex flex-col gap-3.5 lg:order-1 lg:mt-0 lg:flex-none lg:gap-[26px]">
          <div className="grid grid-cols-2 gap-2.5 lg:flex lg:flex-wrap lg:gap-3">
            <a
              href={siteConfig.externalLinks.booksAndStationery}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("booksExternalLabel")}
              className={cn(floatingBase, quickLinkClass)}
            >
              <BookOpenIcon aria-hidden="true" className={iconClass} />
              <span>
                {t("booksAndStationery")}
                <span aria-hidden="true"> ↗</span>
              </span>
            </a>
            <Link href={routes.ebooks} className={cn(floatingBase, quickLinkClass)}>
              <FileTextIcon aria-hidden="true" className={iconClass} />
              <span>{t("ebook")}</span>
            </Link>
          </div>

          <Link
            href={routes.courses}
            className={cn(
              floatingBase,
              "flex h-[52px] items-center justify-center rounded-md bg-primary px-[26px] text-[17px] font-semibold text-primary-foreground shadow-[0_8px_20px_rgb(204_0_102/0.28)] lg:self-start"
            )}
          >
            {t("browseCourses")}
          </Link>
        </div>
      </div>
    </section>
  );
}

// B-12: "ভেসে থাকা" button — নরম ছায়া; hover/চাপ দিলে একটু ওঠে আর চারপাশে
// pink আভা ছড়ায় (`.hero-glow`, globals.css)। Reduce motion-এ ওঠা বন্ধ, আভা থাকে।
const floatingBase =
  "hero-glow hover:-translate-y-0.5 active:-translate-y-0.5 focus-visible:outline-none motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0";

// বই ও স্টেশনারি / ই-বুক: mobile-এ উঁচু box (icon উপরে), desktop-এ ৫২px উঁচু button (icon পাশে)
const quickLinkClass =
  "flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-primary bg-card p-3 text-center text-base font-semibold text-card-foreground shadow-[0_8px_20px_rgb(0_0_0/0.12)] lg:h-[52px] lg:min-h-0 lg:flex-row lg:gap-2.5 lg:rounded-md lg:px-[26px] lg:py-0 lg:text-[17px]";

const iconClass = "size-[30px] text-primary lg:size-[22px]";
