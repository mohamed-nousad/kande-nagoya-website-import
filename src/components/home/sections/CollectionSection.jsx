import React, { useRef } from "react";
import { Link } from "react-router-dom";
import VehicleCard from "@/components/home/VehicleCard";
import { collectionVehicles } from "@/data/homeShowcaseData";

export default function CollectionSection() {
  const railRef = useRef(null);

  const scrollRail = (direction) => {
    railRef.current?.scrollBy({ left: direction * 334, behavior: "smooth" });
  };

  return (
    <section className="white-section collection-section">
      <div className="section-heading collection-section__heading">
        <h2>Explore Our Latest Collection</h2>
        <p>Browse our latest vehicle arrivals and find the perfect car that fits your needs and budget.</p>
      </div>
      <div className="container-wide">
        <div className="collection-section__rail-wrap">
          <button type="button" className="collection-section__arrow collection-section__arrow--prev" aria-label="Previous vehicles" onClick={() => scrollRail(-1)} />
          <div className="cards collection-section__rail" ref={railRef}>
          {collectionVehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} badgeText="New Arrival" badgeClassName="vehicle-card__badge--collection" cardClassName="vehicle-card--collection" />
          ))}
          </div>
          <button type="button" className="collection-section__arrow collection-section__arrow--next" aria-label="Next vehicles" onClick={() => scrollRail(1)} />
        </div>
        <Link className="more collection-section__more" to="/stock-list">Explore More <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
