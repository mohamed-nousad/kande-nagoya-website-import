import React from "react";
import { Link } from "react-router-dom";

const BRANDS = [
  { name: "Toyota", icon: "/assets/icons/home/Car/Toyota.svg" },
  { name: "Honda", icon: "/assets/icons/home/Car/Honda.svg" },
  { name: "Nissan", icon: "/assets/icons/home/Car/Nissan.svg" },
  { name: "Mazda", icon: "/assets/icons/home/Car/Mazda.svg" },
  { name: "Suzuki", icon: "/assets/icons/home/Car/Suzuki.svg" },
  { name: "Mitsubishi", icon: "/assets/icons/home/Car/Mitsubishi.svg" },
  { name: "BMW", icon: "/assets/icons/home/Car/BMW.svg" },
  { name: "Daihatsu", icon: "/assets/icons/home/Car/Logo.svg" },
];

const BODY_TYPES = [
  { name: "Sedan", icon: "/assets/icons/home/Sedan.svg" },
  { name: "Coupe", icon: "/assets/icons/home/Coupe.svg" },
  { name: "Hatchback", icon: "/assets/icons/home/Hatchback.svg" },
  { name: "Wagon", icon: "/assets/icons/home/Wagon.svg" },
  { name: "SUV", icon: "/assets/icons/home/SUV.svg" },
  { name: "Minivan", icon: "/assets/icons/home/Minivan.svg" },
  { name: "Truck", icon: "/assets/icons/home/Truck.svg" },
  { name: "Convertible", icon: "/assets/icons/home/Convertible.svg" },
];

const QUICK = [
  { title: "Best Value", sub: "" },
  { title: "All Under", sub: "LKR 2M" },
  { title: "Trucks & Vans", sub: "" },
  { title: "SUV/MPV", sub: "" },
];

const PLACEHOLDER = "/assets/icons/default-placeholder.svg";

const onIconError = (e) => {
  e.target.onerror = null;
  e.target.src = PLACEHOLDER;
};

export default function BrowseSection() {
  return (
    <section className="browse">
      <div className="browse-panel">
        <div className="browse-main">
          <h3>Browse by Brand</h3>
          <div className="browse-row">
            {BRANDS.map((item) => (
              <Link
                key={item.name}
                to={`/stock-list?brand=${encodeURIComponent(item.name)}`}
                className="browse-item"
              >
                <img className="browse-icon" src={item.icon} alt={item.name} onError={onIconError} />
                {item.name}
              </Link>
            ))}
          </div>

          <h3>Browse by Body Type</h3>
          <div className="browse-row">
            {BODY_TYPES.map((item) => (
              <Link
                key={item.name}
                to={`/stock-list?body=${encodeURIComponent(item.name)}`}
                className="browse-item"
              >
                <img className="browse-icon" src={item.icon} alt={item.name} onError={onIconError} />
                {item.name}
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

        <aside className="smart-panel">
          <Link className="smart-card" to="/stock-list">
            <b>Smart Matching</b>
            <span>AI-powered vehicle recommendations.</span>
          </Link>
          <Link className="smart-card" to="/stock-list">
            <b>Smart Auction</b>
            <span>Bid smarter with clear market guidance.</span>
          </Link>
        </aside>
      </div>
    </section>
  );
}
