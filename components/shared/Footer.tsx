import Image from "next/image";

export default function Footer() {
  // from-transparent from-70% to-[#5784FF22] bg-gradient-to-b
  return (
    <footer className="relative w-full border-t py-8">
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
