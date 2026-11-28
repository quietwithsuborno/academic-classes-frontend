// Mock সাধারণ জিজ্ঞাসা: Admin panel আর API আসা পর্যন্ত।
// প্রশ্নগুলো wireframe থেকে। প্রথম উত্তরটা spec-এর (FR-AUTH-06: সর্বোচ্চ ২টি ডিভাইস);
// বাকি উত্তর নমুনা — আসল লেখা client/Admin দেবেন (পেমেন্টের পদ্ধতি, সময় ইত্যাদি)।

import type { FaqItem } from "@/lib/types";

const mockFaqs: FaqItem[] = [
  {
    id: "faq_devices",
    question: {
      bn: "একটি অ্যাকাউন্ট কয়টি ডিভাইসে ব্যবহার করা যাবে?",
      en: "How many devices can one account be used on?",
    },
    answer: {
      bn: "একই অ্যাকাউন্ট থেকে সর্বোচ্চ ২টি ডিভাইসে লগইন করা যাবে।",
      en: "You can log in from at most 2 devices with the same account.",
    },
    sortOrder: 1,
  },
  {
    id: "faq_payment",
    question: { bn: "পেমেন্ট কীভাবে করব?", en: "How do I pay?" },
    answer: {
      bn: "কোর্সটি কার্টে যোগ করে চেকআউট পেজে যান। সেখানে পেমেন্টের সব পদ্ধতি দেখানো থাকবে।",
      en: "Add the course to your cart and go to the checkout page. All payment methods are shown there.",
    },
    sortOrder: 2,
  },
  {
    id: "faq_manual_payment",
    question: {
      bn: "ম্যানুয়াল পেমেন্টের পর কখন কোর্স পাব?",
      en: "When will I get the course after a manual payment?",
    },
    answer: {
      bn: "আমাদের টিম পেমেন্ট যাচাই করার পর কোর্সটি আপনার ড্যাশবোর্ডে চালু হয়ে যাবে।",
      en: "Once our team verifies the payment, the course will be unlocked in your dashboard.",
    },
    sortOrder: 3,
  },
  {
    id: "faq_free_videos",
    question: { bn: "ফ্রি ভিডিও কীভাবে দেখব?", en: "How do I watch the free videos?" },
    answer: {
      bn: "কোর্সের বিস্তারিত পেজে \"ফ্রি\" চিহ্ন দেওয়া ভিডিওতে চাপলেই দেখা যাবে।",
      en: "On the course details page, tap any video marked \"Free\" to watch it.",
    },
    sortOrder: 4,
  },
];

export function getMockFaqs(): FaqItem[] {
  return [...mockFaqs].sort((a, b) => a.sortOrder - b.sortOrder);
}
