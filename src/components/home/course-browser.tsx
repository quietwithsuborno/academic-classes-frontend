"use client";

import { useState } from "react";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseCard, type CourseCardData } from "./course-card";
import { useGradeFilter } from "./grade-filter-context";

type PriceFilter = "all" | "free" | "paid";

type Labels = {
  filterGroup: string;
  tabs: Record<PriceFilter, string>;
  details: string;
  empty: string;
  showAllGrades: string;
  viewAll: string;
  /** count অনুযায়ী লেখা, server-এ আগেই তৈরি (০ থেকে মোট কোর্স পর্যন্ত) */
  resultCount: string[];
  /** গ্রেডের slug → "এসএসসি-এর filter সরান" */
  clearGrade: Record<string, string>;
};

type Props = {
  courses: CourseCardData[];
  gradeNames: Record<string, string>;
  limit: number;
  viewAllHref: string;
  labels: Labels;
};

// কোর্সসমূহ-এর filter আর card-এর তালিকা (client, কারণ tab/শ্রেণি বদলালে সাথে সাথে বদলায়)।
// - সব/ফ্রি/পেইড: এই component-এর নিজের state
// - শ্রেণি: শ্রেণি card থেকে context-এ আসে (D-29); বাছা থাকলে পাশে chip, ✕ চাপলে সরে (D-33)
// - Mobile-এ প্রথম ২টা, desktop-এ প্রথম ৪টা card (Spec 2.3)
export function CourseBrowser({ courses, gradeNames, limit, viewAllHref, labels }: Props) {
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const { selectedGrade, setSelectedGrade } = useGradeFilter();

  const filtered = courses.filter((course) => {
    if (selectedGrade && course.gradeSlug !== selectedGrade) return false;
    if (priceFilter === "free") return course.isFree;
    if (priceFilter === "paid") return !course.isFree;
    return true;
  });
  const visible = filtered.slice(0, limit);
  const selectedGradeName = selectedGrade ? gradeNames[selectedGrade] : null;

  return (
    <>
      {/* Filter-এর সারি: সব/ফ্রি/পেইড, তার পাশে বাছা শ্রেণির chip */}
      <div className="mb-3.5 flex flex-wrap items-center gap-2 lg:mb-[22px] lg:gap-2.5">
        <div role="group" aria-label={labels.filterGroup} className="flex gap-2 lg:gap-2.5">
          {(Object.keys(labels.tabs) as PriceFilter[]).map((key) => {
            const isActive = priceFilter === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setPriceFilter(key)}
                className={cn(
                  "h-11 rounded-full border px-4 text-[15px] transition-colors lg:px-[18px]",
                  isActive
                    ? "border-primary bg-primary font-semibold text-primary-foreground"
                    : "border-input bg-card hover:border-primary hover:text-primary"
                )}
              >
                {labels.tabs[key]}
              </button>
            );
          })}
        </div>

        {selectedGrade && selectedGradeName && (
          <>
            <span aria-hidden="true" className="mx-0.5 h-6 w-px bg-border" />
            <button
              type="button"
              onClick={() => setSelectedGrade(null)}
              aria-label={labels.clearGrade[selectedGrade]}
              className="flex h-11 items-center gap-1.5 rounded-full border border-primary bg-secondary pr-3 pl-4 text-[15px] font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {selectedGradeName}
              <XIcon aria-hidden="true" className="size-4" />
            </button>
          </>
        )}
      </div>

      {/* Screen reader-কে filter-এর ফল জানায় (চোখে দেখা যায় না) */}
      <p className="sr-only" aria-live="polite">
        {labels.resultCount[Math.min(filtered.length, labels.resultCount.length - 1)]}
      </p>

      {visible.length > 0 ? (
        // key বদলালে (filter বদলালে) পুরো grid নতুন করে বসে, তাই card-গুলো আবার
        // নরমভাবে ভেসে ওঠে (D-35); Reduce motion-এ animation নেই
        <div
          key={`${selectedGrade ?? "all"}-${priceFilter}`}
          className="grid grid-cols-1 gap-4 animate-in duration-300 fade-in slide-in-from-bottom-2 motion-reduce:animate-none sm:grid-cols-2 lg:grid-cols-4 lg:gap-[22px]"
        >
          {visible.map((course, index) => (
            // Mobile-এ (lg-এর নিচে) শুধু প্রথম ২টা; বাকিগুলো desktop-এ দেখা যায়
            <div key={course.id} className={index >= 2 ? "hidden lg:block" : undefined}>
              <CourseCard course={course} detailsLabel={labels.details} className="h-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-[10px] border border-dashed px-4 py-10 text-center">
          <p className="text-muted-foreground">{labels.empty}</p>
          {selectedGrade && (
            <button
              type="button"
              onClick={() => setSelectedGrade(null)}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {labels.showAllGrades}
            </button>
          )}
        </div>
      )}

      {/* Mobile-এ নিচে পুরো চওড়া button; desktop-এ link শিরোনামের পাশে (section-এ) */}
      <Link
        href={viewAllHref}
        className="mt-4 flex h-12 items-center justify-center rounded-md border-[1.5px] border-primary font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground lg:hidden"
      >
        {labels.viewAll}
      </Link>
    </>
  );
}
