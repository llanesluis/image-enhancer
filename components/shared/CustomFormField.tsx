import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { TransformationFormData } from "./TransformationFormRefs";

export interface CustomFormFieldProps {
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
          {formLabel && (
            <FormLabel className="font-bold">{formLabel}</FormLabel>
          )}
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
