import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function Explore() {
  return (
    <section className="flex flex-col gap-6 md:items-center md:text-center">
      <h2 className="text-4xl font-bold md:text-5xl">
        ¡Explora las herramientas!
      </h2>
      <p className="text-md max-w-[550px] text-pretty text-gray-500 md:text-lg">
        Remueve el fondo de tus imágenes, mejora la calidad de tus fotos, haz
        desaparecer objetos no deseados y mucho más.
      </p>
      <div className="flex w-full justify-normal gap-2 md:justify-center">
        <Link href={"/#features"} className="cursor-pointer">
          <Button
            size={"lg"}
            className={cn(
              "cursor-pointer bg-accentcolor hover:bg-[#799cff] active:bg-[#5784FF]",
            )}
            color="accentcolor"
          >
            Comenzar
          </Button>
        </Link>
        <Link href={"/#faq"} className="cursor-pointer">
          <Button
            size={"lg"}
            variant={"outline"}
            className={cn(" border-accentcolor")}
          >
            Aprender más
          </Button>
        </Link>
      </div>
    </section>
  );
}
