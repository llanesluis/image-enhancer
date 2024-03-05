import Navbar from "@/components/shared/Navbar/Navbar";
import Desktopnav from "@/components/shared/Navbar/Desktopnav";
import Mobilenav from "@/components/shared/Navbar/Mobilenav";
import { ReactNode } from "react";

interface InnerRootLayoutProps {
  children: ReactNode;
}

export default function InnerRootLayout({ children }: InnerRootLayoutProps) {
  return (
    <div className="flex h-screen flex-col lg:flex-row lg:overflow-hidden">
      <aside className="w-full flex-none shadow shadow-foreground/20 lg:h-full lg:w-64">
        <Navbar DesktopNavBar={<Desktopnav />} MobileNavBar={<Mobilenav />} />
      </aside>
      <main className="flex-grow p-4 md:p-8 lg:overflow-y-auto lg:p-12">
        {children}
      </main>
    </div>
  );
}
