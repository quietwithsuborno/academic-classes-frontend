"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Banner } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  banners: Banner[];
  labels: { region: string; prev: string; next: string };
};

// Banner slider (Spec section 2): প্রায় ৫ সেকেন্ড পর পর নিজে ঘোরে, শেষে গিয়ে আবার প্রথমে (loop)।
// Desktop-এ আগে/পরে button; mobile-এ আঙুল দিয়ে টানা (swipe)। নিচে বিন্দু।
export function BannerSlider({ banners, labels }: Props) {
  // Plugin একবারই বানানো হয়। useRef না নিয়ে useState: render-এর সময় ref.current
  // পড়লে নতুন react-hooks lint rule আপত্তি করে।
  const [autoplay] = React.useState(() =>
    Autoplay({
      delay: 5000,
      stopOnInteraction: false, // user টানলেও পরে আবার নিজে ঘোরা শুরু করে
      stopOnMouseEnter: true, //   mouse রাখলে থামে, পড়ার সময় পাওয়া যায়
      // Phone/computer-এ "Reduce motion" চালু থাকলে নিজে ঘোরা বন্ধ
      breakpoints: { "(prefers-reduced-motion: reduce)": { active: false } },
    })
  );
  const [api, setApi] = React.useState<CarouselApi>();

  // কোন banner এখন দেখাচ্ছে: embla থেকে সরাসরি পড়া (carousel.tsx-এর মতো একই pattern)
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!api) return () => {};
      api.on("select", onChange);
      api.on("reInit", onChange);
      return () => {
        api.off("select", onChange);
        api.off("reInit", onChange);
      };
    },
    [api]
  );
  const selected = React.useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0
  );

  if (banners.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay]}
        setApi={setApi}
        aria-label={labels.region}
        className="overflow-hidden rounded-[10px] lg:rounded-xl"
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <BannerImage banner={banner} isFirst={index === 0} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {banners.length > 1 && <BannerArrows labels={labels} />}
      </Carousel>

      {/* বিন্দু: শুধু দেখানোর জন্য (wireframe-এ aria-hidden) */}
      {banners.length > 1 && (
        <div className="flex justify-center gap-1.5" aria-hidden="true">
          {banners.map((banner, index) => (
            <span
              key={banner.id}
              className={cn(
                "h-1.5 rounded-full transition-all motion-reduce:transition-none",
                index === selected ? "w-[22px] bg-primary" : "w-1.5 bg-foreground/25"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BannerImage({ banner, isFirst }: { banner: Banner; isFirst: boolean }) {
  const image = (
    <div className="relative aspect-video w-full bg-muted">
      <Image
        src={banner.imageUrl}
        alt={banner.alt}
        fill
        sizes="(min-width: 1024px) 740px, 100vw"
        // প্রথম banner page খোলার সাথে সাথে দেখা যায়, তাই আগে load হয়
        loading={isFirst ? "eager" : "lazy"}
        fetchPriority={isFirst ? "high" : "auto"}
        className="object-cover"
      />
    </div>
  );

  if (!banner.href) return image;
  return (
    <Link href={banner.href} className="block">
      {image}
    </Link>
  );
}

// নিজের arrow button: shadcn-এর CarouselPrevious/Next banner-এর বাইরে বসে
// আর 32px ছোট; আমাদের দরকার banner-এর ভেতরে, 44px (B-07), শুধু desktop-এ।
function BannerArrows({ labels }: { labels: Props["labels"] }) {
  const { scrollPrev, scrollNext } = useCarousel();
  const arrowClass =
    "absolute top-1/2 hidden size-11 -translate-y-1/2 rounded-full bg-background/90 shadow-md lg:inline-flex";

  return (
    <>
      <Button
        type="button"
        variant="outline"
        aria-label={labels.prev}
        onClick={scrollPrev}
        className={cn(arrowClass, "left-3.5")}
      >
        <ChevronLeftIcon className="size-5" />
      </Button>
      <Button
        type="button"
        variant="outline"
        aria-label={labels.next}
        onClick={scrollNext}
        className={cn(arrowClass, "right-3.5")}
      >
        <ChevronRightIcon className="size-5" />
      </Button>
    </>
  );
}
