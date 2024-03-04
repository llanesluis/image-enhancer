"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      enableSystem={true}
      defaultTheme="light"
      attribute="class"
    >
      {children}
    </NextThemeProvider>
  );
}
