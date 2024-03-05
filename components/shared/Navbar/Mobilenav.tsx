import { SignedIn, SignedOut } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClerkUserButton from "../ClerkUserButton";
import ClerkUserButtonWithName from "../ClerkUserButtonWithName";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MobileNavLinks } from "./NavLinks";

// MOBILE NAV
export default function Mobilenav() {
  return (
    <aside className="flex items-center gap-2 p-3 md:hidden">
      <div className="flex size-full min-h-12 items-center justify-between gap-8 text-right">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        {/* User */}
        <div className="flex items-center gap-2">
          <SignedIn>
            <ClerkUserButtonWithName />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button>Login</Button>
            </Link>
          </SignedOut>

          {/* Mobile Sidebar */}
          <MobileSidebar />
        </div>
      </div>
    </aside>
  );
}

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center">
        <MenuIcon />
      </SheetTrigger>

      <SheetContent className="w-64">
        <div className="size-full">
          <div className="flex flex-col gap-8 divide-y">
            {/* Logo */}
            <SheetHeader>
              <Link href="/">
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={180}
                  height={28}
                />
              </Link>
            </SheetHeader>

            {/* Nav links */}
            <nav className="size-full pt-4">
              <MobileNavLinks />
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
