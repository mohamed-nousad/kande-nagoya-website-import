import { APP_BASE_URL } from "@/configs/AppConfig";
import { defaultPlaceholderImg } from "@/constants";

export const resolveImageUrl = (path) => {
  if (!path) return null;
  return `${APP_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

export const formatAmount = (value) => {
  if (!value) return 0;
  const num = Number(value);
  return isNaN(num) ? "0" : Math.ceil(num).toLocaleString('en-US');
}

const formatMileage = (milage) => {
  if (milage === undefined || milage === null) return "-";
  return `${Number(milage).toLocaleString("en-US")} km`;
};

const buildTitle = (vehicle) => {
  const year = vehicle.manufactureYear ? new Date(vehicle.manufactureYear).getFullYear() : null;
  return [year, vehicle.make, vehicle.model].filter(Boolean).join(" ") || "-";
};

const buildSubtitle = (vehicle) => {
  return [vehicle.grade, vehicle.type].filter(Boolean).join(" ") || vehicle.modelNo || "-";
};

export const formatVehicleCard = (vehicle) => {
  if (!vehicle) return null;

  const primaryImage = resolveImageUrl(vehicle.uploadedImages?.[0]?.imagePath) || defaultPlaceholderImg;

  return {
    id: vehicle._id,
    image: primaryImage,
    title: buildTitle(vehicle),
    subtitle: buildSubtitle(vehicle),
    mileage: formatMileage(vehicle.milage),
    fuel: vehicle.fuel || "-",
    transmission: vehicle.transmission || "-",
    price: formatAmount(vehicle.price ),
    discountPrice: formatAmount(vehicle.discountPrice),
    discount: vehicle.discount || 0,
  };
};


// formats for stock list
const formatEngineCC = (cc) => {
  if (cc === undefined || cc === null) return "-";
  return `${cc}cc`;
};

const buildYearMonth = (manufactureYear, manufactureMonth) => {
  if (!manufactureYear) return "-";
  const year = new Date(manufactureYear).getFullYear();
  if (!manufactureMonth) return String(year);
  const month = new Date(manufactureMonth).getMonth() + 1;
  return `${year}/${month}`;
};

const buildStockTitle = (vehicle) => {
  const year = vehicle.manufactureYear ? new Date(vehicle.manufactureYear).getFullYear() : null;
  return [year, vehicle.make, vehicle.model, vehicle.modelNo, vehicle.grade].filter(Boolean).join(" ") || "-";
};

const deriveBadge = (vehicle) => {
  if (vehicle.isClearance) return "On Sale";
  if (vehicle.newArrival === "Yes") return "New Arrival";
  if (vehicle.milage !== undefined && vehicle.milage !== null && vehicle.milage <= 30000) return "Low Mileage";
  return "Great Price";
};

export const formatStockVehicleCard = (vehicle) => {
  if (!vehicle) return null;

  const primaryImage = resolveImageUrl(vehicle.uploadedImages?.[0]?.imagePath) || defaultPlaceholderImg;

  return {
    _id: vehicle._id,
    image: primaryImage,
    title: buildStockTitle(vehicle),
    badge: deriveBadge(vehicle),
    kanNo: vehicle.kandeNo || "-",
    mileage: vehicle.milage !== undefined && vehicle.milage !== null
      ? `${Number(vehicle.milage).toLocaleString("en-US")} km`
      : "-",
    year: buildYearMonth(vehicle.manufactureYear, vehicle.manufactureMonth),
    engine: formatEngineCC(vehicle.CC),
    transmission: vehicle.transmission || "-",
    origin: vehicle.origin || "-",
    modelCode: vehicle.modelNo || "-",
    steering: vehicle.wheel || "-",
    fuel: vehicle.fuel || "-",
    seats: vehicle.seat ?? "-",
    engineCode: vehicle.CC * 1000|| "-",
    color: vehicle.colour || "-",
    drive: vehicle.driven || "-",
    doors: vehicle.door ?? "-",
    features: Array.isArray(vehicle.features) ? vehicle.features : [],
    price: formatAmount(vehicle.price),
    discount: vehicle.discount ||  0,
    discountPrice: formatAmount(vehicle.discountPrice),
    totalPrice: formatAmount(vehicle.totalPrice),
    shipType: vehicle.shipType || "N/A",
    destinationCountry: vehicle.destinationCountry || "-",
    destinationPort: vehicle.destinationPort || "-",
  };
};

export default formatVehicleCard;