import Image from "next/image";
import Link from "next/link";
import { DesktopNavLinks } from "./NavLinks";
import ClerkUserButtonWithName from "../ClerkUserButtonWithName";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// DESKTOP NAV
export default function Desktopnav() {
  return (
    <aside className="sticky top-0 bg-background p-4 md:block lg:h-screen lg:w-64 lg:p-8">
      <div className="flex flex-col md:gap-2 lg:gap-8 lg:divide-y">
        {/* Logo */}
        <div className="flex min-h-12 items-center ">
          <Link href="/">
            <Image
              //src="/assets/images/logo-text.svg"
              src="/pickuro-logo.png"
              alt="logo"
              width={198}
              height={31}
            />
          </Link>
        </div>

        {/* Nav Links */}
        <DesktopNavLinks />

        {/* User Desktop */}
        <div className="absolute right-4 top-0 min-h-12 pt-4 text-right lg:relative lg:right-0">
          <SignedIn>
            <ClerkUserButtonWithName />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button className="w-full" variant={"outline"}>
                Login
              </Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </aside>
  );
}
