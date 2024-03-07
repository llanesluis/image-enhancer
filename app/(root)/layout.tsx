import { ReactNode } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
interface InnerRootLayoutProps {
  children: ReactNode;
}

export default function InnerRootLayout({ children }: InnerRootLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
