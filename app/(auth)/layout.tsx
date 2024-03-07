import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  //from-[#f553d766] via-[#68faff66] to-[#e5ff0066]
  return (
    <main className="flex-center min-w-screen min-h-screen bg-gradient-to-tr from-[#144FEB44] via-transparent to-[#5784FF44] p-8">
      {children}
    </main>
  );
}
