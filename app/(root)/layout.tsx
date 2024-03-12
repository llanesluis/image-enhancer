import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";
interface InnerRootLayoutProps {
  children: ReactNode;
}

export default function InnerRootLayout({ children }: InnerRootLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
