export const CURRENT_YEAR = new Date().getFullYear();

export const YEAR_OPTIONS = Array.from(
  { length: CURRENT_YEAR - 1990 + 1 },
  (_, i) => CURRENT_YEAR - i
);

export const PRICE_OPTIONS = [3000, 5000, 7000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000];

export const MILEAGE_OPTIONS = [10000, 20000, 30000, 50000, 80000, 100000, 150000, 200000];

export const ENGINE_CC_OPTIONS = [660, 1000, 1300, 1500, 1800, 2000, 2500, 3000, 3500, 4000, 5000];

export const SEAT_OPTIONS = [2, 4, 5, 6, 7, 8, 9];

export const FALLBACK_OPTIONS = {
  bodyType: ["Sedan", "SUV", "Hatchback", "Wagon", "Van", "Truck", "Coupe", "Convertible"],
  steering: ["Right", "Left"],
  transmission: ["Automatic", "Manual", "CVT"],
  fuel: ["Petrol", "Diesel", "Hybrid", "Electric"],
  colour: ["White", "Black", "Silver", "Grey", "Red", "Blue"],
};

export const DEFAULT_VEHICLE_FILTERS = {
  make: "",
  model: "",
  minYear: "",
  maxYear: "",
  minPrice: "",
  maxPrice: "",
  bodyType: "",
  steering: "",
  minMileage: "",
  maxMileage: "",
  transmission: "",
  minCC: "",
  maxCC: "",
  engineCode: "",
  color: "",
  fuel: "",
  minSeats: "",
  maxSeats: "",
  deck: "",
  sale: false,
  recommend: false,
  commercial: false,
  featured: false,
  limitedOffer: false,
  kandeExclusive: false,
};