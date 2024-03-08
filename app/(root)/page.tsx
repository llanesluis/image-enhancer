import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  return (
    <main className="overflow-hidden py-16">
      <div className="container flex flex-col space-y-24">
        {/* hero */}
        <section className="relative flex flex-col items-center justify-evenly gap-8 lg:flex-row">
          <h1 className="flex-1 text-balance text-center  text-4xl font-bold drop-shadow-md sm:text-5xl md:text-6xl lg:text-start lg:text-7xl lg:leading-[80px]">
            Mejora tus imágenes con el poder de la
            <br />
            <span className="inline-block bg-gradient-to-r from-accentcolor to-[#799cff] bg-clip-text font-confortaa text-transparent lg:-rotate-3">
              Inteligencia Artificial
            </span>
          </h1>

          <div className="absolute -left-56 opacity-10 ">
            <Image
              src="/pickuro-icon.png"
              alt="logo"
              width={550}
              height={550}
              className="pointer-events-none"
            />
          </div>

          <div className="w-full flex-1">
            <Image
              src={"/hero-image.jpg"}
              height={323}
              width={574}
              alt="Hero image"
              className="w-full max-w-[700px] rotate-3 rounded-lg shadow-lg outline-dashed outline-4 outline-accentcolor drop-shadow-md max-lg:m-auto max-lg:mt-8"
            />
          </div>
        </section>

        {/* herramientas  */}
        <section className="flex flex-col gap-6 md:items-center md:text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            ¡Explora las herramientas!
          </h2>
          <p className="text-md max-w-[550px] text-pretty text-gray-500 md:text-lg">
            Remueve el fondo de tus imágenes, mejora la calidad de tus fotos,
            haz desaparecer objetos no deseados y mucho más.
          </p>
          <div className="flex w-full justify-normal gap-2 md:justify-center">
            <Link href={"/#features"}>
              <Button
                size={"lg"}
                className={cn(
                  "bg-accentcolor hover:bg-[#799cff] active:bg-[#5784FF]",
                )}
                color="accentcolor"
              >
                Comenzar
              </Button>
            </Link>
            <Button
              size={"lg"}
              variant={"outline"}
              className={cn("border-accentcolor")}
            >
              Aprender más
            </Button>
          </div>
        </section>

        {/* features */}
        <section
          id="features"
          className="grid grid-cols-autofit place-items-center gap-4"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <FeatureCard key={i} />
          ))}
        </section>

        {/* todo: reviews */}
        <section></section>

        {/* todo: FAQ */}
        <section></section>
      </div>
    </main>
  );
}

function FeatureCard() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={"/hero-image.jpg"}
        height={161}
        width={323}
        alt="Hero image"
        className="rounded-lg shadow-lg outline-dashed outline-4 outline-accentcolor"
      />
      <h3 className="text-2xl font-bold">herramienta xd</h3>
      <p>kaskasjsa sdi sdksdh sadds</p>
    </div>
  );
}
