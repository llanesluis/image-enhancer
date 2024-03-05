import { ReactNode } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Container from "@/components/shared/Container";

interface InnerRootLayoutProps {
  children: ReactNode;
}

export default function InnerRootLayout({ children }: InnerRootLayoutProps) {
  return (
    <div className="flex max-lg:flex-col">
      <Header />
      <div className="w-full">
        {/* TODO: Agregar paddings para las paginas */}
        <main className="px-6 py-4 md:px-8 md:py-6 lg:px-14 lg:py-10">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
