const BRAND_ICONS = {
  toyota: "/assets/images/leftSidebar/Toyota.svg",
  nissan: "/assets/images/leftSidebar/Nissan.svg",
  honda: "/assets/images/leftSidebar/Honda.svg",
  mitsubishi: "/assets/images/leftSidebar/Mitsubishi.svg",
  "mitsubishi fuso": "/assets/images/leftSidebar/Mitsubishi.svg",
  mazda: "/assets/images/leftSidebar/Mazda.svg",
  suzuki: "/assets/images/leftSidebar/Suzuki.svg",
  daihatsu: "/assets/images/leftSidebar/Daihatsu.svg",
  isuzu: "/assets/images/leftSidebar/Isuzu.svg",
  hyundai: "/assets/images/leftSidebar/Hyundai.svg",
  "mini cooper": "/assets/images/leftSidebar/Mini.svg",
  "mercedes benz": "/assets/images/leftSidebar/Mercedes.svg",
  bmw: "/assets/images/leftSidebar/BMW.svg",
  volkswagen: "/assets/images/leftSidebar/VW.svg",
  audi: "/assets/images/leftSidebar/Audi.svg",
  volvo: "/assets/images/leftSidebar/Volvo.svg",
  ford: "/assets/images/leftSidebar/Ford.svg",
  peugeot: "/assets/images/leftSidebar/Peugeot.svg",
};

export const getBrandIcon = (name) =>
  BRAND_ICONS[name?.trim().toLowerCase()] || "/assets/images/leftSidebar/DefaultBrand.svg";