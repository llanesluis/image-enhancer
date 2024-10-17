import { Metadata } from "next";
import { ReactNode } from "react";
import GoBackButton from "../../components/shared/go-back-button";

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
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 p-8">
      <div className="w-full">
        <GoBackButton />
      </div>

      <main className=" rounded-lg bg-none py-2 ">{children}</main>
    </div>
  );
}
