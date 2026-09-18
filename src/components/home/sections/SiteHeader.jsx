import React from "react";
import { NavLink } from "react-router-dom";

const NAV = [
  { text: "Home", href: "/" },
  { text: "About Us", href: "/about-us" },
  { text: "Pre Order", href: "/pre-order" },
  { text: "Vehicles", href: "/stock-list" },
  { text: "Testimonials", href: "/testimonials" },
  { text: "Contact Us", href: "/contact" },
];

export default function SiteHeader({ solid = false }) {
  return (
    <header className={`site-header${solid ? " site-header--solid" : ""}`}>
      <div className="header-inner">
        <NavLink className="brand" to="/">
          <img src="/assets/images/logo/logo.png" alt="Wheels Lanka Trading" />
        </NavLink>
        <nav className="main-nav">
          {NAV.map((item) => (
            <NavLink key={item.text} to={item.href} end={item.href === "/"}>
              {item.text}
            </NavLink>
          ))}
        </nav>
        <NavLink className="account" to="/login">
          <img src="/assets/images/home/avatar.png" alt="" />
          Sign up <span>/</span> Login
        </NavLink>
      </div>
    </header>
  );
}
