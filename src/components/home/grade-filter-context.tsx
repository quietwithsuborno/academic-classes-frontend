"use client";

import { createContext, use, useState, type ReactNode } from "react";

// শ্রেণি card আর কোর্সসমূহ section-এর মধ্যে "কোন শ্রেণি বাছা হয়েছে" ভাগাভাগি করার জায়গা (D-29)।
// শ্রেণি card এখানে লেখে, কোর্সসমূহ (পরের step) এখান থেকে পড়ে filter করবে।

type GradeFilter = {
  /** বাছা শ্রেণির slug (যেমন "ssc"); কিছু বাছা না থাকলে null = সব শ্রেণি */
  selectedGrade: string | null;
  setSelectedGrade: (slug: string | null) => void;
};

const GradeFilterContext = createContext<GradeFilter | null>(null);

export function GradeFilterProvider({ children }: { children: ReactNode }) {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  return (
    <GradeFilterContext value={{ selectedGrade, setSelectedGrade }}>
      {children}
    </GradeFilterContext>
  );
}

export function useGradeFilter(): GradeFilter {
  const context = use(GradeFilterContext);
  if (!context) {
    throw new Error("useGradeFilter-কে GradeFilterProvider-এর ভেতরে ব্যবহার করতে হবে");
  }
  return context;
}
