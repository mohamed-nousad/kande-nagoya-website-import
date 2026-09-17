import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "@/components/common/Accordions";
import VehicleCard from "./VehicleCard";
import SeeMoreButton from "./SeeMoreButton";
import {
  useGetClearanceQuery,
  useGetLowMileageQuery,
  useGetNewArrivalsQuery,
  useGetPopularVehiclesQuery,
  useGetRecommendedQuery,
} from "@/store/api/webStockApi";
import { DEFAULT_CARD_LIMIT } from "@/constants";
import { toggleItems } from "@/data/faqs";

const FALLBACK_IMAGE = "/assets/images/home-11/wcu-1.png";
const fallbackVehicles = [
  {
    id: "home11-1",
    image: FALLBACK_IMAGE,
    title: "2022 Toyota Harrier",
    subtitle: "Z Leather Package SUV",
    mileage: "18,200 km",
    fuel: "Hybrid",
    transmission: "Automatic",
    price: "12,500,000",
    discountPrice: "11,950,000",
  },
  {
    id: "home11-2",
    image: FALLBACK_IMAGE,
    title: "2021 Honda Vezel",
    subtitle: "e:HEV Z Crossover",
    mileage: "24,100 km",
    fuel: "Hybrid",
    transmission: "Automatic",
    price: "9,850,000",
    discountPrice: "9,300,000",
  },
  {
    id: "home11-3",
    image: FALLBACK_IMAGE,
    title: "2020 Toyota Corolla",
    subtitle: "G-X Sedan",
    mileage: "31,400 km",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "7,950,000",
    discountPrice: "7,500,000",
  },
  {
    id: "home11-4",
    image: FALLBACK_IMAGE,
    title: "2022 Honda Civic",
    subtitle: "EX Sedan",
    mileage: "12,800 km",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "10,800,000",
    discountPrice: "10,250,000",
  },
];

const useVehicles = (queryResult) => {
  const vehicles = queryResult?.data?.data;
  return vehicles?.length ? vehicles : fallbackVehicles;
};

function VehicleRail({ vehicles, badgeText, badgeClassName }) {
  return (
    <div className="home11-vehicle-grid">
      {vehicles.slice(0, 4).map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          badgeText={badgeText}
          badgeClassName={badgeClassName}
        />
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, action = true }) {
  return (
    <div className="home11-section-heading">
      <div>
        {eyebrow && <span className="home11-section-heading__eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && <SeeMoreButton />}
    </div>
  );
}

export default function Home11Content() {
  const navigate = useNavigate();
  const [dealTab, setDealTab] = useState("Popular");
  const newArrivalsQuery = useGetNewArrivalsQuery(DEFAULT_CARD_LIMIT);
  const clearanceQuery = useGetClearanceQuery(DEFAULT_CARD_LIMIT);
  const popularQuery = useGetPopularVehiclesQuery(DEFAULT_CARD_LIMIT);
  const lowMileageQuery = useGetLowMileageQuery({ page: 1, limit: 8, maxMileage: 40000 });
  const highGradeQuery = useGetRecommendedQuery(DEFAULT_CARD_LIMIT);

  const collections = useVehicles(newArrivalsQuery);
  const weeklyDeals = useVehicles(clearanceQuery);
  const dealVehicles = useMemo(() => {
    if (dealTab === "Low Mileage") return useVehicles(lowMileageQuery);
    if (dealTab === "High Grade") return useVehicles(highGradeQuery);
    return useVehicles(popularQuery);
  }, [dealTab, highGradeQuery, lowMileageQuery, popularQuery]);

  return (
    <main className="home11-content">
      <section className="home11-section home11-section--collection">
        <SectionHeading
          eyebrow="CURATED FOR YOU"
          title="Explore Our Latest Collection"
          description="Discover carefully selected vehicles, ready for their next journey."
        />
        <VehicleRail vehicles={collections} badgeText="New Arrival" badgeClassName="vehicle-card__badge--orange" />
      </section>

      <section className="home11-section home11-section--deal">
        <SectionHeading
          eyebrow="LIMITED TIME"
          title="Week of the Deal"
          description="Exceptional vehicles and exceptional value, refreshed every week."
        />
        <VehicleRail vehicles={weeklyDeals} badgeText="On Sale" badgeClassName="vehicle-card__badge--red" />
      </section>

      <section className="home11-section home11-section--best-deal">
        <SectionHeading
          eyebrow="FIND YOUR MATCH"
          title="Looking for the best deal?"
          description="Explore our most searched vehicles by the details that matter to you."
          action={false}
        />
        <div className="home11-deal-tabs" role="tablist" aria-label="Vehicle collections">
          {["Popular", "Low Mileage", "High Grade"].map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={dealTab === tab}
              className={dealTab === tab ? "is-active" : ""}
              onClick={() => setDealTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <VehicleRail vehicles={dealVehicles} badgeText={dealTab} badgeClassName="vehicle-card__badge--green" />
        <div className="home11-centered-action"><SeeMoreButton /></div>
      </section>

      <section className="home11-compare-section">
        <div className="home11-compare-section__copy">
          <span className="home11-section-heading__eyebrow">COMPARE BEFORE YOU BUY</span>
          <h2>Toyota vs Honda</h2>
          <p>Compare two of Sri Lanka&apos;s most trusted brands and find the right fit for your everyday drive.</p>
          <button type="button" className="home11-outline-button" onClick={() => navigate("/compare")}>Compare vehicles <span>↗</span></button>
        </div>
        <div className="home11-compare-table">
          <div className="home11-compare-table__head"><span>What matters</span><strong>Toyota</strong><strong>Honda</strong></div>
          <div><span>Reliability</span><b>Excellent</b><b>Excellent</b></div>
          <div><span>Hybrid range</span><b>Wide choice</b><b>Efficient</b></div>
          <div><span>Driving feel</span><b>Comfortable</b><b>Sporty</b></div>
        </div>
      </section>

      <section className="home11-video-section">
        <img src="/assets/images/section/wcu-1.jpg" alt="Kan-De vehicle delivery" />
        <div className="home11-video-section__overlay" />
        <div className="home11-video-section__content">
          <span className="home11-section-heading__eyebrow">THE KAN-DE DIFFERENCE</span>
          <h2>Drive with confidence.</h2>
          <p>From selection to delivery, we make importing your next vehicle simple.</p>
          <button type="button" className="home11-video-section__play" aria-label="Play Kan-De story">▶</button>
        </div>
      </section>

      <section className="home11-faq-section">
        <SectionHeading
          eyebrow="NEED TO KNOW"
          title="Frequently asked questions"
          description="A few quick answers before you find your next car."
          action={false}
        />
        <div className="home11-faq-section__accordion"><Accordion faqData={toggleItems.slice(0, 5)} parentClass="home11-faq-item" /></div>
      </section>
    </main>
  );
}
