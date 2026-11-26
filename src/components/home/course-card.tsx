import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Card দেখানোর জন্য সব লেখা server-এ আগেই চালু ভাষায় তৈরি (D-32) */
export type CourseCardData = {
  id: string;
  /** filter-এর জন্য */
  gradeSlug: string;
  isFree: boolean;
  /** দেখানোর জন্য */
  title: string;
  gradeName: string;
  imageUrl: string;
  href: string;
  badgeText: string;
  priceText: string;
  /** ঐচ্ছিক তথ্য (লেকচার, রেটিং, এনরোল্ড); ফাঁকা হলে পুরো লাইন সরে যায় (Spec 2.5) */
  meta: string[];
};

// একটা কোর্সের card (wireframe 01, 02, 05)।
export function CourseCard({
  course,
  detailsLabel,
  className,
}: {
  course: CourseCardData;
  detailsLabel: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-[10px] border bg-card text-card-foreground",
        "transition-[translate,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgb(0_0_0/0.10)]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className
      )}
    >
      <div className="relative aspect-video bg-muted">
        <Image
          src={course.imageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 280px, 100vw"
          className="object-cover"
        />
        <span
          className={cn(
            "absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[13px] font-semibold",
            course.isFree
              ? "bg-emerald-700 text-white"
              : "bg-primary text-primary-foreground"
          )}
        >
          {course.badgeText}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5 lg:gap-2 lg:p-4">
        <span className="self-start rounded bg-secondary px-2 py-px text-[13px] text-secondary-foreground">
          {course.gradeName}
        </span>
        <h3 className="text-lg leading-snug font-semibold">{course.title}</h3>
        {course.meta.length > 0 && (
          <p className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-muted-foreground">
            {course.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-1.5 lg:pt-2.5">
          <span
            className={cn(
              "text-[19px] font-bold lg:text-xl",
              course.isFree && "text-emerald-700 dark:text-emerald-400"
            )}
          >
            {course.priceText}
          </span>
          <Link
            href={course.href}
            className="flex h-11 shrink-0 items-center rounded-md border border-primary px-3.5 text-[15px] font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {detailsLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
