import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-evenly gap-8 lg:flex-row">
      <h1 className="flex-1 text-balance text-center text-4xl font-bold drop-shadow-md sm:text-5xl md:text-6xl lg:text-start lg:text-7xl lg:leading-[80px]">
        {/* Mejora tus imágenes con el poder de la */}
        Chinga tu madre
        <br />
        <span className="inline-block bg-gradient-to-r from-accentcolor to-[#799cff] bg-clip-text font-confortaa text-transparent lg:-rotate-3">
          {/* Inteligencia Artificial */}
          Martha Marmota :O
        </span>
      </h1>

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
  );
}
