// পুরো project-এ ব্যবহার হওয়া shared TypeScript type।
// Backend (NestJS) এলে API-র response এই type-এর সাথে মিলিয়ে নেওয়া হবে।

import type { Locale } from "@/i18n/config";

export type { Locale };

// ---------- Login অবস্থা ----------

/**
 * কোন ধরনের user page দেখছে।
 * UI-16 (login করা কিন্তু enrolled নয়)-এর উত্তর এলে এখানে নতুন ধরন যোগ হবে।
 */
export type AuthStatus = "visitor" | "student";

export interface StudentUser {
  id: string;
  name: string;
  /** ছবি না থাকলে null; তখন নামের প্রথম অক্ষর দেখানো হবে */
  avatarUrl: string | null;
}

export type AuthState =
  | { status: "visitor" }
  | { status: "student"; user: StudentUser };

// ---------- Navigation ----------

/**
 * লেখা সরাসরি না রেখে messages/*.json-এর key রাখা হয়,
 * যাতে একই data দিয়ে বাংলা ও English দুটোই দেখানো যায়।
 */
export type NavLabelKey = "courses" | "mentors";

export interface NavItem {
  labelKey: NavLabelKey;
  href: string;
}

// ---------- Mobile-এর ভাসমান button (Spec 2.4) ----------

export type QuickActionKey =
  | "login"
  | "courses"
  | "cart"
  | "dashboard"
  | "enrolledCourses"
  | "examLeaderboard";

export interface QuickAction {
  key: QuickActionKey;
  /** null মানে link না, button (যেমন login popup A-03 খোলে) */
  href: string | null;
  /** primary = গাঢ় রঙের (প্রথম button), outline = বাকি দুটো */
  emphasis: "primary" | "outline";
}

// ---------- Banner slider (Spec section 2, FR-WEB-05) ----------

export interface Banner {
  id: string;
  /** ছবি Admin upload করবেন; 16:9 অনুপাত */
  imageUrl: string;
  /** ছবির বর্ণনা (screen reader-এর জন্য); Admin-এর লেখা, যে ভাষায় লেখা সেভাবেই দেখায় */
  alt: string;
  /** Banner চাপলে কোথায় যাবে (যেমন কোনো course); না থাকলে null */
  href: string | null;
}

// ---------- সংখ্যার সারি (Spec section 5) ----------

export type StatKey = "students" | "courses" | "mentors" | "videoLectures";

export interface Stat {
  key: StatKey;
  /** System নিজে গুনবে, দিনে একবার হালনাগাদ (Spec section 5) */
  value: number;
}

// ---------- দুই ভাষার লেখা (D-30) ----------

/**
 * Admin-এর লেখা যে content দুই ভাষায় রাখা হয়।
 * `en` ঐচ্ছিক: Admin English না লিখলে English mode-এও বাংলাটা দেখায়।
 */
export interface LocalizedText {
  bn: string;
  en?: string;
}

// ---------- শ্রেণি (Spec section 6, D-04) ----------

export interface Grade {
  id: string;
  /** URL ও filter-এ ব্যবহারের ছোট নাম, যেমন "ssc" */
  slug: string;
  /** Admin-এর লেখা নাম, দুই ভাষায় (D-30) */
  name: LocalizedText;
  /** এক লাইনের ছোট বর্ণনা, দুই ভাষায় (D-30) */
  description: LocalizedText;
  /** Admin-এর upload করা icon; না থাকলে সাধারণ icon দেখানো হয় */
  iconUrl: string | null;
  /** ছোট সংখ্যা আগে দেখায় */
  sortOrder: number;
}

// ---------- কোর্স (Spec 2.3, 2.5) ----------

export interface Course {
  id: string;
  slug: string;
  /** কোন শ্রেণির (Grade.slug) */
  gradeSlug: string;
  /** Admin-এর লেখা নাম, দুই ভাষায় (D-30; client-এর সিদ্ধান্ত বাকি) */
  title: LocalizedText;
  imageUrl: string;
  /** টাকায়; ০ মানে ফ্রি কোর্স */
  price: number;
  lectureCount: number;
  /** ৫-এর মধ্যে, যেমন 4.8 */
  rating: number;
  enrolledCount: number;
}
