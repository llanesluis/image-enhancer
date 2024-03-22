"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AspectRatioOptionKey,
  aspectRatioOptions,
  creditFee,
  defaultValues,
  transformationsTypes,
} from "@/constants/transformations";
import { addImage, updateImage } from "@/lib/actions/image.actions";
import { updateCreditBalance } from "@/lib/actions/user.actions";
import { IImage } from "@/lib/database/models/image.model";
import { cn, debounce, deepMergeObjects } from "@/lib/utils";
import { UpdateImage } from "@/types/image";
import {
  TransformationFormActionType,
  TransformationTypeKey,
  Transformations,
} from "@/types/transformation";
import { zodResolver } from "@hookform/resolvers/zod";
import Color from "color";
import { getCldImageUrl } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { CustomFormField } from "./CustomFormField";
import MediaUploader from "./MediaUploader";
import { RestartTransformationModal } from "./RestartTransformationModal";
import TransformedImage from "./TransformedImage";

interface TransformationFormProps {
  type: TransformationTypeKey;
  userId: string;
  data?: IImage | null;
  action: TransformationFormActionType;
  creditBalance: number;
  config?: Transformations | null;
}
const TranformationFormSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

export type TransformationFormData = z.infer<typeof TranformationFormSchema>;

export default function TransformationForm({
  userId,
  type,
  data = null,
  action,
  creditBalance,
  config = null,
}: TransformationFormProps) {
  const { toast } = useToast();
  const transformation = transformationsTypes[type];

  const [imageData, setImageData] = useState<IImage | null>(data);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [transformationConfig, setTransformationConfig] =
    useState<Transformations | null>(config);
  null;
  const [isTransforming, setIsTransforming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const initialValues =
    data && action === "Update"
      ? {
          title: data.title,
          aspectRatio: data.aspectRatio,
          color: data.color,
          prompt: data.prompt,
          publicId: data.publicId,
        }
      : defaultValues;

  //Inicializa el form
  const form = useForm({
    resolver: zodResolver(TranformationFormSchema),
    defaultValues: initialValues,
  });

  //Callback que ejecuta el form
  const onSubmit = async (formValues: TransformationFormData) => {
    setIsFormSubmitting(true);

    if (data || imageData) {
      const transformationUrl = getCldImageUrl({
        width: imageData?.width,
        height: imageData?.height,
        src: imageData?.publicId!,
        ...transformationConfig,
      });

      //Si no se tiene la información de la imagen, no se puede continuar
      if (
        imageData?.publicId === undefined ||
        imageData?.width === undefined ||
        imageData?.height === undefined ||
        imageData?.secureURL === undefined
      )
        return toast({
          title: "Parámetros insuficientes",
          description: "No se pudo obtener la información de la imagen",
          variant: "destructive",
          duration: 3000,
        });

      const color =
        (formValues.color !== "" && Color(formValues.color).keyword()) ||
        formValues.color;

      const imageInfo = {
        title: formValues.title,
        publicId: imageData.publicId,
        transformationType: type,
        width: imageData.width,
        height: imageData.height,
        config: transformationConfig,
        secureURL: imageData.secureURL,
        transformationURL: transformationUrl,
        aspectRatio: formValues.aspectRatio,
        prompt: formValues.prompt,
        color: color,
      };

      console.log("imageInfo", imageInfo);

      if (action === "Create") {
        try {
          const newImage = await addImage({
            image: imageInfo,
            userId,
            path: "/",
          });

          if (newImage) {
            form.reset();
            setImageData(data);
            router.push(`/transformations/${newImage._id}`);
          }
        } catch (e) {
          console.error(e);
        }
      }

      if (action === "Update") {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageInfo,
              _id: data?._id,
            } as UpdateImage,
            userId,
            path: `/transformations/${data?._id}`,
          });

          if (updatedImage) {
            router.push(`/transformations/${updatedImage._id}`);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    setIsFormSubmitting(false);
  };

  //Se ejecuta cuando el select cambia
  const handleAspectRatioChange = (
    value: string,
    onFieldChange: (value: string) => void,
  ) => {
    const imageInfo = aspectRatioOptions[value as AspectRatioOptionKey];

    //Pasar los datos de la imagen al estado
    setImageData((prev: any) => {
      return {
        ...prev,
        aspectRatio: imageInfo.aspectRatio,
        width: imageInfo.width,
        height: imageInfo.height,
      };
    });

    //Guardar la configuración de la transformación
    setNewTransformation((prev) => ({
      ...prev,
      fillBackground: true,
    }));

    return onFieldChange(value);
  };

  //Se ejecuta cuando un input cambia, recibe el nombre para saber que campo cambia
  const handleInputChange = (
    fieldName: "prompt",
    value: string,
    type: string,
    onFieldChange: (value: string) => void,
  ) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName]: value,
        },
      }));
    }, 1000)();

    return onFieldChange(value);
  };

  //Se ejecuta cuando el color cambia -> type "recolor"
  const handleColorChange = (
    value: string,
    onFieldChange: (value: string) => void,
  ) => {
    const colorName = Color(value).keyword();

    debounce(() => {
      setNewTransformation((prev) => ({
        ...prev,
        recolor: {
          ...prev?.recolor,
          to: colorName,
        },
      }));
    }, 500)();

    return onFieldChange(value);
  };

  const handleTransformation = async () => {
    setIsTransforming(true);

    //Se combinan las configuraciones default y la nueva.
    const mergedTransformationConfig = deepMergeObjects(
      newTransformation,
      transformationConfig,
    );

    setTransformationConfig(mergedTransformationConfig);
    setNewTransformation(null);

    startTransition(async () => {
      await updateCreditBalance(userId, creditFee);
      toast({
        title: "Procesando imagen...",
        description: "Se descontó 1 crédito de tu cuenta",
        duration: 3000,
      });
    });
  };

  const handleResetForm = () => {
    form.reset();
    setImageData(data);
    setNewTransformation(null);
    setTransformationConfig(config);
    setIsTransforming(false);
  };

  useEffect(() => {
    if (imageData && (type === "restore" || type === "removeBackground")) {
      setNewTransformation(transformation.configuration as Transformations);
    }
  }, [imageData, transformation.configuration, type]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          {/* title */}
          <CustomFormField
            control={form.control as Control<TransformationFormData>}
            name="title"
            formLabel="Título"
            formDescription="¿Cómo quieres llamar a esta transformación?"
            render={({ field }) => (
              <Input {...field} placeholder="Mi mejor fotografía.." />
            )}
          />

          {/* aspect ratio */}
          {type === "fill" && (
            <CustomFormField
              control={
                form.control as Control<TransformationFormData> as Control<TransformationFormData>
              }
              name="aspectRatio"
              formLabel="Relación de aspecto"
              className="max-w-52"
              render={({ field }) => (
                <Select
                  onValueChange={(value) =>
                    handleAspectRatioChange(value, field.onChange)
                  }
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tamaño deseado" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(aspectRatioOptions).map((key) => {
                      const option =
                        aspectRatioOptions[key as AspectRatioOptionKey];
                      return (
                        <SelectItem key={key} value={key}>
                          {option.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />
          )}

          {/* prompt */}
          {(type === "remove" || type === "recolor") && (
            <CustomFormField
              control={form.control as Control<TransformationFormData>}
              name="prompt"
              formLabel={
                type === "remove"
                  ? "Objeto que deseas remover"
                  : "Objeto que deseas cambiar de color"
              }
              render={({ field }) => (
                <Input
                  value={field.value}
                  placeholder={type === "remove" ? "El árbol" : "La camiseta"}
                  onChange={(e) =>
                    handleInputChange(
                      "prompt",
                      e.target.value,
                      type,
                      field.onChange,
                    )
                  }
                />
              )}
            />
          )}

          {/* color */}
          {type === "recolor" && (
            <CustomFormField
              className="max-w-52"
              name="color"
              formLabel="Color deseado"
              control={form.control as Control<TransformationFormData>}
              render={({ field }) => (
                <Input
                  value={field.value}
                  type="color"
                  onChange={(e) =>
                    handleColorChange(e.target.value, field.onChange)
                  }
                />
              )}
            />
          )}

          {/* media uploader */}
          <div className="grid h-fit min-h-[200px] grid-cols-1 gap-6 py-4 md:grid-cols-2">
            <CustomFormField
              control={form.control as Control<TransformationFormData>}
              name="publicId"
              className="size-full"
              render={({ field }) => (
                <MediaUploader
                  onChange={field.onChange}
                  setImageData={setImageData}
                  publicId={field.value}
                  imageData={imageData}
                  type={type}
                />
              )}
            />

            {/* Transformed pic */}
            <TransformedImage
              image={imageData}
              isTransforming={isTransforming}
              setIsTransforming={setIsTransforming}
              transformationConfig={transformationConfig}
              type={type}
            />
          </div>

          {/* botones */}
          {creditBalance > 0 && (
            <div className="flex  flex-wrap gap-4">
              <Button
                type="button"
                variant={"secondary"}
                disabled={isTransforming || newTransformation === null}
                onClick={handleTransformation}
                className={cn(
                  "min-w-60 max-sm:flex-1",
                  isTransforming && "animate-pulse",
                )}
              >
                {isTransforming ? "Transformando..." : "Aplicar transformación"}
              </Button>
              <Button
                type="submit"
                disabled={isFormSubmitting}
                className="min-w-32 max-sm:flex-1"
              >
                {action === "Create" ? "Crear" : "Actualizar"}
              </Button>
            </div>
          )}
        </form>
      </Form>
      {action === "Create" && (
        <RestartTransformationModal onClick={handleResetForm} />
      )}
    </>
  );
}
