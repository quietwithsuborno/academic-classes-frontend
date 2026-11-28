// Mock মেন্টর: Admin panel আর API আসা পর্যন্ত। নাম কাল্পনিক; ছবি public/mock/mentors/-এ নকল
// (বাস্তব কোনো মানুষের ছবি না)। ৫ জন রাখা হয়েছে যাতে দেখা যায় Home-এ শুধু প্রথম ৪ জন আসে।

import type { Mentor } from "@/lib/types";

const mockMentors: Mentor[] = [
  {
    id: "mentor_tanvir",
    slug: "tanvir-hasan",
    name: { bn: "তানভীর হাসান", en: "Tanvir Hasan" },
    subject: { bn: "পদার্থবিজ্ঞান", en: "Physics" },
    university: { bn: "বুয়েট", en: "BUET" },
    photoUrl: "/mock/mentors/mentor-1.jpg",
    sortOrder: 1,
  },
  {
    id: "mentor_nusrat",
    slug: "nusrat-jahan",
    name: { bn: "নুসরাত জাহান", en: "Nusrat Jahan" },
    subject: { bn: "উচ্চতর গণিত", en: "Higher Math" },
    university: { bn: "ঢাকা বিশ্ববিদ্যালয়", en: "University of Dhaka" },
    photoUrl: "/mock/mentors/mentor-2.jpg",
    sortOrder: 2,
  },
  {
    id: "mentor_ariful",
    slug: "ariful-islam",
    name: { bn: "আরিফুল ইসলাম", en: "Ariful Islam" },
    subject: { bn: "রসায়ন", en: "Chemistry" },
    university: { bn: "চট্টগ্রাম বিশ্ববিদ্যালয়", en: "University of Chittagong" },
    photoUrl: "/mock/mentors/mentor-3.jpg",
    sortOrder: 3,
  },
  {
    id: "mentor_sadia",
    slug: "sadia-rahman",
    name: { bn: "সাদিয়া রহমান", en: "Sadia Rahman" },
    subject: { bn: "জীববিজ্ঞান", en: "Biology" },
    university: { bn: "রাজশাহী বিশ্ববিদ্যালয়", en: "University of Rajshahi" },
    photoUrl: "/mock/mentors/mentor-4.jpg",
    sortOrder: 4,
  },
  {
    id: "mentor_mahmud",
    slug: "mahmudul-karim",
    name: { bn: "মাহমুদুল করিম", en: "Mahmudul Karim" },
    subject: { bn: "ইংরেজি", en: "English" },
    university: { bn: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়", en: "Jahangirnagar University" },
    photoUrl: "/mock/mentors/mentor-5.jpg",
    sortOrder: 5,
  },
];

export function getMockMentors(): Mentor[] {
  return [...mockMentors].sort((a, b) => a.sortOrder - b.sortOrder);
}
