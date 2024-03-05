"use client";

import { normalNavLinks, premiumNavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "../../ui/sheet";
interface NavLinkProps {
  navLink: {
    route: string;
    label: string;
    icon: string;
  };
  isActive: boolean;
}
function NavLink({ navLink, isActive, ...props }: NavLinkProps) {
  return (
    <Link
      {...props}
      href={navLink.route}
      className={cn(
        "flex min-h-12 items-center justify-normal gap-1 rounded-md px-4 py-2 text-sm transition hover:bg-primary/10 md:justify-center lg:justify-normal lg:gap-2",
        isActive &&
          "text-accentcolor bg-blue-900/10 font-bold outline-dashed outline-1",
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
      <p className="text-xs lg:text-sm">{navLink.label}</p>
    </Link>
  );
}

export function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row gap-2 divide-x lg:flex-col lg:gap-4 lg:divide-x-0 lg:divide-y lg:pt-4">
      {/* NORMAL NAV LINKS */}
      <ul className="flex gap-1 lg:flex-col lg:gap-4">
        {normalNavLinks.map((navLink) => {
          const isActive = pathname === navLink.route;
          return (
            <li key={navLink.route} className="flex-1">
              <NavLink navLink={navLink} isActive={isActive} />
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
              <li key={navLink.route} className="flex-1">
                <NavLink navLink={navLink} isActive={isActive} />
              </li>
            );
          })}
        </ul>
      </SignedIn>
    </nav>
  );
}

export function MobileNavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex size-full flex-col gap-2 divide-y pt-2">
      {/* NORMAL NAV LINKS */}
      <ul>
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
        <ul className="pt-2">
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
