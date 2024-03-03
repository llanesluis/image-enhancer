"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const { resolvedTheme } = useTheme();
  console.log(resolvedTheme);
  return (
    <SignIn
      appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
    />
  );
}
