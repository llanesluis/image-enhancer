import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autenticación",
  description:
    "Inicie sesión o cree una cuenta para acceder a tu cuenta de Pickuro.",
};

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-w-screen flex min-h-screen  items-center justify-center bg-gradient-to-tr from-[#144FEB44] via-transparent to-[#5784FF44] p-8">
      {children}
    </main>
  );
}
