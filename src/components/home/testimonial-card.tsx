import Image from "next/image";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Card দেখানোর জন্য সব লেখা server-এ আগেই চালু ভাষায় তৈরি */
export type TestimonialCardData = {
  id: string;
  rating: number;
  /** screen reader-এর জন্য, যেমন "৫-এর মধ্যে ৪ তারা" */
  ratingLabel: string;
  text: string;
  studentName: string;
  studentAvatarUrl: string | null;
  /** কোর্স না পাওয়া গেলে null; তখন লাইনটা দেখায় না */
  courseName: string | null;
};

const MAX_STARS = 5;

/**
 * নামের প্রথম "অক্ষর" (grapheme)। শুধু name[0] নিলে "মেহেদী"-র মতো নামে কখনো কখনো
 * অর্ধেক অক্ষর বা কারচিহ্ন আলাদা হয়ে যেতে পারে; Intl.Segmenter পুরো অক্ষর ধরে রাখে।
 */
function getInitial(name: string): string {
  const segments = new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(name.trim());
  const first = segments[Symbol.iterator]().next();
  return first.done ? "" : first.value.segment;
}

// একজন শিক্ষার্থীর মতামত (wireframe 01, 02)। চাপার কিছু নেই, তাই server component।
export function TestimonialCard({ testimonial }: { testimonial: TestimonialCardData }) {
  return (
    <figure className="flex h-full flex-col gap-2.5 rounded-[10px] border bg-card p-4 text-card-foreground lg:gap-3 lg:p-5">
      {/* পাঁচটা icon screen reader-এ একটা ছবি হিসেবে, একটাই বাক্য পড়ে */}
      <span role="img" aria-label={testimonial.ratingLabel} className="flex gap-0.5">
        {Array.from({ length: MAX_STARS }, (_, index) => (
          <StarIcon
            key={index}
            aria-hidden="true"
            className={cn(
              "size-[17px] lg:size-[18px]",
              index < testimonial.rating
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-muted-foreground/40"
            )}
          />
        ))}
      </span>

      <blockquote className="text-[15px] leading-relaxed lg:text-base">{testimonial.text}</blockquote>

      <figcaption className="mt-auto flex items-center gap-2.5 pt-1">
        {testimonial.studentAvatarUrl ? (
          <Image
            src={testimonial.studentAvatarUrl}
            alt=""
            width={40}
            height={40}
            className="size-9 shrink-0 rounded-full object-cover lg:size-10"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-secondary-foreground lg:size-10"
          >
            {getInitial(testimonial.studentName)}
          </span>
        )}
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold lg:text-[15px]">{testimonial.studentName}</span>
          {testimonial.courseName && (
            <span className="text-[13px] text-muted-foreground">{testimonial.courseName}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
