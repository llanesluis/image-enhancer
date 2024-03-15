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
  defaultValues,
  transformationsTypes,
} from "@/constants/transformations";
import { IImage } from "@/lib/database/models/image.model";
import { deepMergeObjects } from "@/lib/utils";
import {
  TransformationFormActionType,
  TransformationTypeKey,
  Transformations,
} from "@/types/transformation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { CustomFormField } from "./CustomFormField";
import MediaUploader from "./MediaUploader";

interface TransformationFormProps {
  type: TransformationTypeKey;
  userId: string;
  data?: IImage | null;
  action: TransformationFormActionType;
  creditBalance: number;
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
}: TransformationFormProps) {
  const { toast } = useToast();
  const transformation = transformationsTypes[type];
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

  // TODO: ESTO ES UN COCHINERO, VER COMO REFACTORIZAR PARA EVITAR TODO ESTO
  const [imageData, setImageData] = useState<IImage | null>(data);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const newTransformation = useRef<Transformations | null>(null);
  const transformationConfig = useRef(transformation.configuration);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isPending, startTransition] = useTransition();

  //Inicializa el form
  const form = useForm({
    resolver: zodResolver(TranformationFormSchema),
    defaultValues: initialValues,
  });

  //Callback que ejecuta el form
  const onSubmit = async (formValues: TransformationFormData) => {
    //TODO: Hacer que el boton no haga submit si no hay transformación ??
    if (newTransformation.current === null)
      return toast({
        title: `Error al ${action === "Create" ? "Crear" : "Actualizar"}`,
        description: `Debes aplicar una transformación antes.`,
      });

    setIsFormSubmitting(true);

    const imageInfo = {
      title: formValues.title,
      //publicId: imageData?.publicId,
      transformationType: type,
      width: imageData?.width,
      height: imageData?.height,
      config: transformationConfig.current,
      //secureURL: imageData?.secureURL,
      //transformationURL: transformationUrl,
      aspectRatio: formValues.aspectRatio,
      prompt: formValues.prompt,
      color: formValues.color,
    };

    console.log("imageData: ", imageInfo);

    form.reset();
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
    newTransformation.current = {
      fillBackground: true,
    };

    return onFieldChange(value);
  };

  //Se ejecuta cuando un input cambia, recibe el nombre para saber que campo cambia
  const handleInputChange = (
    fieldName: "title" | "prompt",
    value: string,
    type: string,
    onFieldChange: (value: string) => void,
  ) => {
    if (fieldName === "prompt") {
      newTransformation.current = {
        [type]: {
          [fieldName]: value,
        },
      };
    }

    return onFieldChange(value);
  };

  //Se ejecuta cuando el color cambia -> type "recolor"
  const handleColorChange = (
    value: string,
    onFieldChange: (value: string) => void,
  ) => {
    newTransformation.current = {
      recolor: {
        prompt: newTransformation.current?.recolor?.prompt,
        to: value,
      },
    };

    return onFieldChange(value);
  };

  const handleTransformation = async () => {
    setIsTransforming(true);
    console.log("transforming...");

    //Se combinan las configuraciones default y la nueva.
    const mergedTransformationConfig = deepMergeObjects(
      newTransformation.current,
      transformationConfig.current,
    );

    transformationConfig.current = mergedTransformationConfig;
    console.log("transformationConfig: ", transformationConfig.current);

    newTransformation.current = null;

    startTransition(async () => {
      // TODO: updateCreditBalance(userId, creditFee); Aquí se debe hacer la llamada a la API para aplicar la transformación
      //await updateCreditBalance(userId, creditFee);
    });

    setIsTransforming(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
        {/* title */}
        <CustomFormField
          control={form.control as Control<TransformationFormData>}
          name="title"
          formLabel="Título"
          formDescription="¿Cómo quieres llamar a esta transformación?"
          render={({ field }) => (
            <Input
              {...field}
              value={field.value}
              placeholder="Mi mejor fotografía.."
              onChange={(e) =>
                handleInputChange("title", e.target.value, type, field.onChange)
              }
            />
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
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tamaño" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => {
                    const option =
                      aspectRatioOptions[key as AspectRatioOptionKey];
                    return (
                      <SelectItem key={key} value={option.aspectRatio}>
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
                {...field}
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
                type="color"
                value={field.value}
                {...field}
                onChange={(e) =>
                  handleColorChange(e.target.value, field.onChange)
                }
              />
            )}
          />
        )}

        {/* media uploader */}
        <div className="grid h-fit min-h-[200px] grid-cols-1 gap-6 py-4 md:grid-cols-2">
          {/* Original pic */}
          <CustomFormField
            control={form.control as Control<TransformationFormData>}
            name="publicId"
            formLabel="Imagen"
            className="size-full"
            render={({ field }) => (
              <MediaUploader
                onChange={field.onChange}
                setImage={setImageData}
                publicId={field.value}
                imageData={imageData}
                type={type}
              />
            )}
          />

          {/* Transformed pic */}
          <div className="size-full rounded-lg bg-blue-100 p-8">
            Pendiente el componente de la imagen transformada
          </div>
        </div>

        {/* botones */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant={"secondary"}
            disabled={isTransforming || newTransformation.current === null}
            onClick={handleTransformation}
          >
            Aplicar transformación
          </Button>
          <Button type="submit" disabled={isFormSubmitting}>
            {action === "Create" ? "Crear" : "Actualizar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
