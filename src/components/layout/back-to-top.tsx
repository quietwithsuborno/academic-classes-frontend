"use client";

import { ArrowUpIcon } from "lucide-react";

// Footer-এর "উপরে ফিরে যান" button (D-50)।
// শুধু click-এ কাজ করে; scroll-এর সময় কোনো code চলে না, তাই page-এর গতিতে প্রভাব নেই (D-39)।
export function BackToTop({ label }: { label: string }) {
  function handleClick() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    // Keyboard/screen reader user-এর focus-ও উপরে আনা (header-এর প্রথম link, মানে logo);
    // নইলে পরের Tab আবার footer থেকে শুরু হতো। preventScroll: মসৃণ ওঠায় বাধা না দিতে।
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex h-11 shrink-0 items-center gap-1.5 rounded-md border px-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <ArrowUpIcon
        aria-hidden="true"
        className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
      />
      {label}
    </button>
  );
}
