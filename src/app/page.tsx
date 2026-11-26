import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";

// P-01 Home page। Section-গুলো একে একে যোগ হবে (Spec 2.3-এর ক্রমে)।
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
    </main>
  );
}
