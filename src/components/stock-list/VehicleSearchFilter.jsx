import { useSearchParams } from "react-router-dom";
import { SearchIcon, MicIcon } from "../homes/home-11/Icon";
import { useVehicleFilterState, buildVehicleQueryParams, parseSearchParamsToFilters } from "@/utils/vehicleFilters";
import { YEAR_OPTIONS, PRICE_OPTIONS, MILEAGE_OPTIONS, ENGINE_CC_OPTIONS, SEAT_OPTIONS } from "@/constants/vehicleFilters";

const VehicleSearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    filters,
    setField,
    toggleField,
    resetFilters,
    makeOptions,
    modelOptions,
    bodyTypeOptions,
    steeringOptions,
    transmissionOptions,
    fuelOptions,
    colorOptions,
  } = useVehicleFilterState(parseSearchParamsToFilters(searchParams));

  const handleSearch = () => {
    setSearchParams(buildVehicleQueryParams(filters));
  };

  const handleReset = () => {
    resetFilters();
    setSearchParams({});
  };

  return (
    <section className="stock-filter-section">
      <div className="stock-breadcrumb">
        Japanese Used Cars &gt; Car list &gt; Toyota
      </div>

      <h1 className="stock-page-title">Used cars for sale</h1>

      <div className="stock-filter-container">
        <div className="stock-filter-left">
          <div className="stock-filter-row">
            <select className="filter-wide" value={filters.make} onChange={(e) => setField("make", e.target.value)}>
              <option value="">Select Maker</option>
              {makeOptions.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>

            <select className="filter-wide" value={filters.model} onChange={(e) => setField("model", e.target.value)} disabled={!filters.make}>
              <option value="">Select Model</option>
              {modelOptions.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>

            <select className="filter-small" value={filters.minYear} onChange={(e) => setField("minYear", e.target.value)}>
              <option value="">Min Year</option>
              {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>

            <select className="filter-small" value={filters.maxYear} onChange={(e) => setField("maxYear", e.target.value)}>
              <option value="">Max Year</option>
              {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="stock-filter-row">
            <select className="filter-small" value={filters.minPrice} onChange={(e) => setField("minPrice", e.target.value)}>
              <option value="">Min Price</option>
              {PRICE_OPTIONS.map((p) => <option key={p} value={p}>{p.toLocaleString()}</option>)}
            </select>

            <select className="filter-small" value={filters.maxPrice} onChange={(e) => setField("maxPrice", e.target.value)}>
              <option value="">Max Price</option>
              {PRICE_OPTIONS.map((p) => <option key={p} value={p}>{p.toLocaleString()}</option>)}
            </select>

            <select className="filter-wide" value={filters.bodyType} onChange={(e) => setField("bodyType", e.target.value)}>
              <option value="">Body Type</option>
              {bodyTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <select className="filter-wide" value={filters.steering} onChange={(e) => setField("steering", e.target.value)}>
              <option value="">Select Steering</option>
              {steeringOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="stock-filter-row">
            <select className="filter-small" value={filters.minMileage} onChange={(e) => setField("minMileage", e.target.value)}>
              <option value="">Min Mileage</option>
              {MILEAGE_OPTIONS.map((m) => <option key={m} value={m}>{m.toLocaleString()} km</option>)}
            </select>

            <select className="filter-small" value={filters.maxMileage} onChange={(e) => setField("maxMileage", e.target.value)}>
              <option value="">Max Mileage</option>
              {MILEAGE_OPTIONS.map((m) => <option key={m} value={m}>{m.toLocaleString()} km</option>)}
            </select>

            <select className="filter-wide" value={filters.transmission} onChange={(e) => setField("transmission", e.target.value)}>
              <option value="">Transmission</option>
              {transmissionOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <select className="filter-small" value={filters.minCC} onChange={(e) => setField("minCC", e.target.value)}>
              <option value="">Min Eng.cc</option>
              {ENGINE_CC_OPTIONS.map((cc) => <option key={cc} value={cc}>{cc}</option>)}
            </select>

            <select className="filter-small" value={filters.maxCC} onChange={(e) => setField("maxCC", e.target.value)}>
              <option value="">Max Eng.cc</option>
              {ENGINE_CC_OPTIONS.map((cc) => <option key={cc} value={cc}>{cc}</option>)}
            </select>
          </div>

          <div className="stock-filter-row">
            <input
              type="text"
              placeholder="Engine Code"
              className="filter-wide"
              value={filters.engineCode}
              onChange={(e) => setField("engineCode", e.target.value)}
            />

            <select className="filter-wide" value={filters.color} onChange={(e) => setField("color", e.target.value)}>
              <option value="">Color</option>
              {colorOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <select className="filter-wide" value={filters.fuel} onChange={(e) => setField("fuel", e.target.value)}>
              <option value="">Fuel</option>
              {fuelOptions.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="stock-filter-row">
            <select className="filter-small" value={filters.minSeats} onChange={(e) => setField("minSeats", e.target.value)}>
              <option value="">Min Seats</option>
              {SEAT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <select className="filter-small" value={filters.maxSeats} onChange={(e) => setField("maxSeats", e.target.value)}>
              <option value="">Max Seats</option>
              {SEAT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <input
              type="text"
              placeholder="Deck"
              className="filter-wide"
              value={filters.deck}
              onChange={(e) => setField("deck", e.target.value)}
            />

            <select className="filter-wide" disabled>
              <option>Loading Capacity</option>
            </select>
          </div>

          <div className="stock-filter-options">
            <label><input type="checkbox" checked={filters.sale} onChange={() => toggleField("sale")} /> Sale</label>
            <label><input type="checkbox" checked={filters.recommend} onChange={() => toggleField("recommend")} /> Recommend</label>
            <label><input type="checkbox" checked={filters.commercial} onChange={() => toggleField("commercial")} /> Commercial</label>
            <label><input type="checkbox" checked={filters.featured} onChange={() => toggleField("featured")} /> Featured Stocks</label>
            <label><input type="checkbox" checked={filters.limitedOffer} onChange={() => toggleField("limitedOffer")} /> Limited Offer</label>
            <label><input type="checkbox" checked={filters.kandeExclusive} onChange={() => toggleField("kandeExclusive")} /> Kan-de Exclusive Stocks</label>
          </div>

          <div className="stock-filter-actions">
            <button type="button" className="search-btn" onClick={handleSearch}>
              <SearchIcon />
              Search Cars
            </button>

            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <div className="stock-filter-assistant">
          <div className="stock-filter-mic-circle">
            <MicIcon />
          </div>

          <span>Ask the AI</span>
          <h4>Smart Assistant</h4>
        </div>
      </div>
    </section>
  );
};

export default VehicleSearchFilter;