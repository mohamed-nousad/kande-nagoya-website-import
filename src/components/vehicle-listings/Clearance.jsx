import { useGetClearanceQuery } from "@/store/api/webStockApi";
import VehicleCard from "../homes/home-11/VehicleCard";
import SeeMoreButton from "../homes/home-11/SeeMoreButton";
import { DEFAULT_CARD_LIMIT } from "@/constants";

const Clearance = () => {
  const { data, isLoading, isError } = useGetClearanceQuery(DEFAULT_CARD_LIMIT);
  const vehicles = data?.data ?? [];

  if (isLoading || isError || vehicles.length === 0) {
    return null;
  }

  return (
    <section className="clearance-section">
      <div className="clearance-section__header">
        <div className="clearance-section__title">
          <span className="clearance-section__badge">SALE</span>

          <h2>Clearance</h2>
        </div>

        <SeeMoreButton />
      </div>

      <div className="clearance-section__grid">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            badgeText={
              vehicle.clearanceDiscountPercent
                ? `Save ${vehicle.clearanceDiscountPercent}%`
                : "On Sale"
            }
            badgeClassName="vehicle-card__badge--red"
          />
        ))}
      </div>
    </section>
  );
};

export default Clearance;