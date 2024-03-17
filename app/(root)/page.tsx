import Collection from "@/components/sections/Collection";
import Explore from "@/components/sections/Explore";
import FAQ from "@/components/sections/FAQ";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import { getImages } from "@/lib/actions/image.actions";

interface HomePageProps {
  searchParams: { page: number; query: string };
}
export default async function HomePage({ searchParams }: HomePageProps) {
  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";
  const imagesData = await getImages({ page, searchQuery });
  const images = imagesData?.data || [];
  const totalPages = images?.totalPages || 1;

  return (
    <main className="overflow-hidden py-20">
      <div className="container flex flex-col space-y-24">
        <Hero />
        <Explore />
        <Features />
        <Collection
          page={page}
          hasSearch={true}
          images={images}
          totalPages={totalPages}
        />
        <FAQ />
      </div>
    </main>
  );
}
