import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative grid place-items-center gap-8 ">
      <h1 className="mx-auto text-balance text-center text-5xl drop-shadow-md md:text-6xl lg:text-7xl">
        Mejora tus imágenes con el poder de la
        <br />
        <span className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text uppercase text-transparent">
          Inteligencia Artificial
        </span>
      </h1>
    </section>
  );
}
