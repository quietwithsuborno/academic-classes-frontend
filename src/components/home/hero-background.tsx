import type { CSSProperties } from "react";
import {
  AtomIcon,
  BookOpenIcon,
  CalculatorIcon,
  FlaskConicalIcon,
  GlobeIcon,
  GraduationCapIcon,
  LightbulbIcon,
  PencilIcon,
  PiIcon,
  RulerIcon,
  SearchIcon,
  SigmaIcon,
  type LucideIcon,
} from "lucide-react";

// Hero-র পেছনে পড়াশোনার icon নিচ থেকে ভেসে উঠে মিলিয়ে যায় (D-25)।
// শুধু সাজসজ্জা: screen reader পড়ে না (aria-hidden), click-এ বাধা দেয় না
// (pointer-events-none), Reduce motion চালু থাকলে পুরোটা লুকানো।
// JavaScript লাগে না, তাই server component।

type FloatingItem = {
  /** Icon, অথবা icon-এর বদলে একটা অক্ষর (যেমন "?") */
  icon: LucideIcon | string;
  /** বাম দিক থেকে কত % দূরে */
  left: string;
  size: number;
  /** একবার উঠতে কত সেকেন্ড */
  duration: number;
  /** ঋণাত্মক দেরি: page খোলার সময়ই icon-গুলো মাঝপথে থাকে, সব একসাথে নিচ থেকে শুরু হয় না */
  delay: number;
  rotate: number;
};

const items: FloatingItem[] = [
  { icon: BookOpenIcon, left: "4%", size: 30, duration: 17, delay: -2, rotate: 18 },
  { icon: PencilIcon, left: "12%", size: 22, duration: 14, delay: -9, rotate: -25 },
  { icon: "?", left: "20%", size: 34, duration: 19, delay: -5, rotate: 12 },
  { icon: CalculatorIcon, left: "28%", size: 24, duration: 15, delay: -12, rotate: -15 },
  { icon: SearchIcon, left: "36%", size: 26, duration: 18, delay: -1, rotate: 22 },
  { icon: AtomIcon, left: "45%", size: 28, duration: 20, delay: -14, rotate: 30 },
  { icon: SigmaIcon, left: "53%", size: 22, duration: 16, delay: -7, rotate: -20 },
  { icon: GraduationCapIcon, left: "61%", size: 32, duration: 19, delay: -10, rotate: 15 },
  { icon: FlaskConicalIcon, left: "69%", size: 24, duration: 15, delay: -3, rotate: -18 },
  { icon: LightbulbIcon, left: "77%", size: 26, duration: 17, delay: -13, rotate: 20 },
  { icon: PiIcon, left: "85%", size: 22, duration: 14, delay: -6, rotate: -28 },
  { icon: RulerIcon, left: "92%", size: 26, duration: 18, delay: -11, rotate: 25 },
  { icon: GlobeIcon, left: "8%", size: 24, duration: 21, delay: -16, rotate: -12 },
  { icon: "?", left: "57%", size: 26, duration: 16, delay: -15, rotate: -10 },
];

export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden text-primary [--float-opacity:0.38] motion-reduce:hidden dark:[--float-opacity:0.32]"
    >
      {items.map((item, index) => {
        const style = {
          left: item.left,
          "--float-duration": `${item.duration}s`,
          "--float-delay": `${item.delay}s`,
          "--float-rotate": `${item.rotate}deg`,
        } as CSSProperties;

        const Icon = item.icon;
        return (
          <span
            key={index}
            style={style}
            className="absolute -bottom-10 animate-float-up opacity-0 will-change-transform"
          >
            {typeof Icon === "string" ? (
              <span
                className="block leading-none font-bold"
                style={{ fontSize: item.size }}
              >
                {Icon}
              </span>
            ) : (
              <Icon size={item.size} strokeWidth={2} />
            )}
          </span>
        );
      })}
    </div>
  );
}
