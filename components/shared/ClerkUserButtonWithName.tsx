"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

export default function ClerkUserButtonWithName() {
  const { resolvedTheme } = useTheme();
  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
      showName
    />
  );
}
