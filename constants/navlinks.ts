export const navLinks = [
  {
    label: "Inicio",
    route: "/",
    icon: "/assets/icons/home.svg",
  },
  {
    label: "Restaurar Imagen",
    route: "/transformations/add/restore",
    icon: "/assets/icons/image.svg",
  },
  {
    label: "Relleno Generativo",
    route: "/transformations/add/fill",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Remover Objeto",
    route: "/transformations/add/remove",
    icon: "/assets/icons/scan.svg",
  },
  {
    label: "Cambio de Color",
    route: "/transformations/add/recolor",
    icon: "/assets/icons/filter.svg",
  },
  {
    label: "Remover Fondo",
    route: "/transformations/add/removeBackground",
    icon: "/assets/icons/camera.svg",
  },
  {
    label: "Perfil",
    route: "/profile",
    icon: "/assets/icons/profile.svg",
  },
  {
    label: "Créditos",
    route: "/credits",
    icon: "/assets/icons/bag.svg",
  },
  {
    label: "Ayuda",
    route: "/help",
    icon: "/assets/icons/help.svg",
  },
];
export const normalNavLinks = navLinks.slice(0, 6);
export const premiumNavLinks = navLinks.slice(6);
