import Providers from "@/components/providers/providers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "@fontsource-variable/comfortaa";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Pickuro - Mejora tus imágenes con IA",
    default: "Pickuro - Mejora tus imágenes con IA",
  },
  description:
    "Mejora tus imágenes con el poder de la Inteligencia Artificial. Remueve el fondo de tus fotos, mejora la calidad de tus imágenes y mucho más. ¡Pruébalo ahora!",
  keywords:
    "IA, Inteligencia Artificial, Imágenes, Edición de Imágenes, Fotografía, Remover Fondo, Enhancer, Photo Enhancer, Background Remover, Background Remover AI, Enhancer AI, Photo Enhancer AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="es"
        suppressHydrationWarning
        className="motion-safe:scroll-smooth"
      >
        <body
          className={cn("font-montserrat antialiased", montserrat.variable)}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>{children}</Providers>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
