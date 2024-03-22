import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayuda",
  description:
    "¿Necesitas ayuda? Encuentra aquí las respuestas a tus preguntas.",
};

interface HelpPageProps {}

export default function HelpPage({}: HelpPageProps) {
  return <div>HelpPage</div>;
}
