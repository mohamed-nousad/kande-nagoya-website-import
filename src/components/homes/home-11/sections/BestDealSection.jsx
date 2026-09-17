import React, { useState } from "react";
import { Link } from "react-router-dom";
import VehicleCard from "@/components/homes/home-11/VehicleCard";
import { bestDealVehicles } from "@/data/homeShowcaseData";

const TABS = ["Popular Vehicle", "Low Mileage", "High Grade"];

export default function BestDealSection() {
  const [activeTab, setActiveTab] = useState("Popular Vehicle");

  return (
    <section className="white-section best">
      <div className="section-heading">
        <h2>Looking for the best deal?</h2>
        <p>Explore our featured vehicles with exceptional value, competitive pricing, and limited-time offers.</p>
      </div>
      <div className="deal-tabs">
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
      <div className="container-wide">
        <div className="cards">
          {bestDealVehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} badgeText="Popular" />
          ))}
        </div>
        <Link className="more" to="/stock-list">Explore More &#9679;</Link>
      </div>
    </section>
  );
}
