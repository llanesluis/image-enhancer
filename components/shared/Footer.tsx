import Image from "next/image";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gradient-to-b from-transparent from-70% to-[#5784FF22] py-8">
      <div className="container flex items-center justify-between gap-4 max-md:flex-col">
        <Image
          src={"/pickuro-logo.png"}
          alt="Pickuro Logo"
          width={190}
          height={31}
        />
        <section className="flex justify-between *:flex-1">Info aquí</section>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        &copy; 2024 Pickuro.
      </p>
    </footer>
  );
}
