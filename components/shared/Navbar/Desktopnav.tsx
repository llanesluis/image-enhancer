import Image from "next/image";
import Link from "next/link";
import { DesktopNavLinks } from "./NavLinks";
import ClerkUserButtonWithName from "../ClerkUserButtonWithName";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// DESKTOP NAV
export default function Desktopnav() {
  return (
    <aside className="hidden size-full p-3 md:flex lg:p-6">
      <div className="flex size-full flex-col md:gap-2 lg:gap-8 lg:divide-y">
        {/* Logo */}
        <div className="flex min-h-12 items-center ">
          <Link href="/">
            <Image
              src="/assets/images/logo-text.svg"
              alt="logo"
              width={180}
              height={28}
            />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex md:flex-row md:gap-2 md:divide-x lg:flex-col lg:gap-4 lg:divide-x-0 lg:divide-y lg:pt-4">
          <DesktopNavLinks />
        </nav>

        {/* User Desktop */}
        <div className="hidden min-h-12 justify-center pt-4 text-right md:absolute md:right-4 md:top-0 md:block lg:relative lg:right-0 lg:flex">
          <SignedIn>
            <ClerkUserButtonWithName />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </aside>
  );
}
