import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { featuredDeal } from "@/data/homeShowcaseData";

function useCountdown(initialSeconds) {
  const [remaining, setRemaining] = useState(initialSeconds);
  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return {
    days: Math.floor(remaining / 86400),
    hours: Math.floor((remaining % 86400) / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
  };
}

export default function DealSection() {
  const { days, hours, minutes, seconds } = useCountdown(1 * 86400 + 7 * 3600 + 59 * 60 + 16);

  return (
    <section className="deal">
      <div className="deal-inner">
        <div>
          <h2>Week of the Deal</h2>
          <h3>
            DRIVE YOUR
            <br />
            DREAM TODAY
          </h3>
          <p>
            This week&apos;s best automotive deal, specially selected to give you maximum
            value at an unbeatable price.
          </p>
          <div className="timer">
            <h4>Limited Time Offer</h4>
            <div className="timer-box">
              <div><b>{days}</b>Days</div>
              <div><b>{hours}</b>Hours</div>
              <div><b>{minutes}</b>Mins</div>
              <div><b>{seconds}</b>Secs</div>
            </div>
          </div>
        </div>
        <div className="deal-card">
          <div className="car-image" style={{ backgroundImage: `url("${featuredDeal.image}")` }} />
          <div className="car-info">
            <h3>{featuredDeal.title}</h3>
            <p>{featuredDeal.subtitle}</p>
            <div className="specs">
              <span>{featuredDeal.mileage}</span>
              <span>{featuredDeal.fuel}</span>
              <span>{featuredDeal.transmission}</span>
            </div>
            <div className="price">
              <div>
                <small>from {featuredDeal.price}</small>
                <strong>{featuredDeal.discountPrice}</strong>
              </div>
              <Link className="details" to="/stock-list">View Details &#8599;</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
