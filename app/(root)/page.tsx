import Collection from "@/components/sections/Collection";
import Explore from "@/components/sections/Explore";
import FAQ from "@/components/sections/FAQ";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";

export default async function HomePage() {
  return (
    <main className="overflow-hidden py-20">
      <div className="container flex flex-col space-y-24">
        <Hero />
        <Explore />
        <Features />
        <Collection />
        <FAQ />
      </div>
    </main>
  );
}
