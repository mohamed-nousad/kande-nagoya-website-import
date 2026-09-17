import React from "react";
import { Link } from "react-router-dom";
import VehicleCard from "@/components/homes/home-11/VehicleCard";
import { collectionVehicles } from "@/data/homeShowcaseData";

export default function CollectionSection() {
  return (
    <section className="white-section">
      <div className="section-heading">
        <h2>Explore Our Latest Collection</h2>
        <p>Browse our latest vehicles and find the perfect car that fits your needs and budget.</p>
      </div>
      <div className="container-wide">
        <div className="cards">
          {collectionVehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} badgeText="New Arrival" />
          ))}
        </div>
        <Link className="more" to="/stock-list">Explore More &#9679;</Link>
      </div>
    </section>
  );
}
