// Mock শ্রেণি: Admin panel আর API আসা পর্যন্ত।
// নতুন শ্রেণি (যেমন "ভর্তি পরীক্ষা") যোগ করতে শুধু এখানে একটা item বাড়ালেই
// card তৈরি হয়ে যাবে; component বদলাতে হবে না (Spec section 6, D-04)।

import type { Grade } from "@/lib/types";

const mockGrades: Grade[] = [
  {
    id: "grade_ssc",
    slug: "ssc",
    name: { bn: "এসএসসি", en: "SSC" },
    description: { bn: "নবম-দশম শ্রেণির সব বিষয়", en: "All subjects for Class 9–10" },
    iconUrl: null,
    sortOrder: 1,
  },
  {
    id: "grade_hsc",
    slug: "hsc",
    name: { bn: "এইচএসসি", en: "HSC" },
    description: { bn: "একাদশ-দ্বাদশ শ্রেণির সব বিষয়", en: "All subjects for Class 11–12" },
    iconUrl: null,
    sortOrder: 2,
  },
];

export function getMockGrades(): Grade[] {
  return [...mockGrades].sort((a, b) => a.sortOrder - b.sortOrder);
}
