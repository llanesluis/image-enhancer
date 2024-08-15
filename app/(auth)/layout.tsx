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
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-tr from-[#144FEB44] via-transparent to-[#5784FF44] p-8">
      <div className="w-full">
        <GoBackButton />
      </div>

      <main className="grow">{children}</main>
    </div>
  );
}
