import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationsTypes } from "@/constants/transformations";
import { getUserById } from "@/lib/actions/user.actions";
import { TransformationTypeKey } from "@/types/transformation";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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
  if (!user?._id) throw new Error("User not found");

  const { title, subtitle } = transformationsTypes[type];

  return (
    <main className="container py-16">
      <Header title={title} subtitle={subtitle} />
      <TransformationForm
        action="Create"
        userId={user._id}
        type={type}
        creditBalance={user.creditBalance || 0}
      />
    </main>
  );
}
