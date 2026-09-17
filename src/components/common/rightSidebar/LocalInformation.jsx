import React from "react";
import "flag-icons/css/flag-icons.min.css";

const locations = [
  { name: "Pakistan", flag: "pk" },
  { name: "Philippines", flag: "ph" },
  { name: "Kenya", flag: "ke" },
  { name: "India", flag: "in" },
];

export default function LocalInformation() {
  return (
    <div className="rsb-local">
      <div className="rsb-local__head">
        <img src="/assets/images/right-sidebar/icon-svg/icon-internet.svg" />
        <h4>Local Information</h4>
      </div>

      <ul className="rsb-local__list">
        {locations.map((loc) => (
          <li key={loc.name} className="rsb-local__item">
            <span className="rsb-local__flag">
              <span className={`fi fi-${loc.flag}`} />
            </span>

            <span className="rsb-local__name">{loc.name}</span>

            <img src="/assets/images/right-sidebar/icon-svg/icon-solid-arrow-right.svg" />
          </li>
        ))}
      </ul>

      <div className="rsb-local__more">
        See More  <img src="/assets/images/right-sidebar/icon-svg/icon-arrow-down.svg" />
      </div>
    </div>
  );
}