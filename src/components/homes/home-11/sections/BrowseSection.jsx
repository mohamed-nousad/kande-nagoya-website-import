import React from "react";
import { Link } from "react-router-dom";

const BRANDS = ["Toyota", "Honda", "Nissan", "Mazda", "Suzuki", "Mitsubishi", "Daihatsu", "BMW"];
const BODY_TYPES = ["Sedan", "Coupe", "Hatchback", "Wagon", "SUV", "Minivan", "Truck", "Convertible"];

const QUICK = [
  { title: "Best Value", sub: "" },
  { title: "All Under", sub: "LKR 2M" },
  { title: "Trucks & Vans", sub: "" },
  { title: "SUV/MPV", sub: "" },
  { title: "Smart Matching", sub: "AI-powered vehicle recommendations." },
];

export default function BrowseSection() {
  return (
    <section className="browse">
      <div className="browse-panel">
        <h3>Browse by Brand</h3>
        <div className="browse-row">
          {BRANDS.map((name) => (
            <Link
              key={name}
              to={`/stock-list?brand=${encodeURIComponent(name)}`}
              className="browse-item"
            >
              <strong>&#9671;</strong>
              {name}
            </Link>
          ))}
        </div>

        <h3>Browse by Body Type</h3>
        <div className="browse-row">
          {BODY_TYPES.map((name) => (
            <Link
              key={name}
              to={`/stock-list?body=${encodeURIComponent(name)}`}
              className="browse-item"
            >
              <strong>&#9095;</strong>
              {name}
            </Link>
          ))}
        </div>

        <div className="quick-row">
          {QUICK.map((q) => (
            <Link key={q.title} to="/stock-list" className="quick">
              <b>{q.title}</b>
              {q.sub ? <small>{q.sub}</small> : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
