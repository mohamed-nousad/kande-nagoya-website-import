import React from "react";
import { Link } from "react-router-dom";

const REVIEWS = [
  "I've bought several cars over the years, but this was by far the best experience. The service was honest and transparent.",
  "The service was honest and transparent, and the car I purchased was exactly as described.",
  "Great support from the first inquiry through delivery. I will definitely be returning.",
  "Everything was clear, fast and reliable. A very smooth experience.",
];

export default function TestimonialsSection() {
  return (
    <section className="white-section">
      <div className="section-heading">
        <h2>What Our Clients Say</h2>
        <p>Real experiences from customers who found their perfect car at Wheels Lanka</p>
      </div>
      <div className="container-wide testimonial-grid">
        <div className="testimonial large">
          <img src="/assets/images/home-11/testimonial-feature.png" alt="Happy customer" />
          <div className="quote">
            <span className="rating">&#9733; 5.0</span>
            <p>
              I&apos;ve bought several cars over the years, but this was by far the best
              experience. The service was honest and transparent, and the car I purchased
              was exactly as described.
            </p>
            <div className="person">
              Williams James
              <small>CEO FINANCE PLC</small>
            </div>
          </div>
        </div>
        {REVIEWS.map((text, i) => (
          <div className="testimonial" key={i}>
            <span className="rating">&#9733; 5.0</span>
            <p>{text}</p>
            <div className="person">
              Williams James
              <small>CEO FINANCE PLC</small>
            </div>
          </div>
        ))}
      </div>
      <Link className="more" to="/testimonials">Explore More &#9679;</Link>
    </section>
  );
}
