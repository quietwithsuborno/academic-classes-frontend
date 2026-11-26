import Image from "next/image";
import Link from "next/link";
import { routes, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Light mode-এ কালো লেখার logo, dark mode-এ সাদা লেখার logo (D-13)।
// দুটোই HTML-এ থাকে, CSS (dark: class) ঠিক করে কোনটা দেখাবে,
// তাই page খোলার সময় ভুল logo ঝলক দেয় না।
export function Logo({ className }: { className?: string }) {
  const { light, dark, width, height } = siteConfig.logo;

  return (
    <Link
      href={routes.home}
      className={cn("flex h-11 min-w-0 items-center", className)}
    >
      <Image
        src={light}
        alt={siteConfig.name}
        width={width}
        height={height}
        loading="eager"
        className="h-10 w-auto max-w-full object-contain dark:hidden"
      />
      <Image
        src={dark}
        alt={siteConfig.name}
        width={width}
        height={height}
        loading="eager"
        className="hidden h-10 w-auto max-w-full object-contain dark:block"
      />
    </Link>
  );
}
