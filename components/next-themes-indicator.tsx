"use client";

import { useTheme } from "next-themes";

export function NextThemeIndicator() {
  //NOTE: Usa next themes.
  const { resolvedTheme, setTheme } = useTheme();

  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="absolute z-[150]">
      <select
        className="fixed bottom-2 right-2 rounded-lg border-2 border-foreground bg-background/80 px-2 py-1 text-foreground/80"
        value={resolvedTheme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
}
