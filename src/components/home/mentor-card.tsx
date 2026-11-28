import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

/** Card দেখানোর জন্য সব লেখা server-এ আগেই চালু ভাষায় বাছা (D-30) */
export type MentorCardData = {
  id: string;
  name: string;
  subject: string;
  university: string;
  photoUrl: string;
  href: string;
};

// একজন মেন্টরের card (wireframe 01, 02)। পুরো card একটাই link → P-12 (Spec 2.3 #8)।
// কোনো click state নেই, তাই server component।
export function MentorCard({ mentor }: { mentor: MentorCardData }) {
  return (
    <Link
      href={mentor.href}
      className="group flex h-full flex-col overflow-hidden rounded-[10px] border bg-card text-card-foreground transition-[translate,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_14px_30px_rgb(0_0_0/0.10)] focus-visible:-translate-y-1 focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0"
    >
      {/* overflow-hidden: zoom-এর সময় বড় হওয়া ছবি এই বর্গের বাইরে যায় না, নিচের লেখা ঢাকে না */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {/* alt ফাঁকা: নাম ঠিক নিচেই লেখা, screen reader-কে একই নাম দুইবার শোনাতে হয় না */}
        <Image
          src={mentor.photoUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 280px, 50vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
        />
      </div>
      <div className="flex flex-col gap-0.5 p-2.5 lg:gap-1 lg:p-4">
        <h3 className="flex items-start gap-0.5 text-[15px] leading-snug font-semibold lg:text-lg">
          <span className="min-w-0">{mentor.name}</span>
          <ChevronRightIcon
            aria-hidden="true"
            className="mt-[0.2em] size-4 shrink-0 text-primary transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0 lg:size-5"
          />
        </h3>
        <p className="text-[13px] text-muted-foreground lg:text-[15px]">{mentor.subject}</p>
        <p className="text-[13px] text-muted-foreground lg:text-sm">{mentor.university}</p>
      </div>
    </Link>
  );
}
