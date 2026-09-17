const recommendedVehiclesData = Array.from(
  { length: 14 },
  (_, index) => ({
    id: index + 1,
    image: "/assets/images/home-11/wcu-1.png",
    title: "Ford Transit - 2021",
    subtitle:
      "4.0 D PowerPulse Momentum SA Av.",
    mileage: "2500 Miles",
    fuel: "Diesel",
    transmission: "Manual",
    price: "$22,000",
  })
);

export default recommendedVehiclesData;