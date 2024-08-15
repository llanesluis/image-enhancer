"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  navLink: {
    route: string;
    label: string;
    icon: string;
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
      <span>{navLink.label}</span>
    </Link>
  );
}
