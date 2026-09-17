import { useGetNewArrivalsQuery } from "@/store/api/webStockApi";
import VehicleCard from "../home/VehicleCard";
import SeeMoreButton from "../home/SeeMoreButton";
import { DEFAULT_CARD_LIMIT } from "@/constants";

const NewArrivals = () => {
  const { data, isLoading, isError } = useGetNewArrivalsQuery(DEFAULT_CARD_LIMIT);
  const vehicles = data?.data ?? [];

  if (isLoading || isError || vehicles.length === 0) {
    return null;
  }

  return (
    <section className="new-arrivals-section">
      <div className="new-arrivals-section__header">
        <div className="new-arrivals-section__title">
          <span className="new-arrivals-section__badge">NEW</span>

          <h2>New Arrivals</h2>
        </div>

        <SeeMoreButton />
      </div>

      <div className="new-arrivals-section__grid">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            badgeText="New Arrival"
            badgeClassName="vehicle-card__badge--orange"
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;