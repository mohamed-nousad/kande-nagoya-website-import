import React from "react";
import { Link } from "react-router-dom";

const POSTS = [
  { img: "/assets/images/home-11/blog-1.png", date: "November 22, 2026", title: "2024 BMW ALPINA XB7 with exclusive details, extraordinary" },
  { img: "/assets/images/home-11/blog-2.png", date: "November 28, 2026", title: "BMW X6 M50i is designed to exceed your sportiest." },
  { img: "/assets/images/home-11/blog-3.png", date: "December 29, 2026", title: "BMW X5 Gold 2024 Sport Review: Light on Sport" },
];

export default function BlogsSection() {
  return (
    <section className="white-section blogs">
      <div className="section-heading">
        <h2>Latest Blog Posts</h2>
        <p>Real experiences from customers who found their perfect car at Wheels Lanka.</p>
      </div>
      <div className="container-wide blog-grid">
        {POSTS.map((post) => (
          <article className="blog" key={post.title}>
            <img src={post.img} alt={post.title} />
            <small>Admin &nbsp;&middot;&nbsp; {post.date}</small>
            <h3>{post.title}</h3>
          </article>
        ))}
      </div>
      <Link className="more" to="/stock-list">Explore More &#9679;</Link>
    </section>
  );
}
