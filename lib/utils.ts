import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  }

  if (typeof error === "string") {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }

  console.error(error);
  throw new Error(`An unknown error occurred: ${JSON.stringify(error)}`);
}
