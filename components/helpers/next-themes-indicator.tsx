"use client";

import { useTheme } from "next-themes";

export function NextThemesIndicator() {
  //Note: Usa next themes.
  const { resolvedTheme, setTheme } = useTheme();

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-4 left-16 z-50">
      <select
        className="rounded-full border-2 border-foreground bg-background px-2 py-1 text-foreground"
        value={resolvedTheme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
