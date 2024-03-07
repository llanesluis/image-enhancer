"use client";

import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function UserProfilePage() {
  const { resolvedTheme } = useTheme();
  return (
    <UserProfile
      path="/user-profile"
      routing="path"
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
    />
  );
}
