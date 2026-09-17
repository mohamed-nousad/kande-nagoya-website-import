import { Link, useNavigate } from "react-router-dom";
import { getBrandIcon } from "@/utils/brandIcons";
import { useGetFilterOptionsQuery } from "@/store/api/webStockApi";

const FilterByBrand = () => {
  const { data, isLoading } = useGetFilterOptionsQuery();
  const makes = data?.make ?? [];
  const navigate = useNavigate();

  return (
    <div className="filter-brand-wrapper">
      <div className="filter-brand-banner">
        <img src="/assets/images/leftSidebar/HoteDeals.jpg" alt="Hot Deals" />
      </div>
      <div className="filter-brand-card">
        <div className="filter-brand-card__header">Browse by Car Brands</div>

        <div className="filter-brand-card__body">
          {isLoading && <p>Loading brands...</p>}
         {makes.map((brand) => (
            <div key={brand.name} className="filter-brand-card__item">
              <img src={getBrandIcon(brand.name)} alt={brand.name} />
              <Link to={`/stock-list?make=${encodeURIComponent(brand.name)}`}>
                {brand.name} ({brand.count})
              </Link>
            </div>
          ))}
        </div>

        <div className="filter-brand-card__footer">
          <button type="button" onClick={() => navigate("/stock-list")}>
            <span>See More</span>
            <span className="see-more-icon">
              <img src="/assets/images/leftSidebar/DownArrow.svg" alt="down" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterByBrand;