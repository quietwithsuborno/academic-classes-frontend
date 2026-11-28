import { CoursesSection } from "@/components/home/courses-section";
import { FaqSection } from "@/components/home/faq-section";
import { GradeFilterProvider } from "@/components/home/grade-filter-context";
import { GradesSection } from "@/components/home/grades-section";
import { HeroSection } from "@/components/home/hero-section";
import { MentorsSection } from "@/components/home/mentors-section";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";

// P-01 Home page। Section-গুলো একে একে যোগ হবে (Spec 2.3-এর ক্রমে)।
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      {/* শ্রেণি আর কোর্সসমূহ একই filter ভাগ করে, তাই একই provider-এর ভেতরে */}
      <GradeFilterProvider>
        <GradesSection />
        <CoursesSection />
      </GradeFilterProvider>
      <MentorsSection />
      <TestimonialsSection />
      <FaqSection />
    </main>
  );
}
