import React from "react";
import { Link } from "react-router-dom";

const COLUMNS = [
  { title: "Company", links: ["About Us", "Blog", "Services", "FAQs", "Terms", "Contact Us"] },
  { title: "Quick Links", links: ["Get In Touch", "Help center", "Live chat", "How it works"] },
  { title: "Our Brands", links: ["Toyota", "Porsche", "Audi", "BMW", "Ford"] },
  { title: "Vehicles Type", links: ["Sedan", "Hatchback", "SUV", "Hybrid", "Electric"] },
];

export default function SiteFooter() {
  return (
    <footer>
      <div className="container-wide">
        <div className="footer-top">
          <div>
            <h3>Join Wheels Lanka</h3>
            <p>Receive pricing updates, shopping tips &amp; more!</p>
          </div>
          <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="footer-grid">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((link) => (
                <Link key={link} to="/">{link}</Link>
              ))}
            </div>
          ))}
          <div>
            <h4>Our Mobile App</h4>
            <Link to="/">Download on the Apple Store</Link>
            <Link to="/">Get it on Google Play</Link>
            <h4>Connect With Us</h4>
            <Link to="/">&#9679;&nbsp;&#9679;&nbsp;&#9679;&nbsp;&#9679;</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Wheels Lanka All rights reserved.</span>
          <span>Terms &amp; Conditions &nbsp;&middot;&nbsp; Privacy Notice</span>
        </div>
      </div>
    </footer>
  );
}
