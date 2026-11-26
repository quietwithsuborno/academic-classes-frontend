// Mock কোর্স: Admin panel আর API আসা পর্যন্ত। ছবি public/mock/courses/-এ নকল।
// ক্রম ইচ্ছা করে মেশানো (এসএসসি/এইচএসসি, ফ্রি/পেইড), যাতে "সব"-এ দুই রকমই দেখা যায়।

import type { Course } from "@/lib/types";

const mockCourses: Course[] = [
  {
    id: "course_ssc_physics",
    slug: "ssc-physics-full-course",
    gradeSlug: "ssc",
    title: { bn: "এসএসসি পদার্থবিজ্ঞান ফুল কোর্স", en: "SSC Physics Full Course" },
    imageUrl: "/mock/courses/physics.jpg",
    price: 1500,
    lectureCount: 48,
    rating: 4.8,
    enrolledCount: 1200,
  },
  {
    id: "course_hsc_biology_free",
    slug: "hsc-biology-basics",
    gradeSlug: "hsc",
    title: { bn: "এইচএসসি জীববিজ্ঞানের ভিত্তি", en: "HSC Biology Basics" },
    imageUrl: "/mock/courses/biology.jpg",
    price: 0,
    lectureCount: 18,
    rating: 4.6,
    enrolledCount: 2700,
  },
  {
    id: "course_hsc_physics",
    slug: "hsc-physics-1st-paper",
    gradeSlug: "hsc",
    title: { bn: "এইচএসসি পদার্থবিজ্ঞান ১ম পত্র", en: "HSC Physics 1st Paper" },
    imageUrl: "/mock/courses/physics.jpg",
    price: 2500,
    lectureCount: 60,
    rating: 4.9,
    enrolledCount: 1800,
  },
  {
    id: "course_ssc_math_free",
    slug: "ssc-math-foundation",
    gradeSlug: "ssc",
    title: { bn: "ফ্রি ক্লাস: গণিতের ভিত্তি", en: "Free Class: Math Foundation" },
    imageUrl: "/mock/courses/math.jpg",
    price: 0,
    lectureCount: 20,
    rating: 4.6,
    enrolledCount: 3400,
  },
  {
    id: "course_ssc_chemistry",
    slug: "ssc-chemistry-full-course",
    gradeSlug: "ssc",
    title: { bn: "এসএসসি রসায়ন ফুল কোর্স", en: "SSC Chemistry Full Course" },
    imageUrl: "/mock/courses/chemistry.jpg",
    price: 1200,
    lectureCount: 40,
    rating: 4.7,
    enrolledCount: 950,
  },
  {
    id: "course_hsc_higher_math",
    slug: "hsc-higher-math",
    gradeSlug: "hsc",
    title: { bn: "এইচএসসি উচ্চতর গণিত", en: "HSC Higher Mathematics" },
    imageUrl: "/mock/courses/higher-math.jpg",
    price: 2200,
    lectureCount: 55,
    rating: 4.8,
    enrolledCount: 1300,
  },
  {
    id: "course_ssc_english_free",
    slug: "ssc-english-grammar",
    gradeSlug: "ssc",
    title: { bn: "এসএসসি ইংরেজি গ্রামার", en: "SSC English Grammar" },
    imageUrl: "/mock/courses/english.jpg",
    price: 0,
    lectureCount: 15,
    rating: 4.5,
    enrolledCount: 2100,
  },
  {
    id: "course_hsc_ict",
    slug: "hsc-ict",
    gradeSlug: "hsc",
    title: { bn: "এইচএসসি আইসিটি", en: "HSC ICT" },
    imageUrl: "/mock/courses/ict.jpg",
    price: 900,
    lectureCount: 30,
    rating: 4.4,
    enrolledCount: 600,
  },
];

export function getMockCourses(): Course[] {
  return mockCourses;
}
