import { Link, useNavigate } from "react-router-dom";
import { getBodyTypeIcon } from "@/utils/bodyTypeIcons";
import { useGetFilterOptionsQuery } from "@/store/api/webStockApi";

const FilterByBody = () => {
  const { data, isLoading } = useGetFilterOptionsQuery();
  const bodyTypes = data?.bodyType ?? [];
  const navigate = useNavigate();

  return (
    <div className="filter-body-card">
      <div className="filter-body-card__header">Browse by Body Type</div>

      <div className="filter-body-card__body">
        {isLoading && <p>Loading...</p>}
        {bodyTypes.map((item) => (
          <div key={item.name} className="filter-body-card__item">
            <img src={getBodyTypeIcon(item.name)} alt={item.name} />
            <Link to={`/stock-list?bodyType=${encodeURIComponent(item.name)}`}>
              {item.name} ({item.count})
            </Link>
          </div>
        ))}
      </div>

      <div className="filter-body-card__footer">
        <button type="button" onClick={() => navigate("/stock-list")}>
          <span>See More</span>
          <span className="see-more-icon">
            <img src="/assets/images/leftSidebar/DownArrow.svg" alt="arrow" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default FilterByBody;