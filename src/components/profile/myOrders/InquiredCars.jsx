import { useSelector } from "react-redux";
import { ICONS } from "@/configs/assetPaths";
import { useGetInquiredListQuery } from "@/store/api/webStockApi";
import VehicleCard from "@/components/homes/home-11/VehicleCard";
import Loading from "@/components/common/Loading";

const InquiredCars = ({ defaultImage }) => {
  const userId = useSelector((state) => state.auth?.user?._id);

  const { data: inquiredData, isLoading } = useGetInquiredListQuery(
    { page: 1, limit: 10, userId },
    { skip: !userId }
  );

  const inquiredCars = (inquiredData?.data ?? []).map((v) => ({
    ...v,
    image: v.image || defaultImage,
  }));

  return (
    <div className="inquired-cars">
      <section className="section">
        <div className="section-header">
          <h2>
            <img src={ICONS.inquiry} alt="inquiry" className="section-icon" />
            Inquired Cars
          </h2>
          <span className="search-results">Search Results: {inquiredCars.length}</span>
        </div>
        {isLoading ? (
          <span><Loading inline/></span>
        ) : inquiredCars.length === 0 ? (
          <p>You haven't inquired about any cars yet.</p>
        ) : (
          <div className="card-grid">
            {inquiredCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} badge={false} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default InquiredCars;