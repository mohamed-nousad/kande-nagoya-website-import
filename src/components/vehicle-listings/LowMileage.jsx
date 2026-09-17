import { useMemo, useState } from "react";
import { useGetLowMileageQuery } from "@/store/api/webStockApi";
import VehicleCard from "../homes/home-11/VehicleCard";
import SeeMoreButton from "../homes/home-11/SeeMoreButton";

const mileageFilters = [
  "Less than",
  "20,000km",
  "40,000km",
  "60,000km",
  "80,000km",
  "100,000km",
  "120,000km",
  "140,000km",
];

const parseMaxMileage = (filter) => {
  const digits = filter.replace(/[^\d]/g, "");
  return digits ? Number(digits) : undefined;
};

const LowMileage = () => {
  const [activeFilter, setActiveFilter] = useState("20,000km");
  const maxMileage = useMemo(() => parseMaxMileage(activeFilter), [activeFilter]);

  const { data, isLoading, isError } = useGetLowMileageQuery({
    page: 1,
    limit: 8,
    ...(maxMileage !== undefined ? { maxMileage } : {}),
  });
  const vehicles = data?.data ?? [];

  if (isLoading || isError || vehicles.length === 0) {
    return null;
  }

  return (
    <section className="low-mileage-section">
      <div className="low-mileage-section__header">
        <div className="low-mileage-section__left">
          <div className="low-mileage-section__title">
            <div className="low-mileage-section__icon">
              <img src="/assets/images/home-11/icon-svg/lowmillge.svg" alt="Low Mileage" />
            </div>
            <h2>Low Mileage</h2>
          </div>

          <div className="low-mileage-section__filters">
            {mileageFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <SeeMoreButton />
      </div>

      <div className="low-mileage-section__grid">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            badgeIcon={
              <div className="low-mileage-custom-badge">
                <img src="/assets/images/home-11/icon-svg/lowmillge.svg" alt="Low Mileage" />
                <span>Low Mileage</span>
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
};

export default LowMileage;