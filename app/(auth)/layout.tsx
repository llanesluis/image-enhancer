import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  //from-[#f553d766] via-[#68faff66] to-[#e5ff0066]
  return (
    <main className="flex-center h-screen w-screen bg-secondary bg-gradient-to-tr from-[#f553d722] via-[#68faff22] to-[#e5ff0022]">
      {children}
    </main>
  );
}
