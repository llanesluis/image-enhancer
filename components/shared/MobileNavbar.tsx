"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import User from "./User";
import { NavLink } from "./NavLink";
import { normalNavLinks, premiumNavLinks } from "@/constants/navlinks";

export default function MobileSidebar() {
  const { user } = useUser();

  return (
    <Sheet>
      <SheetTrigger className="flex items-center">
        <MenuIcon />
      </SheetTrigger>

      <SheetContent className="h-full w-72 ">
        <div className="flex flex-col gap-4 divide-y">
          {/* Logo */}
          <SheetHeader>
            <Link href="/">
              <Image
                src="/pickuro-icon.png"
                alt="logo"
                width={40}
                height={40}
              />
            </Link>
          </SheetHeader>

          <Separator orientation="horizontal" />

          {/* Nav links */}
          <MobileNavLinks />

          {/* User */}
          <div className="pt-4">
            <SignedIn>
              <div className="flex gap-2">
                <User />
                <span className="text-sm">{user?.fullName}</span>
              </div>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant={"link"} className="w-full">
                  Login
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function MobileNavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex size-full flex-col gap-4 divide-y">
      {/* NORMAL NAV LINKS */}
      <ul className="space-y-2">
        {normalNavLinks.map((navLink) => {
          const isActive = pathname === navLink.route;
          return (
            <li key={navLink.route}>
              <SheetClose asChild key={navLink.route}>
                <NavLink navLink={navLink} isActive={isActive} />
              </SheetClose>
            </li>
          );
        })}
      </ul>

      {/* PREMIUM NAV LINKS */}
      <SignedIn>
        <ul className="space-y-2 pt-4">
          {premiumNavLinks.map((navLink) => {
            const isActive = pathname === navLink.route;
            return (
              <li key={navLink.route}>
                <SheetClose asChild key={navLink.route}>
                  <NavLink navLink={navLink} isActive={isActive} />
                </SheetClose>
              </li>
            );
          })}
        </ul>
      </SignedIn>
    </nav>
  );
}
