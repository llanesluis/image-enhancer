import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/components/next-themes-provider";
import { NextThemeIndicator } from "@/components/next-themes-indicator";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Pickuro",
  description: "Mejora tus imágenes con el poder de la Inteligencia Artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#0179FF" },
      }}
    >
      <html lang="es">
        <body
          className={cn("font-montserrat antialiased", montserrat.variable)}
        >
          <ThemeProvider>
            {children}

            {/* Solo se muestran en dev mode */}
            <TailwindIndicator />
            <NextThemeIndicator />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
