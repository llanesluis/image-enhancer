"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Inicia sesión para acceder a tu cuenta de Pickuro.",
};

export default function SignInPage() {
  const { resolvedTheme } = useTheme();
  return (
    <SignIn
      appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
    />
  );
}
