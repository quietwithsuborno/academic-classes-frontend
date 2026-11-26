"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { setLocale } from "@/i18n/actions";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = { bn: "বাংলা", en: "EN" };

type Props = {
  locale: Locale;
  /** full = desktop-এর "বাংলা | EN"; compact = mobile-এ শুধু যে ভাষায় যাবে */
  variant: "full" | "compact";
  label: string;
};

// D-11: mobile-এ যে ভাষায় যাবে সেটা দেখায়; desktop-এ চালু ভাষাটা primary রঙে।
// Click করলে server action cookie বসায়, তারপর page নতুন ভাষায় আবার render হয়।
export function LanguageToggle({ locale, variant, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const next: Locale = locale === "bn" ? "en" : "bn";

  function switchLocale() {
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      aria-label={label}
      disabled={isPending}
      onClick={switchLocale}
      className={cn(
        "h-11 shrink-0",
        variant === "full" ? "px-3.5 text-[15px]" : "px-2.5 text-sm"
      )}
    >
      {variant === "compact" ? (
        <span lang={next}>{LABELS[next]}</span>
      ) : (
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              locale === "bn"
                ? "font-semibold text-primary"
                : "text-muted-foreground"
            )}
          >
            {LABELS.bn}
          </span>
          <span aria-hidden="true" className="text-muted-foreground">
            |
          </span>
          <span
            className={cn(
              locale === "en"
                ? "font-semibold text-primary"
                : "text-muted-foreground"
            )}
          >
            {LABELS.en}
          </span>
        </span>
      )}
    </Button>
  );
}
