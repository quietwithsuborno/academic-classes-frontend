import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { LayoutDashboardIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mainNav, routes } from "@/config/site";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getMockAuth } from "@/lib/mock-data/auth";
import { LanguageToggle } from "./language-toggle";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

// Sticky header (Spec B-01), wireframe 01/02/06/07।
// Server component: ভাষা, লেখা আর login অবস্থা এখানে পড়া হয়,
// শুধু যে অংশে click লাগে (ভাষা, theme, ☰) সেগুলো client component।
// lg (1024px)-এর নিচে mobile layout, উপরে desktop layout (D-10)।
export async function Header() {
  const rawLocale = await getLocale();
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = await getTranslations("Header");
  const auth = getMockAuth();

  const navItems = mainNav.map((item) => ({
    href: item.href,
    label: t(`nav.${item.labelKey}`),
  }));

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      {/* ---------- Mobile ---------- */}
      <div className="flex items-center gap-2 px-3 py-2.5 lg:hidden">
        <MobileMenu
          items={navItems}
          openLabel={t("openMenu")}
          title={t("menuTitle")}
        />
        <Logo className="flex-1 justify-center" />
        {auth.status === "student" && (
          <Button asChild className="h-11 shrink-0 px-2.5 text-sm font-semibold">
            <Link href={routes.dashboard}>{t("dashboard")}</Link>
          </Button>
        )}
        <LanguageToggle
          locale={locale}
          variant="compact"
          label={t("switchLanguage")}
        />
        <ThemeToggle label={t("toggleTheme")} />
        <CartLink label={t("cart")} />
      </div>

      {/* ---------- Desktop ---------- */}
      <div className="mx-auto hidden max-w-[1200px] items-center gap-6 px-6 py-3.5 lg:flex">
        <Logo className="shrink-0" />

        <nav
          aria-label={t("mainNav")}
          className="flex flex-1 gap-[22px] text-base font-medium"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle
            locale={locale}
            variant="full"
            label={t("switchLanguage")}
          />
          <ThemeToggle label={t("toggleTheme")} />
          <CartLink label={t("cart")} />

          {auth.status === "student" ? (
            <>
              <Button asChild className="h-11 px-[18px] text-base font-semibold">
                <Link href={routes.dashboard}>
                  <LayoutDashboardIcon className="size-[18px]" />
                  {t("dashboard")}
                </Link>
              </Button>
              {/* D-12: আপাতত শুধু দেখায়, click করলে কিছু হয় না */}
              <span
                role="img"
                aria-label={`${t("profile")}: ${auth.user.name}`}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-semibold text-secondary-foreground"
              >
                {auth.user.name.charAt(0)}
              </span>
            </>
          ) : (
            // A-03 login popup পরে যুক্ত হবে; আপাতত click করলে কিছু হয় না
            <Button type="button" className="h-11 px-[22px] text-base font-semibold">
              {t("login")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

function CartLink({ label }: { label: string }) {
  return (
    <Button asChild variant="outline" className="size-11 shrink-0">
      <Link href={routes.cart} aria-label={label}>
        <ShoppingCartIcon className="size-[22px]" />
      </Link>
    </Button>
  );
}
