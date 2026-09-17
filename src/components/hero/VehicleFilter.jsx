import { useNavigate } from "react-router-dom";
import { SearchIcon, MicIcon } from "../homes/home-11/Icon";
import { useVehicleFilterState, buildQueryString } from "@/utils/vehicleFilters";
import { YEAR_OPTIONS, PRICE_OPTIONS } from "@/constants/vehicleFilters";

const VehicleFilter = () => {
  const navigate = useNavigate();
  const {
    filters,
    setField,
    toggleField,
    resetFilters,
    makeOptions,
    modelOptions,
    bodyTypeOptions,
    steeringOptions,
  } = useVehicleFilterState();

  const handleSearch = () => {
    const query = buildQueryString(filters);
    navigate(`/stock-list${query ? `?${query}` : ""}`);
  };

  return (
    <section className="vehicle-filter-section">
      <div className="vehicle-filter-container">
        <div className="vehicle-filter-left">
          <h2>Japanese Used Cars for Sale</h2>

          <div className="vehicle-filter-row">
            <select
              className="filter-wide"
              value={filters.make}
              onChange={(e) => setField("make", e.target.value)}
            >
              <option value="">Select Maker</option>
              {makeOptions.map((make) => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>

            <select
              className="filter-wide"
              value={filters.model}
              onChange={(e) => setField("model", e.target.value)}
              disabled={!filters.make}
            >
              <option value="">Select Model</option>
              {modelOptions.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>

            <select
              className="filter-small"
              value={filters.minYear}
              onChange={(e) => setField("minYear", e.target.value)}
            >
              <option value="">Min Year</option>
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              className="filter-small"
              value={filters.maxYear}
              onChange={(e) => setField("maxYear", e.target.value)}
            >
              <option value="">Max Year</option>
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="vehicle-filter-row">
            <select
              className="filter-small"
              value={filters.minPrice}
              onChange={(e) => setField("minPrice", e.target.value)}
            >
              <option value="">Min Price</option>
              {PRICE_OPTIONS.map((price) => (
                <option key={price} value={price}>${price.toLocaleString()}</option>
              ))}
            </select>

            <select
              className="filter-small"
              value={filters.maxPrice}
              onChange={(e) => setField("maxPrice", e.target.value)}
            >
              <option value="">Max Price</option>
              {PRICE_OPTIONS.map((price) => (
                <option key={price} value={price}>${price.toLocaleString()}</option>
              ))}
            </select>

            <select
              className="filter-wide"
              value={filters.bodyType}
              onChange={(e) => setField("bodyType", e.target.value)}
            >
              <option value="">Body Type</option>
              {bodyTypeOptions.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              className="filter-wide"
              value={filters.steering}
              onChange={(e) => setField("steering", e.target.value)}
            >
              <option value="">Select Steering</option>
              {steeringOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="vehicle-filter-options">
            <label>
              <input type="checkbox" checked={filters.sale} onChange={() => toggleField("sale")} />
              Sale
            </label>
            <label>
              <input type="checkbox" checked={filters.recommend} onChange={() => toggleField("recommend")} />
              Recommend
            </label>
            <label>
              <input type="checkbox" checked={filters.commercial} onChange={() => toggleField("commercial")} />
              Commercial
            </label>
            <label>
              <input type="checkbox" checked={filters.featured} onChange={() => toggleField("featured")} />
              Featured Stocks
            </label>
            <label>
              <input type="checkbox" checked={filters.limitedOffer} onChange={() => toggleField("limitedOffer")} />
              Limited Offer
            </label>
            <label>
              <input type="checkbox" checked={filters.kandeExclusive} onChange={() => toggleField("kandeExclusive")} />
              Kan-de Exclusive Stocks
            </label>
          </div>

          <div className="vehicle-filter-actions">
            <button type="button" className="search-btn" onClick={handleSearch}>
              <SearchIcon />
              Search Cars
            </button>

            <button type="button" className="reset-btn" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>

        <div className="vehicle-filter-assistant">
          <div className="vehicle-filter-mic-circle">
            <MicIcon />
          </div>
          <span>Ask the AI</span>
          <h4>Smart Assistant</h4>
        </div>
      </div>
    </section>
  );
};

export default VehicleFilter;