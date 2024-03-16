import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface NavLinkProps {
  navLink: {
    route: string;
    label: string;
    icon: string;
  };
  isActive: boolean;
}
export function NavLink({ navLink, isActive, ...props }: NavLinkProps) {
  return (
    <Link
      {...props}
      href={navLink.route}
      className={cn(
        "flex min-h-12 items-center gap-2 rounded-md px-4 py-2 text-sm transition hover:bg-secondary",
        isActive &&
          "bg-accentcolor/10 font-bold text-accentcolor hover:bg-accentcolor/10",
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
  );
}
