import React, { useState } from "react";
import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import SiteHeader from "@/components/home/sections/SiteHeader";
import VehicleCard from "@/components/home/VehicleCard";
import { bestDealVehicles } from "@/data/homeShowcaseData";
import Footer1 from "@/components/footer/Footer1";

const metadata = {
  title: "Vehicle Listing | Wheels Lanka Trading",
  description: "Browse the full vehicle stock at Wheels Lanka Trading.",
};

const BRANDS = ["All Brands", "Toyota", "Honda", "Nissan", "Mazda", "Suzuki", "Mitsubishi", "BMW"];
const TYPES = ["All Types", "SUV", "Sedan", "Hatchback", "Coupe", "Wagon", "Van"];
const FUELS = ["Any Fuel", "Petrol", "Diesel", "Hybrid", "Electric"];
const SORTS = ["Newest First", "Price: Low to High", "Price: High to Low", "Low Mileage"];

export default function StockListPage() {
  const [filters, setFilters] = useState({
    brand: BRANDS[0],
    type: TYPES[0],
    fuel: FUELS[0],
    sort: SORTS[0],
  });
  const setField = (key, value) => setFilters((p) => ({ ...p, [key]: value }));

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="kande-home">
        <SiteHeader solid />

        <section className="listing-page">
          <div className="container-wide">
            <div className="listing-head">
              <div>
                <h1>Vehicle Listing</h1>
                <p>Explore our full stock of quality vehicles ready for you.</p>
              </div>
              <Link className="listing-back" to="/">Back to Home</Link>
            </div>

            <div className="listing-toolbar">
              <label className="listing-field">
                <span>Brand</span>
                <select value={filters.brand} onChange={(e) => setField("brand", e.target.value)}>
                  {BRANDS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </label>
              <label className="listing-field">
                <span>Body Type</span>
                <select value={filters.type} onChange={(e) => setField("type", e.target.value)}>
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="listing-field">
                <span>Fuel</span>
                <select value={filters.fuel} onChange={(e) => setField("fuel", e.target.value)}>
                  {FUELS.map((f) => <option key={f}>{f}</option>)}
                </select>
              </label>
              <label className="listing-field">
                <span>Sort By</span>
                <select value={filters.sort} onChange={(e) => setField("sort", e.target.value)}>
                  {SORTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>

            <div className="listing-count">{bestDealVehicles.length} vehicles found</div>

            <div className="listing-grid">
              {bestDealVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} badgeText="In Stock" />
              ))}
            </div>
          </div>
        </section>

        <Footer1 />
      </div>
    </>
  );
}
