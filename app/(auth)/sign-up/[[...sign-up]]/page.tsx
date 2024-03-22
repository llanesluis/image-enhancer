"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: "Crea una cuenta para acceder a Pickuro.",
};
export default function SignUpPage() {
  const { resolvedTheme } = useTheme();
  return (
    <SignUp
      appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
    />
  );
}
