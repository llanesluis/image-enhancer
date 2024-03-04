"use client";

import { normalNavLinks, premiumNavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "../ui/sheet";
import { SignedIn } from "@clerk/nextjs";

export function MobileNavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex size-full flex-col gap-2">
      {/* NORMAL NAV LINKS */}
      <ul>
        {normalNavLinks.map((navLink) => {
          const isActive = pathname === navLink.route;
          return (
            <SheetClose key={navLink.route} asChild>
              <li>
                <Link
                  href={navLink.route}
                  className={cn(
                    "flex max-h-12 flex-1 items-center justify-normal gap-2 rounded-md px-4 py-2 text-sm transition hover:bg-primary/10 ",
                    isActive && "bg-blue-900/20 text-blue-600",
                  )}
                >
                  <Image
                    src={navLink.icon}
                    alt={`${navLink.label} icon`}
                    width={24}
                    height={24}
                    className={cn(
                      "shrink-0 opacity-50 transition",
                      isActive ? "opacity-100" : undefined,
                    )}
                  />
                  <p className="text-sm">{navLink.label}</p>
                </Link>
              </li>
            </SheetClose>
          );
        })}
      </ul>

      {/* PREMIUM NAV LINKS */}
      <SignedIn>
        <ul>
          {premiumNavLinks.map((navLink) => {
            const isActive = pathname === navLink.route;
            return (
              <SheetClose key={navLink.route} asChild>
                <li>
                  <Link
                    href={navLink.route}
                    className={cn(
                      "flex max-h-12 flex-1 items-center justify-normal gap-2 rounded-md px-4 py-2 text-sm transition hover:bg-primary/10 ",
                      isActive && "bg-blue-900/20 text-blue-600",
                    )}
                  >
                    <Image
                      src={navLink.icon}
                      alt={`${navLink.label} icon`}
                      width={24}
                      height={24}
                      className={cn(
                        "shrink-0 opacity-50 transition",
                        isActive ? "opacity-100" : undefined,
                      )}
                    />
                    <p className="text-sm">{navLink.label}</p>
                  </Link>
                </li>
              </SheetClose>
            );
          })}
        </ul>
      </SignedIn>
    </nav>
  );
}
