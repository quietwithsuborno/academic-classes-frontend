"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { ChevronRightIcon, GraduationCapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGradeFilter } from "./grade-filter-context";

// একটা শ্রেণির card (wireframe 01, 02)।
// এটা "#courses"-এর link। Click-এ বাছা শ্রেণি context-এ জমা হয় (D-29), আর
// JavaScript নিজে মসৃণভাবে কোর্সসমূহ-এ নামায় (D-34)। JavaScript না চললে সাধারণ link-এর মতো লাফ দেয়।
/** Card-এর জন্য দরকারি অংশ, নাম/বর্ণনা আগেই চালু ভাষায় বাছা (D-30) */
export type GradeCardData = {
  slug: string;
  name: string;
  description: string;
  iconUrl: string | null;
};

export function GradeCard({ grade }: { grade: GradeCardData }) {
  const { selectedGrade, setSelectedGrade } = useGradeFilter();
  const isSelected = selectedGrade === grade.slug;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Ctrl/⌘/Shift-click (নতুন tab ইত্যাদি) browser-এর নিজের মতো চলুক
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();

    setSelectedGrade(grade.slug);

    const heading = document.getElementById("courses");
    if (!heading) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // scroll-mt-24 মেনে শিরোনাম sticky header-এর নিচে থামে
    heading.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    // Keyboard/screen reader user-ও যেন নতুন জায়গায় পৌঁছায়; focus-এর জন্য আবার scroll না
    heading.focus({ preventScroll: true });
  }

  return (
    <a
      href="#courses"
      onClick={handleClick}
      className={cn(
        "group flex min-h-[140px] flex-col gap-2.5 rounded-xl border-[1.5px] bg-card p-4 text-card-foreground",
        "transition-[translate,border-color,background-color,box-shadow] duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_10px_24px_rgb(0_0_0/0.08)]",
        "focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        "lg:min-h-[120px] lg:flex-row lg:items-center lg:gap-[18px] lg:rounded-[10px] lg:p-6",
        isSelected ? "border-primary bg-secondary" : "border-input"
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-[10px] bg-secondary text-primary lg:size-[52px]"
      >
        {grade.iconUrl ? (
          <Image src={grade.iconUrl} alt="" width={52} height={52} className="size-full object-cover" />
        ) : (
          <GraduationCapIcon className="size-7" />
        )}
      </span>

      {/* Mobile: নাম, তার নিচে বর্ণনা + ›; Desktop: নাম ও বর্ণনা মাঝে, › একদম ডানে */}
      <span className="flex flex-1 flex-col gap-2.5 lg:gap-0.5">
        <span className="text-[21px] leading-tight font-bold lg:text-[26px]">{grade.name}</span>
        <span className="flex items-center justify-between gap-1.5 text-[13px] text-muted-foreground lg:text-sm">
          {grade.description}
          <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none lg:hidden" />
        </span>
      </span>
      <ChevronRightIcon aria-hidden="true" className="hidden size-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none lg:block" />
    </a>
  );
}
