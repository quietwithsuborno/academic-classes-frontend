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
