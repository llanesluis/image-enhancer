import {
  AspectRatioOptionKey,
  aspectRatioOptions,
} from "@/constants/transformations";
import {
  FormUrlQueryParams,
  RemoveUrlQueryParams,
} from "@/types/url-query-params";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "qs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//MERGE CLASSES
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//HANDLING ERRORS
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

// DEBOUNCE
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// DEEP MERGE OBJECTS
export const deepMergeObjects = (obj1: any, obj2: any) => {
  if (obj2 === null || obj2 === undefined) {
    return obj1;
  }

  let output = { ...obj2 };

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        obj2[key] &&
        typeof obj2[key] === "object"
      ) {
        output[key] = deepMergeObjects(obj1[key], obj2[key]);
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};

// GET IMAGE SIZE
export const getImageSize = (
  type: string,
  image: any,
  dimension: "width" | "height",
): number => {
  if (type === "fill") {
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioOptionKey]?.[
        dimension
      ] || 1000
    );
  }
  return image?.[dimension] || 1000;
};

// PLACEHOLDER LOADER - while image is transforming
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000),
)}`;

// DOWNLOAD IMAGE
export const downloadImage = (url: string, filename: string) => {
  try {
    if (!url) {
      throw new Error("¡No se proporcionó la URL del recurso!");
    }

    const a = document.createElement("a");
    a.href = url;

    // a.download = `${filename.replace(" ", "_")}.png`;
    a.setAttribute("download", `${filename.replace(" ", "_")}.png`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error(error);
  }
};

// FORM URL QUERY
export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };

  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`;
};

// REMOVE KEY FROM QUERY
export function removeKeysFromQuery({
  searchParams,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(searchParams);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  // Remove null or undefined values
  Object.keys(currentUrl).forEach(
    (key) => currentUrl[key] == null && delete currentUrl[key],
  );

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
}

// GET TIME FROM NOW
export async function getTimeFromNow(date: Date) {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
}
