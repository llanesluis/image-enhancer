import Image from "next/image";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gradient-to-tr from-[#f553d711] via-[#68faff11] to-[#e5ff0011] p-8">
      <Container>
        <div className="flex justify-between">
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
      </Container>
    </footer>
  );
}
