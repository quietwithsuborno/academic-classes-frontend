import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

export const instant = false;

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Academic Classes",
  description: "এসএসসি ও এইচএসসি শিক্ষার্থীদের জন্য অনলাইন কোর্স",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    // suppressHydrationWarning: next-themes <html>-এ "dark" class বসায়, তাই দরকার
    // data-scroll-behavior: globals.css-এ smooth scroll চালু; Next.js page বদলের সময়
    // সেটা সাময়িক বন্ধ রাখে, যাতে নতুন page লাফিয়ে না গিয়ে সোজা উপরে খোলে (D-28)
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${hindSiliguri.variable} font-sans antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider>
            {/* সব page-এ একই header (D-18) */}
            <Header />
            {children}
            {/* সব page-এ একই footer (D-47) */}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
