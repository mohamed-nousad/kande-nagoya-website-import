import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TABS = ["All Categories", "New Cars", "Used Cars"];

const ADVANCED_FIELDS = [
  { label: "Fuel Type", placeholder: "Select Fuel Type" },
  { label: "Transmission", placeholder: "Select Transmission" },
  { label: "Driver Type", placeholder: "Select Driver Type" },
  { label: "Color", placeholder: "Select color" },
];

const ADVANCED_RANGES = [
  "0 km - 800,000 km",
  "0 km - 800,000 km",
  "Price : LKR 0 - 20M",
  "Year : 2000 - 2026",
];

const ADVANCED_SELECTS = [
  { label: "Door", placeholder: "Select Door" },
  { label: "Seat", placeholder: "Select Seat" },
  { label: "Register Status", placeholder: "Select Register Status" },
];

function AdvancedFilter() {
  return (
    <div className="advanced-filter">
      {ADVANCED_FIELDS.map((f) => (
        <div className="field" key={f.label}>
          <label>{f.label}</label>
          <select><option>{f.placeholder}</option></select>
        </div>
      ))}
      {ADVANCED_RANGES.map((r, i) => (
        <div className="range" key={i}>
          {r}
          <div className="range-line" />
        </div>
      ))}
      {ADVANCED_SELECTS.map((f) => (
        <div className="field" key={f.label}>
          <label>{f.label}</label>
          <select><option>{f.placeholder}</option></select>
        </div>
      ))}
      <div className="features">Features</div>
    </div>
  );
}

export default function HeroSearch() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Categories");
  const [open, setOpen] = useState(false);

  return (
    <section className="hero">
      <div className="hero-content">
        <span className="kicker">Find Your Perfect Car</span>
        <h1>
          Looking for a vehicle?
          <br />
          You&apos;re in the perfect spot.
        </h1>
        <ul className="hero-benefits">
          <li>Free Test Drive</li>
          <li>5-Year Warranty</li>
          <li>Home Delivery</li>
        </ul>

        <div className="search-wrap">
          <div className="tabs">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                className={activeTab === t ? "active" : ""}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="search-box">
            <div className="field">
              <label>Brand Name</label>
              <select><option>Mercedes-Benz</option><option>Toyota</option><option>Honda</option></select>
            </div>
            <div className="field">
              <label>Type</label>
              <select><option>SUV</option><option>Sedan</option></select>
            </div>
            <div className="field">
              <label>Model</label>
              <select><option>Old Classic</option><option>C-Class</option></select>
            </div>
            <div className="field">
              <label>Price</label>
              <select><option>LKR 2M</option><option>LKR 7M</option></select>
            </div>
            <button
              type="button"
              className="icon-btn"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              &#9783;
            </button>
            <button
              type="button"
              className="search-btn"
              onClick={() => navigate("/stock-list")}
            >
              &#8981; Search
            </button>
          </div>

          <div className={`advanced-stack${open ? " open" : ""}`}>
            <AdvancedFilter />
          </div>
        </div>
      </div>
    </section>
  );
}
