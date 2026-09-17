import { useSelector } from "react-redux";
import { ICONS } from "@/configs/assetPaths";
import { useGetBrowsingHistoryQuery, useGetRecommendedQuery } from "@/store/api/webStockApi";
import VehicleCard from "@/components/homes/home-11/VehicleCard";
import Loading from "@/components/common/Loading";

const BrowsingHistory = ({ defaultImage }) => {
  const userId = useSelector((state) => state.auth?.user?._id);

  const { data: historyData, isLoading: historyLoading } = useGetBrowsingHistoryQuery(
    { page: 1, limit: 10, userId },
    { skip: !userId }
  );
  const { data: recommendedData, isLoading: recommendedLoading } = useGetRecommendedQuery({ page: 1, limit: 10 });

  const browsingHistoryCars = (historyData?.data ?? []).map((v) => ({
    ...v,
    image: v.image || defaultImage,
  }));

  const recommendedCars = (recommendedData?.data ?? []).map((v) => ({
    ...v,
    image: v.image || defaultImage,
  }));

  return (
    <div className="browsing-history">
      <section className="section">
        <div className="section-header">
          <h2>
            <img src={ICONS.clock} alt="clock" className="section-icon" />
            Browsing History
          </h2>
          <span className="search-results">Search Results: {browsingHistoryCars.length}</span>
        </div>
        {historyLoading ? (
          <span><Loading inline/></span>
        ) : browsingHistoryCars.length === 0 ? (
          <p>You haven't browsed any stocks yet.</p>
        ) : (
          <div className="card-grid">
            {browsingHistoryCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} badge={false}/>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2>
            <img src={ICONS.dhump} alt="dhump" className="section-icon" />
            Recommend Cars
          </h2>
          <span className="search-results">Search Results: {recommendedCars.length}</span>
        </div>
        {recommendedLoading ? (
          <span><Loading inline/></span>
        ) : recommendedCars.length === 0 ? (
          <p>No recommendations right now.</p>
        ) : (
          <div className="card-grid">
            {recommendedCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} badge={false}/>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BrowsingHistory;