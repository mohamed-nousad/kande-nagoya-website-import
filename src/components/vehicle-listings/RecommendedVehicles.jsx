import { useGetRecommendedQuery } from "@/store/api/webStockApi";
import VehicleCard from "../home/VehicleCard";
import SeeMoreButton from "../home/SeeMoreButton";
import recommendedImage from "/assets/images/stock-list/recommended-image.png";
import { DEFAULT_CARD_LIMIT } from "@/constants";

const RecommendedVehicles = () => {
  const { data, isLoading, isError } = useGetRecommendedQuery(DEFAULT_CARD_LIMIT);
  const vehicles = data?.data ?? [];

  if (isLoading || isError || vehicles.length === 0) {
    return null;
  }

  return (
    <section className="stock-recommended">
      <div className="stock-recommended__header">
        <div className="stock-recommended__title">
          <span className="stock-recommended__icon">
            <img
              src={recommendedImage}
              alt="Recommended"
              className="stock-recommended__icon-image"
            />
          </span>

          <h2>Recommended for you</h2>
        </div>

        <SeeMoreButton />
      </div>

      <div className="stock-recommended__grid">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} badgeText="" />
        ))}
      </div>
    </section>
  );
};

export default RecommendedVehicles;