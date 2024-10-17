import Providers from "@/components/providers/providers";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import "@fontsource-variable/comfortaa";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        <body className={cn("relative isolate antialiased", poppins.className)}>
          <div className="absolute top-0 z-[-2] min-h-full w-full bg-background bg-[radial-gradient(ellipse_60%_60%_at_50%_-20%,hsl(var(--accent)/.20),rgba(255,255,255,0))]"></div>

          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
