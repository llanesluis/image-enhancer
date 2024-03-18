import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationsTypes } from "@/constants/transformations";
import { getImageById } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IImage } from "@/lib/database/models/image.model";
import { TransformationTypeKey } from "@/types/transformation";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface UpdateTransformationProps {
  params: {
    id: string;
  };
}

export default async function UpdateTransformation({
  params: { id },
}: UpdateTransformationProps) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  if (!user?._id) throw new Error("User not found");

  const image: IImage = await getImageById(id);
  if (!image?._id) throw new Error("Image not found");

  const { title, subtitle } =
    transformationsTypes[image.transformationType as TransformationTypeKey];

  return (
    <main className="container py-16">
      <Header title={title} subtitle={subtitle} />

      <TransformationForm
        action="Update"
        userId={user._id}
        type={image.transformationType as TransformationTypeKey}
        creditBalance={user.creditBalance || 0}
        config={image.config}
        data={image}
      />
    </main>
  );
}
