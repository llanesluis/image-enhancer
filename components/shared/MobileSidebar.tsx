"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { MobileNavLinks } from "./MobileNavLinks";
import { Button } from "../ui/button";
import { SignedOut } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

export function MobileSidebar() {
  const matches = useMediaQuery("(min-width: 768px)");
  if (matches) return null;

  return (
    <Sheet>
      <SheetTrigger className="flex items-center">
        <MenuIcon />
      </SheetTrigger>

      <SheetContent className="w-64">
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
