"use client";

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
  const pathname = usePathname();
  const normalNavLinks = navLinks.slice(0, 6);
  const premiumNavLinks = navLinks.slice(6);

  return (
    <>
      {/* NORMAL NAV LINKS */}
      <ul className="lg flex flex-1 gap-1 lg:flex-col lg:gap-4">
        {normalNavLinks.map((navLink) => {
          const isActive = pathname === navLink.route;
          return (
            <li key={navLink.route}>
              <Link
                href={navLink.route}
                className={cn(
                  "group flex min-h-12 flex-1 items-center justify-center gap-1 rounded-md px-4 py-2 text-sm transition hover:bg-primary/10 lg:justify-normal lg:gap-2",
                  navLink.route === "/" && "hidden md:flex",
                  isActive && "bg-blue-700/30 text-blue-600",
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
                <p className="hidden text-xs md:block lg:text-sm">
                  {navLink.label}
                </p>
                <span
                  className="absolute top-12 z-50
            flex size-full min-h-10 min-w-[90px] scale-0 items-center justify-center rounded-md bg-border text-center text-xs before:absolute before:-top-1 before:-z-10 before:size-3 before:rotate-45 before:bg-border group-hover:scale-100 group-hover:transition-transform group-hover:delay-200 md:hidden"
                >
                  {navLink.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* PREMIUM NAV LINKS */}
      <SignedIn>
        <ul className="flex gap-1 max-lg:pl-2 lg:flex-col lg:gap-4 lg:pt-4">
          {premiumNavLinks.map((navLink) => {
            const isActive = pathname === navLink.route;
            return (
              <li key={navLink.route}>
                <Link
                  href={navLink.route}
                  className={cn(
                    "group relative flex min-h-12 flex-1 items-center justify-center gap-1 rounded-md px-4 py-2 text-sm transition hover:bg-primary/10 lg:justify-normal lg:gap-2",
                    navLink.route === "/" && "hidden md:flex",
                    isActive && "bg-blue-700/30 text-blue-600",
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
                  <p className="hidden text-xs md:block lg:text-sm">
                    {navLink.label}
                  </p>
                  <span
                    className="absolute top-12 z-50
            flex size-full min-h-10 min-w-[90px] scale-0 items-center justify-center rounded-md bg-border text-center text-xs before:absolute before:-top-1 before:-z-10 before:size-3 before:rotate-45 before:bg-border group-hover:scale-100 group-hover:transition-transform group-hover:delay-200 md:hidden"
                  >
                    {navLink.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </SignedIn>
    </>
  );
}
