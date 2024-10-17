import Explore from "@/components/sections/Explore";
import FAQ from "@/components/sections/FAQ";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pickuro - Mejora tus imágenes con IA",
  description:
    "Descubre y explora las capacidades de la Inteligencia Artificial para mejorar tus imágenes. Remueve el fondo de tus fotos, mejora la calidad de tus imágenes y mucho más. ¡Pruébalo ahora!",
};
interface HomePageProps {
  searchParams: { page: number; query: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  return (
    <main className="relative isolate overflow-hidden py-20">
      <div className="absolute inset-0 z-[-1] max-h-[100vh] bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container z-10 flex flex-col space-y-24">
        <Hero />
        <Explore />
        <Features />
        <FAQ />
      </div>
    </main>
  );
}
