import { useSelector } from "react-redux";
import { ICONS } from "@/configs/assetPaths";
import { useGetWhitelistQuery } from "@/store/api/webStockApi";
import VehicleCard from "@/components/homes/home-11/VehicleCard";
import Loading from "@/components/common/Loading";

const Whitelist = ({ defaultImage }) => {
  const userId = useSelector((state) => state.auth?.user?._id);

  const { data: whitelistData, isLoading } = useGetWhitelistQuery(
    { page: 1, limit: 10, userId },
    { skip: !userId }
  );

  const whitelistCars = (whitelistData?.data ?? []).map((v) => ({
    ...v,
    image: v.image || defaultImage,
  }));

  return (
    <div className="whitelist">
      <section className="section">
        <div className="section-header">
          <h2>
            <img src={ICONS.heart || ICONS.inquiry} alt="favourites" className="section-icon" />
            My Favourites
          </h2>
          <span className="search-results">Search Results: {whitelistCars.length}</span>
        </div>
        {isLoading ? (
          <span><Loading inline/></span>
        ) : whitelistCars.length === 0 ? (
          <p>You haven't saved any vehicles yet.</p>
        ) : (
          <div className="card-grid">
            {whitelistCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} badge={false} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Whitelist;