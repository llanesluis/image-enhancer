"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ScreenIndicators() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="text-md fixed bottom-5 left-5 isolate flex h-10 w-fit items-center justify-between gap-4 rounded bg-background/20 p-2 text-sm font-bold shadow-lg ring-1 ring-primary/5 backdrop-blur-md">
      <ScreenSizeIndicator />
      <ThemeIndicator />
    </div>
  );
}

function ScreenSizeIndicator() {
  return (
    <div className="flex items-center justify-center">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}

export default function ThemeIndicator() {
  const { setTheme } = useTheme();

  return (
    <>
      <button className="block dark:hidden" onClick={() => setTheme("dark")}>
        <Moon size={20} />
      </button>
      <button className="hidden dark:block" onClick={() => setTheme("light")}>
        <Sun size={20} />
      </button>
    </>
  );
}
