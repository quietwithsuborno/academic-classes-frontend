"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

// Spec B-11: light-এ চাঁদ, dark-এ সূর্য।
// কোন icon দেখাবে সেটা CSS (dark: class) ঠিক করে, JavaScript না।
// তাই "mounted" state বা effect লাগে না, hydration-এর অমিলও হয় না।
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="outline"
      aria-label={label}
      className="size-11 shrink-0"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <MoonIcon className="size-5 dark:hidden" />
      <SunIcon className="hidden size-5 dark:block" />
    </Button>
  );
}
