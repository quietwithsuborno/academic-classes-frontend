// Mock সংখ্যা: backend এলে system নিজে গুনে দেবে (দিনে একবার হালনাগাদ)।

import type { Stat } from "@/lib/types";

const mockStats: Stat[] = [
  { key: "students", value: 25000 },
  { key: "courses", value: 48 },
  { key: "mentors", value: 35 },
  { key: "videoLectures", value: 1200 },
];

export function getMockStats(): Stat[] {
  return mockStats;
}
