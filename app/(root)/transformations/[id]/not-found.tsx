import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TransformationNotFound() {
  return (
    <main className="flex h-[75svh] items-center justify-center gap-8 p-16 max-md:flex-col">
      <div className=" max-w-[596px] shrink">
        <Image
          src="/not-found-404.webp"
          width={596}
          height={450}
          alt="404"
          className="aspect-[596/450]"
        />
      </div>
      <div className="flex min-w-80 flex-1 flex-col space-y-8 max-md:items-center max-md:justify-center">
        <Header title="Lo sentimos..." />
        <div className="flex flex-1 flex-col space-y-2  max-md:items-center max-md:text-center">
          <p>No pudimos encontrar la transformación que buscaba.</p>
          <Link
            href="/"
            className="group flex w-fit items-center gap-1 hover:text-accentcolor hover:underline "
          >
            <MoveLeft className="transition group-hover:-translate-x-2" />
            <p className="text-md font-bold">Regresar al inicio</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
