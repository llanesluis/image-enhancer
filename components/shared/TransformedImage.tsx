"use client";

import { IImage } from "@/lib/database/models/image.model";
import { TransformationTypeKey, Transformations } from "@/types/transformation";
import { Button } from "../ui/button";
import Image from "next/image";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { useState } from "react";

interface TransformedImageProps {
  image: IImage | null;
  type: TransformationTypeKey;
  title?: string;
  isTransforming: boolean;
  setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
  transformationConfig: Transformations | null;
}

export default function TransformedImage({
  image,
  type,
  transformationConfig,
  isTransforming,
  title,
  setIsTransforming,
}: TransformedImageProps) {
  const imageTitle = title || image?.title;
  const [isReadyToDownload, setIsReadyToDownload] = useState(false);

  const handleDownload = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const cloudinaryUrl = getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId!,
      ...transformationConfig,
    });

    download(cloudinaryUrl, imageTitle || "imagen-modificada");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h3 className="text-4xl font-bold max-md:text-3xl">Modificada</h3>

        {isReadyToDownload && (
          <Button
            type="button"
            variant={"outline"}
            className="flex gap-2 border border-accentcolor"
            onClick={handleDownload}
          >
            <Image
              src="/assets/icons/download.svg"
              alt="Descargar"
              width={24}
              height={24}
              className="pb-[6px]"
            />
            Descargar
          </Button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative cursor-pointer overflow-hidden rounded-[10px] border">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image?.title || "Imagen modificada"}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="h-fit min-h-72 w-full rounded-[10px] border border-dashed object-cover"
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
              setIsReadyToDownload(true);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
                setIsReadyToDownload(false);
              }, 8000)();
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="absolute inset-0 z-20 m-auto flex flex-col items-center justify-center gap-4 bg-background/20 p-6">
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="Cargando..."
                className="drop-shadow-2lg"
              />
              <p className="drop-shadow-2xllg text-white/80">
                Por favor espere<span className="animate-pulse">...</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex size-full items-center justify-center rounded-[16px]  border-2 border-dashed border-foreground/20 bg-slate-200/20 p-12 shadow-inner">
          Imagen modificada
        </div>
      )}
    </div>
  );
}
