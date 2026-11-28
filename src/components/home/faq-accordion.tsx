"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { MinusIcon, PlusIcon } from "lucide-react";

/** Server-এ চালু ভাষায় বাছা লেখা (D-30, D-32) */
export type FaqAccordionItem = {
  id: string;
  question: string;
  answer: string;
};

// প্রশ্ন চাপলে উত্তর খোলে, প্রথমটা শুরুতে খোলা (Spec 2.3 #10; wireframe 01, 02)।
// shadcn-এর AccordionTrigger-এ chevron বসানো, wireframe-এ +/−; তাই ui/ file না বদলে (D-17)
// একই radix primitive দিয়ে নিজের চেহারা (D-43)।
export function FaqAccordion({ items }: { items: FaqAccordionItem[] }) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={items[0]?.id}
      className="flex flex-col gap-2 lg:gap-2.5"
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          // খোলা প্রশ্নের বাক্সে pink border (radix Item-এও data-state বসায়); শুধু রং বদল, D-39 মেনে (D-46)
          className="rounded-[10px] border bg-card text-card-foreground transition-colors duration-200 data-[state=open]:border-primary"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex min-h-[52px] w-full items-center justify-between gap-2.5 rounded-[10px] px-3.5 py-2.5 text-left text-[15px] font-semibold transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:min-h-14 lg:gap-3 lg:px-[18px] lg:text-[17px]">
              {item.question}
              {/* বন্ধ থাকলে +, খোলা থাকলে − (radix-এর data-state দেখে, CSS দিয়ে) */}
              <PlusIcon
                aria-hidden="true"
                className="size-5 shrink-0 text-primary group-data-[state=open]:hidden"
              />
              <MinusIcon
                aria-hidden="true"
                className="hidden size-5 shrink-0 text-primary group-data-[state=open]:block"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          {/* খোলা/বন্ধের উচ্চতা animation: tw-animate-css-এর accordion keyframe (D-39-এর ব্যতিক্রম, journal দেখুন) */}
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none">
            <p className="px-3.5 pb-3.5 text-sm leading-relaxed text-muted-foreground lg:px-[18px] lg:pb-[18px] lg:text-[15px]">
              {item.answer}
            </p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
