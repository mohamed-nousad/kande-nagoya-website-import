import React from "react";
import { Link } from "react-router-dom";

export default function Cta2() {
  return (
    <div className="rsb-cta__card rsb-cta__card--sell">
    <div className="rsb-cta__content">
        <img src="/assets/images/right-sidebar/icon-svg/icon-electric-car-2.svg" className="rsb-cta__icon" />
        <h5>Do You Want to<br />Sell a Car ?</h5>
        <p>We are committed to providing our customers with exceptional service.</p>
        <Link to="/stock-list" className="rsb-cta__btn">
        Get Started <i className="rsb-cta__btn-icon" />
        </Link>
    </div>
    </div>
  );
}