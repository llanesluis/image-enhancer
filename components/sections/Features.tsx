import { features } from "@/constants/features";
import { navLinks } from "@/constants/navlinks";
import Image from "next/image";
import Link from "next/link";

export default function Features() {
  return (
    <section id="features" className="bg border-y-4 border-dashed py-16">
      <div className="relative mb-8 flex h-72 flex-col items-center justify-center gap-8 rounded-[25px] bg-banner bg-cover bg-no-repeat p-6 shadow-inner max-md:hidden ">
        <div className="absolute inset-0 z-0 bg-background/20" />
        <h1 className="z-10 text-center text-4xl font-semibold text-white lg:text-5xl">
          Pon a prueba tu creatividad con{" "}
          <span className="font-confortaa font-bold">Pickuro</span>
        </h1>
        <ul className="z-10 flex w-full  items-center justify-center gap-10">
          {navLinks.slice(1, 6).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex flex-col items-center  justify-center gap-2"
            >
              <li className="flex w-fit items-center  justify-center rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
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
