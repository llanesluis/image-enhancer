"use client";

import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { normalNavLinks, premiumNavLinks } from "@/constants/navlinks";
import Image from "next/image";

export default function DesktopNavbar() {
  return (
    <NavigationMenu orientation="vertical">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Herramientas</NavigationMenuTrigger>
          <NavigationMenuContent className="border-t-4 border-t-accentcolor">
            <DesktopNavLinks />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <SignedIn>
          {premiumNavLinks.map((link) => {
            return (
              <NavigationMenuItem key={link.route}>
                <Link href={link.route} passHref legacyBehavior>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </SignedIn>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
        {normalNavLinks.map((link) => {
          const isActive = pathname === link.route;
          if (link.route === "/") return;
          return (
            <li key={link.route}>
              <Link href={link.route} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "flex min-h-12 items-center gap-2 rounded-md px-4 py-2 text-sm transition hover:bg-primary/10",
                    isActive &&
                      " font-bold text-accentcolor outline-dashed outline-1 outline-accentcolor",
                  )}
                >
                  <Image
                    height={24}
                    width={24}
                    src={link.icon}
                    alt={`${link.label} icon`}
                  />
                  <p className="text-sm">{link.label}</p>
                </NavigationMenuLink>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
