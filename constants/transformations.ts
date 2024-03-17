export const transformationsTypes = {
  restore: {
    type: "restore",
    title: "Restaurar Imagen",
    subtitle:
      "Mejora imágenes eliminando ruido e imperfecciones y aumentando su resolución.",
    configuration: { restore: true },
    icon: "image.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Eliminar Fondo",
    subtitle:
      "Elimina el fondo de la imagen utilizando Inteligencia Artificial.",
    configuration: { removeBackground: true },
    icon: "camera.svg",
  },
  fill: {
    type: "fill",
    title: "Relleno Generativo",
    subtitle:
      "Mejora las dimensiones de una imagen utilizando Inteligencia Artificial.",
    configuration: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Remover Objeto",
    subtitle:
      "Identifica y elimina objetos de las imágenes con ayuda de la Inteligencia Artificial.",
    configuration: {
      remove: { message: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },
  recolor: {
    type: "recolor",
    title: "Cambio de Color",
    subtitle:
      "Identifica y dale un nuevo color a objetos de la imagen con ayuda de la Inteligencia Artificial.",
    configuration: {
      recolor: { message: "", to: "", multiple: true },
    },
    icon: "filter.svg",
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Cuadrado (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Retrato estándar (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Retrato móvil (9:16)",
    width: 1000,
    height: 1778,
  },
};

export type AspectRatioOptionKey = keyof typeof aspectRatioOptions;

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

export const creditFee = -1;
