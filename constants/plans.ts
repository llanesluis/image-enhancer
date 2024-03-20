export const plans = [
  {
    _id: 1,
    name: "Gratuito",
    icon: "/assets/icons/free-plan.svg",
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: "20 Créditos Gratis",
        isIncluded: true,
      },
      {
        label: "Acceso Básico a Servicios",
        isIncluded: true,
      },
      {
        label: "Soporte al Cliente Prioritario",
        isIncluded: false,
      },
      {
        label: "Actualizaciones Prioritarias",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Paquete Pro",
    icon: "/assets/icons/free-plan.svg",
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: "120 Créditos",
        isIncluded: true,
      },
      {
        label: "Acceso Completo a Servicios",
        isIncluded: true,
      },
      {
        label: "Soporte al Cliente Prioritario",
        isIncluded: true,
      },
      {
        label: "Actualizaciones Prioritarias",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Paquete Premium",
    icon: "/assets/icons/free-plan.svg",
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: "2000 Créditos",
        isIncluded: true,
      },
      {
        label: "Acceso Completo a Servicios",
        isIncluded: true,
      },
      {
        label: "Soporte al Cliente Prioritario",
        isIncluded: true,
      },
      {
        label: "Actualizaciones Prioritarias",
        isIncluded: true,
      },
    ],
  },
];
