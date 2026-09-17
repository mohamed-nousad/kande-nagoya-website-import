import { Link } from "react-router-dom";
import { useGetFilterOptionsQuery } from "@/store/api/webStockApi";

const CATEGORY_META = [
  { name: "Left hand Drive", icon: "/assets/images/leftSidebar/LefthandDrive.svg", param: "steering", value: "Left Hand Drive" },
  { name: "Manual", icon: "/assets/images/leftSidebar/Manual.svg", param: "transmission", value: "Manual" },
  { name: "Diesel", icon: "/assets/images/leftSidebar/Diesel.svg", param: "fuel", value: "Diesel" },
  { name: "4WD", icon: "/assets/images/leftSidebar/4WD.svg", param: "wheel", value: "4WD" },
  { name: "JDM", icon: "/assets/images/leftSidebar/JDM.svg", param: null, value: null },
  { name: "Limited Offer", icon: "/assets/images/leftSidebar/LimitedOffer.svg", param: "limitedOffer", value: "true" },
];

const FilterByCategory = () => {
  const { data } = useGetFilterOptionsQuery();

  const findCount = (param, value) => {
    const list = param === "steering" ? data?.steering : param === "transmission" ? data?.transmission : param === "fuel" ? data?.fuel : null;
    return list?.find((item) => item?.name?.toLowerCase() === value?.toLowerCase())?.count ?? null;
  };

  return (
    <div className="filter-category-card">
      <div className="filter-category-card__header">Browse by Category</div>

      <div className="filter-category-card__body">
        {CATEGORY_META.map((item) => {
          const count = item.param && item.param !== "limitedOffer" ? findCount(item.param, item.value) : null;
          const path = item.param ? `/stock-list?${item.param}=${encodeURIComponent(item.value)}` : "/stock-list";

          return (
            <div key={item.name} className="filter-category-card__item">
              <img src={item.icon} alt={item.name} className="filter-category-card__icon" />
              <Link to={path} className="filter-category-card__text">
                {item.name}{count != null ? ` (${count})` : ""}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterByCategory;