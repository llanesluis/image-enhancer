import Image from "next/image";
import Link from "next/link";
import ClerkUserButton from "./ClerkUserButton";
import { NavLinks } from "./NavLinks";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { MobileNavLinks } from "./MobileNavLinks";

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
          <div className="hidden sm:block">
            <SignedIn>
              <ClerkUserButton />
            </SignedIn>
            <SignedOut>
              <Button>
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>
          </div>

          {/* SMALL SCREENS */}
          <nav className="hidden max-md:block">
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

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center">
        <MenuIcon />
      </SheetTrigger>

      <SheetContent>
        <aside className="size-full">
          <div className="flex flex-col justify-between gap-8 divide-y">
            {/* LOGO / HOME PAGE */}
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

            {/* NAV LINKS */}
            <div className="size-full pt-4">
              <MobileNavLinks />
            </div>

            <div className="flex justify-center pt-4">
              <SignedOut>
                <Button className="w-full">
                  <Link href="/sign-in">Login</Link>
                </Button>
              </SignedOut>
            </div>
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  );
}
