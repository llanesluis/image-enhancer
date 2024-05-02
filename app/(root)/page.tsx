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
    <main className=" relative overflow-hidden py-20">
      <div className="absolute bottom-0 left-0 right-0 top-0 max-h-[150vh] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container flex flex-col space-y-24">
        <Hero />
        <Explore />
        <Features />
        <FAQ />
      </div>
    </main>
  );
}
