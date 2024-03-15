"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { debounce } from "@/lib/utils";
import {
  TransformationFormActionType,
  TransformationTypeKey,
  Transformations,
} from "@/types/transformation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";

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

type TransformationFormData = z.infer<typeof TranformationFormSchema>;

export default function TransformationForm({
  userId,
  type,
  data = null,
  action,
  creditBalance,
}: TransformationFormProps) {
  const transformation = transformationsTypes[type];
  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  // TODO: ESTO ES UN COCHINERO, VER COMO REFACTORIZAR PARA EVITAR TODO ESTO
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [imageData, setImageData] = useState<IImage | null>(data);

  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);

  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(
    transformation.configuration,
  );

  //Inicializa el form
  const form = useForm({
    resolver: zodResolver(TranformationFormSchema),
    defaultValues: initialValues,
  });

  //Callback que ejecuta el form
  const onSubmit = async (values: TransformationFormData) => {
    setIsFormSubmitting(true);
    console.log("formValues: ", values);
    console.log("newTransformation: ", newTransformation);

    const imageInfo = {
      title: values.title,
      //publicId: imageData?.publicId,
      transformationType: type,
      width: imageData?.width,
      height: imageData?.height,
      config: newTransformation || transformationConfig,
      //secureURL: imageData?.secureURL,
      //transformationURL: transformationUrl,
      aspectRatio: values.aspectRatio,
      prompt: values.prompt,
      color: values.color,
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

    //Pasar la nueva transformación al estado
    setNewTransformation((prev) => {
      return {
        ...prev,
        fillBackground: true,
      };
    });
    return onFieldChange(value);
  };

  //Se ejecuta cuando un input cambia, recibe el nombre para saber que campo cambia
  const handleInputChange = (
    fieldName: string,
    value: string,
    type: string,
    onFieldChange: (value: string) => void,
  ) => {
    if (fieldName !== "title") {
      debounce(() => {
        setNewTransformation((prev: any) => {
          return {
            ...prev,
            [type]: {
              ...prev?.[type],
              [fieldName]: value,
            },
          };
        });
      }, 1000)();
    }
    return onFieldChange(value);
  };

  //Se ejecuta cuando el color cambia -> type "recolor"
  const handleColorChange = (
    value: string,
    onFieldChange: (value: string) => void,
  ) => {
    debounce(() => {
      setNewTransformation((prev) => {
        return {
          ...prev,
          recolor: {
            ...prev?.recolor,
            to: value,
          },
        };
      });
    }, 1000)();

    return onFieldChange(value);
  };

  const handleTransformation = () => {
    setIsTransforming(true);
    console.log("transforming...");
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
              value={field.value}
              placeholder="Mi mejor fotografía.."
              {...field}
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
                onChange={(e) =>
                  handleColorChange(e.target.value, field.onChange)
                }
              />
            )}
          />
        )}

        {/* public id */}
        {/* TODO: ESTO ESTA OCULTO POR EL MOMENTO */}
        <div className="hidden">
          <CustomFormField
            control={form.control as Control<TransformationFormData>}
            name="publicId"
            formLabel="Public ID"
            render={({ field }) => <Input placeholder="12341234" {...field} />}
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant={"secondary"}
            disabled={isTransforming || newTransformation === null}
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

interface CustomFormFieldProps {
  control: Control<TransformationFormData> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof TransformationFormData;
  formLabel?: string;
  formDescription?: string;
  className?: string;
}

export const CustomFormField = ({
  control,
  render,
  name,
  formLabel,
  formDescription,
  className,
}: CustomFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          {formDescription && (
            <FormDescription>{formDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
