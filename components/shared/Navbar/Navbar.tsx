"use client";

import { useMediaQuery } from "usehooks-ts";

interface NavbarProps {
  DesktopNavBar: React.ReactElement;
  MobileNavBar: React.ReactElement;
}

export default function Navbar({ DesktopNavBar, MobileNavBar }: NavbarProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) return DesktopNavBar;
  return MobileNavBar;
}
