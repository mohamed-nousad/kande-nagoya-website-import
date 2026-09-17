import { useGetPopularVehiclesQuery } from "@/store/api/webStockApi";
import VehicleCard from "../homes/home-11/VehicleCard";
import SeeMoreButton from "../homes/home-11/SeeMoreButton";
import { PopularVehicleIcon } from "../homes/home-11/Icon";
import { DEFAULT_CARD_LIMIT } from "@/constants";

const PopularVehicles = () => {
  const { data, isLoading, isError } = useGetPopularVehiclesQuery(DEFAULT_CARD_LIMIT);
  const vehicles = data?.data ?? [];

  if (isLoading || isError || vehicles.length === 0) {
    return null;
  }

  return (
    <section className="popular-vehicles-section">
      <div className="popular-vehicles-section__header">
        <div className="popular-vehicles-section__title">
          <PopularVehicleIcon />

          <h2>Popular Vehicles</h2>
        </div>

        <SeeMoreButton />
      </div>

      <div className="popular-vehicles-section__grid">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} badgeIcon={<PopularVehicleIcon />} />
        ))}
      </div>
    </section>
  );
};

export default PopularVehicles;