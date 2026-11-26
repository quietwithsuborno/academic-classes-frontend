// Site-এর সব setting এক জায়গায়: route, logo, link, খোলা প্রশ্নের অস্থায়ী মান।
// কোনো link বা নম্বর বদলাতে হলে শুধু এই file বদলালেই হবে।

import type { AuthStatus, NavItem, QuickAction } from "@/lib/types";

// ---------- Route (Screen Inventory-র ID সহ) ----------
// এই page-গুলো এখনো বানানো হয়নি; click করলে আপাতত 404 আসবে, এটা স্বাভাবিক।
export const routes = {
  home: "/", //                                  P-01
  courses: "/courses", //                        P-02
  courseDetail: (slug: string) => `/courses/${slug}`, // P-03
  mentors: "/mentors", //                        P-04
  mentorDetail: (slug: string) => `/mentors/${slug}`, // P-12
  ebooks: "/ebooks", //                          ই-বুক page
  cart: "/cart", //                              C-01
  dashboard: "/dashboard", //                    D-01
  enrolledCourses: "/dashboard/courses", //      D-02
} as const;

// ---------- Brand ও যোগাযোগ ----------
export const siteConfig = {
  name: "Academic Classes",
  logo: {
    light: "/brand/logo-light.png", // light mode: কালো লেখা
    dark: "/brand/logo-dark.png", //   dark mode: সাদা লেখা
    white: "/brand/logo-white.png", // রঙিন পটভূমির জন্য
    width: 600,
    height: 219,
  },
  contact: {
    // TODO: client-এর আসল WhatsApp নম্বর (দেশের code সহ, + ছাড়া)
    whatsappNumber: "8801000000000",
  },
  externalLinks: {
    // TODO: client-এর বই ও স্টেশনারির website-এর URL
    booksAndStationery: "#",
  },
} as const;

export function whatsappUrl(number: string = siteConfig.contact.whatsappNumber) {
  return `https://wa.me/${number}`;
}

// ---------- Header menu (Client, 15 Nov: শুধু কোর্সসমূহ ও মেন্টর) ----------
export const mainNav: NavItem[] = [
  { labelKey: "courses", href: routes.courses },
  { labelKey: "mentors", href: routes.mentors },
];

// ---------- খোলা প্রশ্নের অস্থায়ী মান (D-06) ----------
export const openQuestionConfig = {
  // UI-20: "এক্সাম ও লিডারবোর্ড" কোথায় যাবে এখনো ঠিক হয়নি
  examLeaderboardHref: "#",
} as const;

// ---------- Mobile-এর ভাসমান ৩টি button (Spec 2.4) ----------
// Visitor-এর ৩য় button (কার্ট) পরে Admin বদলাতে পারবেন (CR-05)।
export const quickActions: Record<AuthStatus, QuickAction[]> = {
  visitor: [
    { key: "login", href: null, emphasis: "primary" }, // A-03 popup, পরে
    { key: "courses", href: routes.courses, emphasis: "outline" },
    { key: "cart", href: routes.cart, emphasis: "outline" },
  ],
  student: [
    { key: "dashboard", href: routes.dashboard, emphasis: "primary" },
    { key: "enrolledCourses", href: routes.enrolledCourses, emphasis: "outline" },
    { key: "examLeaderboard", href: openQuestionConfig.examLeaderboardHref, emphasis: "outline" },
  ],
};

// ---------- Course card-এর ঐচ্ছিক তথ্য (Spec 2.5, D-31) ----------
// Admin panel থেকে চালু/বন্ধ হবে; আপাতত এখানে। তিনটাই false হলে card-এ পুরো লাইনটা সরে যায়।
export const courseCardSettings = {
  showLectureCount: true,
  showRating: true,
  showEnrolledCount: true,
};

// Home-এ কোর্সসমূহ section-এ কয়টা card (Spec 2.3): mobile-এ ২, desktop-এ ৪
export const HOME_COURSE_LIMIT = 4;
