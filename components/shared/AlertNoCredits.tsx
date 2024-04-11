import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CreditCard, MessageSquareWarning, Tag } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface AlertNoCreditsProps {
  creditBalance: number;
}

export default function AlertNoCredits({ creditBalance }: AlertNoCreditsProps) {
  if (creditBalance > 6) return null;

  if (creditBalance <= 0)
    return (
      <Alert
        variant={"destructive"}
        className="flex items-center justify-between gap-4 max-md:flex-col max-md:items-start"
      >
        <Tag className="h-4 w-4 animate-bounce" />

        <div className="space-y-4">
          <AlertTitle className=" text-balance font-bold">
            ¡Sin créditos disponibles!
          </AlertTitle>
          <AlertDescription className="text-pretty">
            No podrá realizar más transformaciones si no cuenta con créditos.
          </AlertDescription>
        </div>

        <Button
          className="flex w-full gap-2 pr-6 md:w-fit"
          asChild
          variant={"secondary"}
        >
          <Link href={"/credits"}>
            <CreditCard className="h-4 w-4" />
            Comprar créditos
          </Link>
        </Button>
      </Alert>
    );

  return (
    <Alert className="flex items-center justify-between gap-4  max-md:flex-col max-md:items-start">
      <MessageSquareWarning className="h-4 w-4 animate-bounce" />

      <div className="space-y-4">
        <AlertTitle className=" font-bold">
          ¡Sus créditos estan por agotarse!
        </AlertTitle>
        <AlertDescription>
          <p>
            Le recomendamos conseguir más créditos para poder seguir haciendo
            transformaciones sin preocupaciones.
          </p>
          <span className="font-semibold text-accentcolor">
            Creditos disponibles: ${creditBalance}
          </span>
        </AlertDescription>
      </div>

      <Button
        className="flex w-full gap-2 pr-6 md:w-fit"
        asChild
        variant={"secondary"}
      >
        <Link href={"/credits"}>
          <CreditCard className="h-4 w-4" />
          Comprar créditos
        </Link>
      </Button>
    </Alert>
  );
}
