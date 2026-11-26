// Mock banner: Admin panel আর API আসা পর্যন্ত।
// ছবিগুলো public/mock/banners/-এ রাখা নকল ছবি (1600×900)।

import { routes } from "@/config/site";
import type { Banner } from "@/lib/types";

const mockBanners: Banner[] = [
  {
    id: "banner_1",
    imageUrl: "/mock/banners/banner-1.jpg",
    alt: "এসএসসি ২০২৭ ব্যাচে ভর্তি চলছে",
    href: routes.courses,
  },
  {
    id: "banner_2",
    imageUrl: "/mock/banners/banner-2.jpg",
    alt: "এইচএসসি পদার্থবিজ্ঞান ফুল কোর্স",
    href: routes.courses,
  },
  {
    id: "banner_3",
    imageUrl: "/mock/banners/banner-3.jpg",
    alt: "ফ্রি ক্লাস: গণিতের ভিত্তি",
    href: null,
  },
];

// Backend এলে এখানে API call বসবে; component একই থাকবে (D-16)।
export function getMockBanners(): Banner[] {
  return mockBanners;
}
