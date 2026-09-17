import React from "react";
import { Link } from "react-router-dom";

export default function VideoSection() {
  return (
    <section className="video-section">
      <div className="section-heading">
        <h2>Looking for a closer look?</h2>
        <p>Watch our detailed car review videos to explore every feature, performance, and condition before you buy.</p>
      </div>
      <div className="container-wide video-grid">
        <div className="video-main">
          <img src="/assets/images/home/video-main.png" alt="Car review video" />
          <button type="button" className="play" aria-label="Play video">&#9654;</button>
        </div>
        <div className="video-side">
          <div className="video-small">
            <img src="/assets/images/home/video-2.png" alt="BMW versus Mercedes review" />
          </div>
          <div className="video-small">
            <img src="/assets/images/home/video-3.png" alt="Honda city review" />
          </div>
        </div>
      </div>
      <Link className="more" to="/stock-list">Explore More &#9679;</Link>
    </section>
  );
}
