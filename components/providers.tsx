import { ReactNode } from "react";
import { TailwindIndicator } from "./helpers/tailwind-indicator";
import { NextThemesIndicator } from "./helpers/next-themes-indicator";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <TailwindIndicator />
      <NextThemesIndicator />
    </>
  );
}
