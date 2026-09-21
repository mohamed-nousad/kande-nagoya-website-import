import React, { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`site-header${solid ? " site-header--solid" : ""}`}>
      <div className="header-inner">
        <NavLink className="brand" to="/">
          <img src="/assets/images/logo/logo.png" alt="Wheels Lanka Trading" />
        </NavLink>
        <nav
          id="site-navigation"
          className={`main-nav${menuOpen ? " main-nav--open" : ""}`}
        >
          {NAV.map((item) => (
            <NavLink
              key={item.text}
              to={item.href}
              end={item.href === "/"}
              onClick={() => setMenuOpen(false)}
            >
              {item.text}
            </NavLink>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <NavLink className="account" to="/login">
          <img src="/assets/images/home/avatar.png" alt="" />
          Sign up <span>/</span> Login
        </NavLink>
      </div>
    </header>
  );
}
