import AlertNoCredits from "@/components/shared/AlertNoCredits";
import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationsTypes } from "@/constants/transformations";
import { getUserById } from "@/lib/actions/user.actions";
import { TransformationTypeKey } from "@/types/transformation";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export function generateMetadata({
  params: { type },
}: AddTransformationTypeProps): Metadata {
  const { title, subtitle } = transformationsTypes[type];

  return {
    title: title,
    description: subtitle,
  };
}

interface AddTransformationTypeProps {
  params: {
    type: TransformationTypeKey;
  };
}

export default async function AddTransformationType({
  params: { type },
}: AddTransformationTypeProps) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  if (!user?._id) throw new Error("Usuario no encontrado");

  const { title, subtitle } = transformationsTypes[type];

  const creditBalance = user.creditBalance || 0;

  return (
    <main className="container py-16">
      <Header title={title} subtitle={subtitle} />

      <article className="my-8">
        <AlertNoCredits creditBalance={creditBalance} />
      </article>

      <TransformationForm
        action="Create"
        userId={user._id}
        type={type}
        creditBalance={creditBalance}
      />
    </main>
  );
}
