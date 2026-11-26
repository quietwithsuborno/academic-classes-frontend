"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: number;
  /** Intl locale, যেমন "bn-BD" (getNumberLocale থেকে) */
  numberLocale: string;
  suffix?: string;
  /** মিলিসেকেন্ডে, কত সময়ে ০ থেকে শেষ সংখ্যায় পৌঁছাবে */
  duration?: number;
};

// সংখ্যা screen-এ আসা মাত্র ০ থেকে গুনে আসল মানে পৌঁছায় (D-27)।
// - Server আসল সংখ্যাই পাঠায় (search engine, JavaScript-ছাড়া browser ঠিক সংখ্যা দেখে)।
// - প্রতি frame-এ React state না বদলে সরাসরি লেখা বদলানো হয় (ref), তাই
//   ১.৬ সেকেন্ডে শত শত render হয় না, আর effect-এ setState-এর lint আপত্তিও নেই।
// - Screen reader শুধু আসল সংখ্যা পড়ে (sr-only), গোনা অংশ aria-hidden।
// - Reduce motion চালু থাকলে গোনা হয় না, সরাসরি আসল সংখ্যা।
// - ভাষা বদলালে parent `key` বদলে component নতুন করে বসায় (stats-section দেখুন)।
export function CountUp({ value, numberLocale, suffix = "", duration = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = new Intl.NumberFormat(numberLocale).format(value) + suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const format = new Intl.NumberFormat(numberLocale);
    el.textContent = format.format(0) + suffix;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect(); // একবারই গোনে

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // ease-out: শুরুতে দ্রুত, শেষে ধীরে থামে
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = format.format(Math.round(value * eased)) + suffix;
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, numberLocale, suffix, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </>
  );
}
