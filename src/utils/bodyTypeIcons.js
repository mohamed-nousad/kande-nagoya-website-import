const BODY_TYPE_ICONS = {
  sedan: "/assets/images/leftSidebar/Sedan.svg",
  cabriolet: "/assets/images/leftSidebar/Cabriolet.svg",
  coupe: "/assets/images/leftSidebar/Coupe.svg",
  wagon: "/assets/images/leftSidebar/Wagon.svg",
  hatchback: "/assets/images/leftSidebar/Hatchback.svg",
  suv: "/assets/images/leftSidebar/SUV.svg",
  micro: "/assets/images/leftSidebar/SUV.svg",
  convertible: "/assets/images/leftSidebar/Convertible.svg",
  "van (minibus)": "/assets/images/leftSidebar/Van.svg",
  "dump truck": "/assets/images/leftSidebar/DumpTruck.svg",
  "closed truck": "/assets/images/leftSidebar/ClosedTruck.svg",
};

export const getBodyTypeIcon = (name) =>
  BODY_TYPE_ICONS[name?.trim().toLowerCase()] || "/assets/images/leftSidebar/DefaultBody.svg";