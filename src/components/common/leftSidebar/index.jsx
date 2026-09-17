import FilterByBrand from "./filters/FilterByBrand";
import FilterByBody from "./filters/FilterByBody";
import FilterByCategory from "./filters/FilterByCategory";

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <FilterByBrand />
      <FilterByBody />
      <FilterByCategory />
    </div>
  );
};

export default LeftSidebar;