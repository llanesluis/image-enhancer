import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import User from "./User";
import DesktopNavbar from "./DesktoNavbar";
import MobileSidebar from "./MobileNavbar";

export default function Navbar() {
  return (
    <header className="sticky -top-[1px] z-50 bg-background/70 shadow shadow-foreground/10 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* logo */}
        <Link href="/">
          <Image
            src={"/pickuro-logo.png"}
            alt="Logo"
            width={180}
            height={28}
            className="h-auto object-contain"
          />
        </Link>

        {/* user */}
        <div className="order-2 ml-auto">
          <SignedIn>
            <User />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button variant={"link"}> Iniciar sesión</Button>
            </Link>
          </SignedOut>
        </div>

        {/* desktop nav*/}
        <div className="hidden md:block">
          <DesktopNavbar />
        </div>

        {/* mobile sidebar */}
        <div className="order-3 block md:hidden">
          <MobileSidebar />
        </div>
      </div>
    </header>
  );
}
