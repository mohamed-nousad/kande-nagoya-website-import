const IMG = "/assets/images/default-car.png";

const makeVehicle = (id) => ({
  id: String(id),
  image: IMG,
  title: "Ford Transit - 2021",
  subtitle: "4.0 D5 PowerPulse Momentum 5dr AWD...",
  mileage: "2500 Miles",
  fuel: "Diesel",
  transmission: "Manual",
  price: "LKR 22M",
  discountPrice: "LKR 22M",
});

export const collectionVehicles = Array.from({ length: 4 }, (_, i) => makeVehicle(i + 1));
export const bestDealVehicles = Array.from({ length: 8 }, (_, i) => makeVehicle(i + 101));

export const featuredDeal = makeVehicle(999);

featuredDeal.image = "/assets/images/home/car.png";
featuredDeal.title = "Honda Civic Type R - 2021";
featuredDeal.subtitle = "Performance edition with premium features";
featuredDeal.mileage = "12,500 Miles";
featuredDeal.fuel = "Petrol";
featuredDeal.transmission = "Automatic";
featuredDeal.price = "LKR 12M";
featuredDeal.discountPrice = "LKR 10.8M";
