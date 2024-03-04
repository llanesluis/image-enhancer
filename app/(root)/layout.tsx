import Mobilenav from "@/components/shared/Mobilenav";
import Sidenav from "@/components/shared/Sidenav";
import { ReactNode } from "react";

interface InnerRootLayoutProps {
  children: ReactNode;
}

export default function InnerRootLayout({ children }: InnerRootLayoutProps) {
  return (
    <div className="flex h-screen flex-col lg:flex-row lg:overflow-hidden">
      <aside className="w-full flex-none shadow shadow-foreground/20 lg:h-full lg:w-64">
        {/* NAVS */}
        <Mobilenav />
        <Sidenav />
      </aside>
      <main className="flex-grow p-4 md:p-8 lg:overflow-y-auto lg:p-12">
        {children}
      </main>
      {/* todo: agregar footer */}
      <footer>xdxdxd</footer>
    </div>
  );
}
