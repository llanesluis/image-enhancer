import { Button } from "@/components/ui/button";
import { features } from "@/constants/features";
import { navLinks } from "@/constants/navlinks";
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
              src={"/assets/images/hero-image.jpg"}
              height={323}
              width={574}
              alt="Hero image"
              className="w-full max-w-[700px] rotate-3 rounded-lg shadow shadow-accentcolor  drop-shadow-md max-lg:m-auto max-lg:mt-8"
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
        <section id="features" className="bg border-y-4 border-dashed py-8">
          <div className=" bg-banner mb-8 flex h-72 flex-col items-center justify-center gap-8 rounded-xl bg-cover bg-no-repeat p-6 shadow-inner max-md:hidden">
            <h1 className=" text-center text-4xl font-semibold text-white lg:text-5xl">
              Desata tu creatividad con{" "}
              <span className="font-confortaa font-bold">Pickuro</span>
            </h1>
            <ul className="flex-center w-full gap-10">
              {navLinks.slice(1, 6).map((link) => (
                <Link
                  key={link.route}
                  href={link.route}
                  className="flex-center flex-col gap-2"
                >
                  <li className="flex-center w-fit rounded-full bg-white p-4">
                    <Image src={link.icon} alt="image" width={24} height={24} />
                  </li>
                  <p className="p-14-medium text-center text-white">
                    {link.label}
                  </p>
                </Link>
              ))}
            </ul>
          </div>

          <div className="grid auto-rows-[300px_auto_auto] grid-cols-autofit place-items-center gap-4">
            {features.map(({ id, imgUrl, title, description, route }) => (
              <FeatureCard
                key={id}
                title={title}
                description={description}
                imgUrl={imgUrl}
                route={route}
              />
            ))}
          </div>
        </section>

        {/* todo: reviews */}
        <section></section>

        {/* todo: FAQ */}
        <section></section>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  description,
  imgUrl,
  route,
}: {
  title: string;
  description: string;
  imgUrl: string;
  route: string;
}) {
  return (
    <Link href={route}>
      <div className="row-span-3 mx-auto grid w-fit grid-rows-subgrid place-items-center gap-2 p-4 text-center">
        <Image
          src={imgUrl}
          height={161}
          width={323}
          alt={title}
          className="aspect-video rounded-lg object-cover object-center shadow-lg"
        />
        <h3 className="pt-2 text-xl font-bold">{title}</h3>
        <p className="max-w-[250px]">{description}</p>
      </div>
    </Link>
  );
}
