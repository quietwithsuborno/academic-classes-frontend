"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Spec B-11: শুরুতে light, phone-এর setting দেখা হবে না (enableSystem=false),
// user-এর বাছাই next-themes নিজেই localStorage-এ মনে রাখে।
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
