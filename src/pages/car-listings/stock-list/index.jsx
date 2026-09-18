import React, { useState } from "react";
import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import SiteHeader from "@/components/home/sections/SiteHeader";
import VehicleCard from "@/components/home/VehicleCard";
import { bestDealVehicles } from "@/data/homeShowcaseData";
import Footer1 from "@/components/footer/Footer1";
import CompareSection from "@/components/home/sections/CompareSection";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";
import FaqSection from "@/components/home/sections/FaqSection";

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

        <section className="listing-hero"><div className="container-wide"><h1>Listings List</h1><p>Home <span>›</span> Used cars for sale</p></div></section>
        <section className="listing-page">
          <div className="container-wide listing-layout">
            <aside className="listing-sidebar">
              <div className="listing-sidebar__title"><strong>Filters and Sort</strong><button type="button">× Clear</button></div>
              <label>Make<select value={filters.brand} onChange={(e) => setField("brand", e.target.value)}>{BRANDS.map((b) => <option key={b}>{b}</option>)}</select></label>
              <label>Model<select><option>Select Model</option><option>Ford Transit</option></select></label>
              <div className="listing-price"><span>Price</span><div><input placeholder="Min" /><b>-</b><input placeholder="Max" /></div></div>
              <label>Fuel Type<select value={filters.fuel} onChange={(e) => setField("fuel", e.target.value)}>{FUELS.map((f) => <option key={f}>{f}</option>)}</select></label>
              <label>Transmission<select><option>Select Transmission</option><option>Automatic</option><option>Manual</option></select></label>
              <label>Drive Type<select><option>Select Drive Type</option><option>Right Hand</option></select></label>
              <label>Color<select><option>Select Color</option><option>White</option><option>Black</option></select></label>
              <div className="listing-range"><span>0 km - 800,000 km</span><div /></div>
              <label>Condition<select><option>Select Condition</option><option>New</option><option>Used</option></select></label>
              <label>Featured<select><option>Select Featured</option><option>Featured</option></select></label>
            </aside>
            <div className="listing-results">
              <div className="listing-results__head"><h2>Listing</h2><div><span>There Are Currently 17 Results</span><button className="view-toggle">▦</button><button className="view-toggle">☷</button><select><option>Show: 50</option></select><select value={filters.sort} onChange={(e) => setField("sort", e.target.value)}>{SORTS.map((s) => <option key={s}>{s}</option>)}</select></div></div>
              <div className="listing-grid">{bestDealVehicles.concat(bestDealVehicles).map((v, index) => <VehicleCard key={`${v.id}-${index}`} vehicle={v} badgeText="Great Price" />)}</div>
              <div className="listing-pagination"><button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>4</button><button>5</button><span>...</span><button>79</button><button>80</button><button>›</button></div>
            </div>
          </div>
        </section>
        <CompareSection /><TestimonialsSection /><FaqSection />

        <Footer1 />
      </div>
    </>
  );
}
