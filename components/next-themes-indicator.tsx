"use client";

import { useTheme } from "next-themes";

export function NextThemeIndicator() {
  //NOTE: Usa next themes.
  const { resolvedTheme, setTheme } = useTheme();

  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="absolute  z-50">
      <select
        className="fixed bottom-2 right-2 rounded-lg bg-primary/80 px-2 py-1 text-secondary/80"
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
