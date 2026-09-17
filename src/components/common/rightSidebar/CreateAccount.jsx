import React from "react";

const features = [
  { icon: "/assets/images/right-sidebar/icon-svg/icon-star.svg", label: "Earn Points" },
  { icon: "/assets/images/right-sidebar/icon-svg/icon-heart.svg", label: "Favorites" },
  { icon: "/assets/images/right-sidebar/icon-svg/icon-bullhorn.svg", label: "News Alerts" },
  { icon: "/assets/images/right-sidebar/icon-svg/icon-notification.svg", label: "Notifications" },
  { icon: "/assets/images/right-sidebar/icon-svg/icon-inbox.svg", label: "Easy Inquiries" },
  { icon: "/assets/images/right-sidebar/icon-svg/icon-cart.svg", label: "Buy Now" },
];

export default function CreateAccount() {
  return (
    <div className="rsb-acc">
      <div className="rsb-acc__head">
        <img src="/assets/images/right-sidebar/icon-svg/icon-user.svg" />
        <h4>Create account</h4>
      </div>

      <p className="rsb-acc__sub">Sign up & enjoy these features</p>

      <div className="rsb-acc__grid">
        {features.map((f) => (
          <div key={f.label} className="rsb-acc__item">
            <img src={f.icon} />
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      <button className="rsb-acc__btn">Create Account</button>
    </div>
  );
}