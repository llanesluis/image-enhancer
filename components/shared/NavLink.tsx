"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  navLink: {
    route: string;
    label: string;
  };
}
export function NavLink({ navLink, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === navLink.route;
  return (
    <Link
      {...props}
      href={navLink.route}
      className={cn(
        "flex min-h-12 items-center gap-2 rounded-md px-4 py-2 text-sm transition hover:text-accentcolor",
        isActive && "font-bold text-accentcolor",
      )}
    >
      <span>{navLink.label}</span>
    </Link>
  );
}
