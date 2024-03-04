import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/button";
import ClerkUserButtonWithName from "./ClerkUserButtonWithName";

export default function Sidenav() {
  return (
    <aside className="hidden size-full p-6 lg:flex">
      <div className="flex size-full flex-col justify-between gap-8 divide-y">
        <Link href="/">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <nav className="flex size-full gap-4 divide-y pt-4 lg:flex-col">
          <NavLinks />
        </nav>

        <div className="flex min-h-12 items-center justify-center pt-4 text-right">
          <SignedIn>
            <ClerkUserButtonWithName />
          </SignedIn>
          <SignedOut>
            <Button className="w-full">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </aside>
  );
}
