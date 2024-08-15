import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "../ui/toaster";
import { ScreenIndicators } from "../indicators/screen-indicators";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ScreenIndicators />
      <Toaster />
    </ThemeProvider>
  );
}
