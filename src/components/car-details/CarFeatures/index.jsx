import React from "react";
import { useGetStocksFeaturesQuery } from "@/store/api/webStockApi";

const DEFAULT_SELLINGS = ["Non Smoker", "One Owner"];

export default function CarFeatures({ vehicle }) {
  const { data: allFeatures = [], isLoading } = useGetStocksFeaturesQuery();

  const vehicleFeatures = new Set(
    (vehicle?.features || []).map((f) => f.trim().toUpperCase())
  );

  const features = allFeatures.map((name) => ({
    name,
    hl: vehicleFeatures.has(name.trim().toUpperCase()),
  }));

  const sellingPoints = DEFAULT_SELLINGS;

  return (
    <>
      <div className="cf">
        <h3 className="cf__hd">FEATURES</h3>
        {isLoading ? (
          <div className="cf__loading">Loading...</div>
        ) : (
          <div className="cf__grid">
            {features.map((f, i) => (
              <span key={i} className={`cf__tag${f.hl ? " cf__tag--hl" : ""}`}>
                {f.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="csp2">
        <h3 className="csp2__hd">SELLING POINTS</h3>
        <div className="csp2__tags">
          {sellingPoints.map((p, i) => (
            <span
              key={i}
              className={`csp2__tag${i === 0 ? " csp2__tag--hl" : ""}`}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}