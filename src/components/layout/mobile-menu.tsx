"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
  items: { href: string; label: string }[];
  openLabel: string;
  title: string;
};

// Mobile-এর ☰ menu: বাম দিক থেকে Sheet খোলে, ভেতরে কোর্সসমূহ ও মেন্টর।
// Link চাপলে Sheet নিজে থেকে বন্ধ হয় (SheetClose)।
export function MobileMenu({ items, openLabel, title }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          aria-label={openLabel}
          className="size-11 shrink-0"
        >
          <MenuIcon className="size-[22px]" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <nav aria-label={title} className="flex flex-col gap-1 px-4">
          {items.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
