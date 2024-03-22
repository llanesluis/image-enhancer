import Collection from "@/components/sections/Collection";
import Explore from "@/components/sections/Explore";
import FAQ from "@/components/sections/FAQ";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import { getAllImages } from "@/lib/actions/image.actions";
import { SignedIn } from "@clerk/nextjs";
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
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const images = await getAllImages({ page, searchQuery });
  const totalPages = images?.totalPage || 1;

  return (
    <main className="overflow-hidden py-20">
      <div className="container flex flex-col space-y-24">
        <Hero />
        <Explore />
        <Features />
        <SignedIn>
          <Collection
            page={page}
            hasSearch={true}
            images={images?.data}
            totalPages={totalPages}
          />
        </SignedIn>
        <FAQ />
      </div>
    </main>
  );
}
