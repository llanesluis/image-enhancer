import Checkout from "@/components/shared/Checkout";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants/plans";
import { getUserById } from "@/lib/actions/user.actions";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créditos",
  description:
    "Al crear tu cuenta recibes 10 créditos gratuitos. Obtén más créditos para que puedas seguir transformando tus imágenes.",
};

export default async function CreditsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  if (!user) redirect("/sign-in");

  return (
    <main className="container py-16 ">
      <Header
        title="Comprar créditos"
        subtitle="Obtén más créditos para que puedas seguir transformando tus imágenes."
      />
      <section className="mt-12 flex justify-center text-balance">
        <ul className="flex justify-between gap-8 max-lg:flex-col">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className="rounded-md border p-6 shadow-md shadow-accentcolor/20"
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="mt-2 font-semibold text-accentcolor">
                  {plan.name}
                </p>
                <p className="text-xl font-semibold">${plan.price}</p>
                <p>{plan.credits} Créditos</p>
              </div>

              {/* Inclusions */}
              <ul className="text flex flex-col gap-5 py-9 max-lg:text-sm">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? "check.svg" : "cross.svg"
                      }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="text-muted-foreground">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Gratuito" ? (
                <Button
                  variant="outline"
                  className="w-full rounded-full border-accentcolor"
                  disabled
                >
                  Gratis
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
