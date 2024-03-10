import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { ReactNode } from "react";
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
