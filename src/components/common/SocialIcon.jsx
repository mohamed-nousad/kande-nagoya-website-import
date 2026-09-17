import React from "react";

export default function SocialIcon({ name, className = "" }) {
  return (
    <img
      src={`/assets/images/right-sidebar/icon-svg/icon-${name}.svg`}
      alt={name}
      className={`social-icon ${className}`}
    />
  );
}