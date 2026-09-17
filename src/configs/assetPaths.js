import { defaultIcon, defaultPlaceholderImg , ICONS_BASE_PATH, IMAGES_BASE_PATH } from "@/constants";

export const iconPath = (name) => (name ? `${ICONS_BASE_PATH}/${name}` : defaultIcon);
export const imagePath = (name) => (name ? `${IMAGES_BASE_PATH}/${name}` : defaultPlaceholderImg);

const resolveIcon = (name) => {
  try {
    return name ? `${ICONS_BASE_PATH}/${name}` : defaultIcon;
  } catch {
    return defaultIcon;
  }
};

const resolveImage = (name) => {
  try {
    return name ? `${IMAGES_BASE_PATH}/${name}` : defaultPlaceholderImg;
  } catch {
    return defaultPlaceholderImg;
  }
};

export const ICONS = {
  inquiry: resolveIcon("inquiry.svg"),
  clock: resolveIcon("clock.svg"),
  dhump: resolveIcon("dhump.svg"),
  saveOutline: resolveIcon("save-outline.svg"),
  saveFilled: resolveIcon("save-filled.svg"),
  calendar: resolveIcon("calendar.svg"),
  milage: resolveIcon("milage.svg"),
  fuel: resolveIcon("fuel.svg"),
  transmission: resolveIcon("transmission.svg"),
  arrowTopRight: resolveIcon("arrow-top-right.svg"),
  chevronRight: resolveIcon("solid-arrow-right.svg"),
};

export const IMAGES = {
  defaultCar: resolveImage("profile/default-car.png"),
  defaultPlaceholder: resolveImage("profile/default-placeholder.png"),
};