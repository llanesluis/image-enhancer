"use client";

import { checkoutCredits } from "@/lib/actions/transactions";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

interface CheckoutProps {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}

export default function Checkout({
  amount,
  buyerId,
  credits,
  plan,
}: CheckoutProps) {
  const toast = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "¡Orden realizada!",
        description: "Recibirá un correo de confirmación en breve",
        duration: 5000,
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "¡Orden cancelada!",
        description:
          "Continúe explorando y realice el pago cuando esté listo/a",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const handleCheckout = async () => {
    const transaction = {
      amount,
      buyerId,
      credits,
      plan,
    };

    await checkoutCredits(transaction);
  };
  return (
    <form action={handleCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-accentcolor bg-cover"
        >
          Comprar créditos
        </Button>
      </section>
    </form>
  );
}
