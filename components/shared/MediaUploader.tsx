"use client";

import { IImage } from "@/lib/database/models/image.model";
import { dataUrl, getImageSize } from "@/lib/utils";
import { TransformationTypeKey } from "@/types/transformation";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetError,
} from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "../ui/use-toast";

interface MediaUploaderProps {
  onChange: (value: string) => void;
  setImageData: Dispatch<SetStateAction<IImage | null>>;
  publicId: string;
  imageData: IImage | null;
  type: TransformationTypeKey;
}

export default function MediaUploader({
  imageData,
  onChange,
  setImageData,
  publicId,
  type,
}: MediaUploaderProps) {
  const { toast } = useToast();

  const handleUploadSuccess = (result: any) => {
    setImageData((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onChange(result?.info?.public_id);

    toast({
      title: "La imagen se subió correctamente",
      variant: "default",
      duration: 3000,
    });
  };

  const handleUploadError = (error: CloudinaryUploadWidgetError) => {
    toast({
      title: "Ocurrió un error al subir la imagen",
      description: "Intenta de nuevo",
      variant: "destructive",
      duration: 3000,
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="pickuro"
      options={{ multiple: false, resourceType: "image" }}
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-bold max-md:text-3xl">Original</h3>

          {/* Si la imagen ya existe */}
          {publicId ? (
            <>
              <div className="size-fit cursor-pointer overflow-hidden rounded-[10px] border">
                <CldImage
                  width={getImageSize(type, imageData, "width")}
                  height={getImageSize(type, imageData, "height")}
                  src={publicId}
                  alt="Imagen original"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="h-fit min-h-72 w-full rounded-[10px] border border-dashed object-cover"
                />
              </div>
            </>
          ) : (
            <div
              className="group flex h-72 cursor-pointer flex-col items-center justify-center  gap-4 rounded-[16px]  border-2 border-dashed border-accentcolor bg-slate-200/20 p-12 shadow-inner hover:bg-accentcolor/10"
              onClick={() => open()}
            >
              <div className=" rounded-[16px] bg-accentcolor bg-white p-4  shadow-sm shadow-accentcolor/50  transition-all ease-linear group-hover:opacity-70">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Agregar imagen"
                  width={24}
                  height={24}
                  className="size-full overflow-hidden object-contain grayscale dark:invert"
                />
              </div>
              <p className="text-foreground-70 text-center group-hover:opacity-70">
                Clic aquí para subir una imagen
              </p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
}
