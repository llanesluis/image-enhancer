import AlertNoCredits from "@/components/shared/AlertNoCredits";
import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationsTypes } from "@/constants/transformations";
import { getImageById } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IImage } from "@/lib/database/models/image.model";
import { TransformationTypeKey } from "@/types/transformation";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params: { id },
}: UpdateTransformationProps): Promise<Metadata> {
  const image: IImage = await getImageById(id);

  const description = `Esta imágen fue transfornada por ${image.author.firstName} ${image.author.lastName} y es de tipo "${transformationsTypes[image.transformationType as TransformationTypeKey].title}"`;

  return {
    title: image.title,
    description,
  };
}
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

  const creditBalance = user.creditBalance || 0;

  return (
    <main className="container py-16">
      <Header title={title} subtitle={subtitle} />

      <article className="my-8">
        <AlertNoCredits creditBalance={creditBalance} />
      </article>

      <TransformationForm
        action="Update"
        userId={user._id}
        type={image.transformationType as TransformationTypeKey}
        creditBalance={creditBalance}
        config={image.config}
        data={image}
      />
    </main>
  );
}
