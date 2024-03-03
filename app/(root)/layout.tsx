import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";

interface InnerRootLayoutProps {
  children: ReactNode;
}

export default function InnerRootLayout({ children }: InnerRootLayoutProps) {
  return (
    <main className="bg-red-400 p-12">
      {/* NAVS */}
      <header className="flex justify-between bg-green-300 p-2">
        <h1>navbar xd</h1>
        <Link href={"/sign-in"}>Sign In</Link>
        <Link href={"/sign-up"}>Sign Up</Link>
        <UserButton afterSignOutUrl="/" />
      </header>
      {children}
    </main>
  );
}
