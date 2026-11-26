// Mock login অবস্থা: backend ও আসল login (A-03) আসা পর্যন্ত।
// Visitor আর student-এর UI দেখতে নিচের MOCK_AUTH_STATUS-এর মান বদলান।
// কীভাবে toggle হবে (config নাকি browser থেকে) সেটা পরে ঠিক হবে (D-05)।

import type { AuthState, AuthStatus, StudentUser } from "@/lib/types";

export const mockStudent: StudentUser = {
  id: "stu_001",
  name: "রাফি আহমেদ",
  avatarUrl: null,
};

// "visitor" অথবা "student"
const MOCK_AUTH_STATUS = "visitor" as AuthStatus;

export function getMockAuth(): AuthState {
  if (MOCK_AUTH_STATUS === "student") {
    return { status: "student", user: mockStudent };
  }
  return { status: "visitor" };
}
