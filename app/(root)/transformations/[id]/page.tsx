import { DeleteTransformationModal } from "@/components/shared/DeleteTransformationModal";
import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { transformationsTypes } from "@/constants/transformations";
import { getImageById } from "@/lib/actions/image.actions";
import { IImage } from "@/lib/database/models/image.model";
import { getImageSize } from "@/lib/utils";
import { TransformationTypeKey, Transformations } from "@/types/transformation";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TransformationsPageProps {
  params: { id: string };
}

export default async function TransformationsPage({
  params: { id },
}: TransformationsPageProps) {
  const { userId } = auth();

  const image: IImage = await getImageById(id);
  if (!image._id) return notFound();

  return (
    <main className="container py-16">
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className=" md:p-16-medium flex gap-2">
          <p className="">Transformación:</p>
          <p className="capitalize">
            {
              transformationsTypes[
                image.transformationType as TransformationTypeKey
              ].title
            }
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden md:block">&#x25CF;</p>
            <div className="flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className="capitalize text-accentcolor">{`"${image.prompt}"`}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className="capitalize text-accentcolor">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className=" hidden md:block">&#x25CF;</p>
            <div className=" flex gap-2">
              <p className="">Relación de aspecto:</p>
              <p className="capitalize text-accentcolor">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-accentcolor/20 pt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4 ">
            <h3 className="text-4xl font-bold max-md:text-3xl">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="h-fit min-h-72 w-full rounded-[10px] border border-dashed object-cover"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType as TransformationTypeKey}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config as Transformations}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button asChild type="button" className=" capitalize max-sm:w-full">
              <Link href={`/transformations/${image._id}/update`}>
                Actualizar transformación
              </Link>
            </Button>

            <DeleteTransformationModal imageId={image._id} />
          </div>
        )}
      </section>
    </main>
  );
}
