import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import ClerkUserButtonWithName from "./ClerkUserButtonWithName";
import ClerkUserButton from "./ClerkUserButton";
import { MobileSidebar } from "./MobileSidebar";

export default function Mobilenav() {
  return (
    <header className="flex min-h-16 items-center gap-2 p-2 md:flex-col md:divide-y md:px-4 md:py-3 lg:hidden ">
      <div className="flex size-full items-center justify-between gap-8 text-right">
        <Link href="/">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <div className="flex items-center gap-2">
          <SignedIn>
            <div className="block sm:hidden">
              <ClerkUserButton />
            </div>
            <div className="hidden sm:block">
              <ClerkUserButtonWithName />
            </div>
          </SignedIn>
          <SignedOut>
            <Button className="hidden sm:block">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>

          {/* SMALL SCREENS */}
          <nav className="md:hidden">
            <MobileSidebar />
          </nav>
        </div>
      </div>

      <nav className="hidden gap-2 divide-x pt-3 md:flex">
        <NavLinks />
      </nav>
    </header>
  );
}
