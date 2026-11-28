// Mock শিক্ষার্থীর মতামত: Admin panel আর API আসা পর্যন্ত। নাম ও লেখা কাল্পনিক।
// ছবি public/mock/students/-এ নকল; দুজনের ছবি নেই, যাতে নামের প্রথম অক্ষরের avatar-ও দেখা যায়।
// কোন review Home-এ দেখাবে সেটা খোলা প্রশ্ন UI-19; আপাতত তালিকার ক্রমে প্রথম ৩টি।

import type { Testimonial } from "@/lib/types";

const mockTestimonials: Testimonial[] = [
  {
    id: "review_1",
    rating: 5,
    text: "ভেক্টর আর গতির অধ্যায়গুলো আগে একদম বুঝতাম না। ভিডিওগুলো ছোট ছোট ভাগে করা, তাই বারবার দেখে নিজের গতিতে শিখতে পেরেছি।",
    studentName: "রাফি আহমেদ",
    studentAvatarUrl: "/mock/students/student-1.jpg",
    courseSlug: "ssc-physics-full-course",
  },
  {
    id: "review_2",
    rating: 5,
    text: "প্রতিটা অধ্যায়ের পর ছোট পরীক্ষা থাকায় কোথায় দুর্বল সেটা সাথে সাথে ধরা পড়ে। ক্যালকুলাস এখন আর ভয় লাগে না।",
    studentName: "তাসনিম আক্তার",
    studentAvatarUrl: null,
    courseSlug: "hsc-higher-math",
  },
  {
    id: "review_3",
    rating: 4,
    text: "ফ্রি কোর্স হিসেবে আশার চেয়ে অনেক ভালো। চিত্রগুলো পরিষ্কার, নোটও সাথে দেওয়া। আরও কিছু অনুশীলনের প্রশ্ন থাকলে ভালো হতো।",
    studentName: "মেহেদী হাসান",
    studentAvatarUrl: "/mock/students/student-2.jpg",
    courseSlug: "hsc-biology-basics",
  },
  {
    id: "review_4",
    rating: 5,
    text: "Grammar-এর নিয়মগুলো উদাহরণ দিয়ে বোঝানো, মুখস্থ করতে হয় না।",
    studentName: "নাবিলা ইসলাম",
    studentAvatarUrl: null,
    courseSlug: "ssc-english-grammar",
  },
];

export function getMockTestimonials(): Testimonial[] {
  return [...mockTestimonials];
}
