import { TransformationType } from "@/constants/transformations";
export type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";

export type TransformationFormActionType = "Create" | "Update";
