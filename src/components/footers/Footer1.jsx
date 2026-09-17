import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

const footerColumns = [
  {
    title: "Company",
    links: [
      { text: "About Us", href: "/about" },
      { text: "Blog", href: "/blog" },
      { text: "Services", href: "/services" },
      { text: "FAQs", href: "/faq" },
      { text: "Terms", href: "/terms" },
      { text: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { text: "Get In Touch", href: "/contact" },
      { text: "Help center", href: "/help" },
      { text: "Live chat", href: "/live-chat" },
      { text: "How it works", href: "/how-it-works" },
    ],
  },
  {
    title: "Our Brands",
    links: [
      { text: "Toyota", href: "/brand/toyota" },
      { text: "Porsche", href: "/brand/porsche" },
      { text: "Audi", href: "/brand/audi" },
      { text: "BMW", href: "/brand/bmw" },
      { text: "Ford", href: "/brand/ford" },
      { text: "Nissan", href: "/brand/nissan" },
      { text: "Peugeot", href: "/brand/peugeot" },
      { text: "Volkswagen", href: "/brand/volkswagen" },
    ],
  },
  {
    title: "Vehicles Type",
    links: [
      { text: "Sedan", href: "/vehicle/sedan" },
      { text: "Hatchback", href: "/vehicle/hatchback" },
      { text: "SUV", href: "/vehicle/suv" },
      { text: "Hybrid", href: "/vehicle/hybrid" },
      { text: "Electric", href: "/vehicle/electric" },
      { text: "Coupe", href: "/vehicle/coupe" },
      { text: "Truck", href: "/vehicle/truck" },
      { text: "Convertible", href: "/vehicle/convertible" },
    ],
  },
];

export default function Footer1() {
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const [openCols, setOpenCols] = useState({});

  const toggleCol = (title) => {
    setOpenCols((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const sendMail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_noj8796", "template_fs3xchn", formRef.current, {
        publicKey: "iG4SCmR-YtJagQ4gV",
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("You have successfully subscribed.");
          formRef.current.reset();
        } else {
          setMessage("Something went wrong.");
        }
        setTimeout(() => setMessage(""), 2200);
      })
      .catch(() => {
        setMessage("Something went wrong.");
        setTimeout(() => setMessage(""), 2200);
      });
  };

  return (
    <footer id="footer" className="global-footer">
      <div className="container">
        <div className="global-footer-newsletter">
          <div className="global-footer-newsletter-content">
            <h3>Join Kan-De</h3>
            <p>Receive pricing updates, shopping tips &amp; more!</p>
          </div>

          <form
            ref={formRef}
            onSubmit={sendMail}
            className="global-footer-form"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {message && <div className="global-footer-message">{message}</div>}

        <div className="global-footer-main">
          <div className="global-footer-columns">
            {footerColumns.map((column) => (
              <div className="global-footer-column" key={column.title}>
                <h4>{column.title}</h4>

                <div
                  className={`global-footer-col-toggle${
                    openCols[column.title] ? " open" : ""
                  }`}
                  onClick={() => toggleCol(column.title)}
                >
                  <h4>{column.title}</h4>
                  <i className="fa fa-chevron-right toggle-chevron" />
                </div>

                <div
                  className={`global-footer-col-content${
                    openCols[column.title] ? " open" : ""
                  }`}
                >
                  <ul>
                    {column.links.map((item) => (
                      <li key={`${column.title}-${item.text}`}>
                        <Link to={item.href}>{item.text}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div className="global-footer-column global-footer-apps">
              <h4>Our Mobile App</h4>

              <div className="global-footer-col-content open">
                <div className="global-footer-store-buttons">
                  <a href="#" aria-label="Download on the App Store">
                    <span className="store-icon">
                      <i className="icon-autodeal-apple" />
                    </span>
                    <span className="store-text">
                      <em>Download on the</em>
                      <strong>Apple Store</strong>
                    </span>
                  </a>

                  <a href="#" aria-label="Get it on Google Play">
                    <span className="store-icon">
                      <i className="icon-autodeal-playstore" />
                    </span>
                    <span className="store-text">
                      <em>Get it on</em>
                      <strong>Google Play</strong>
                    </span>
                  </a>
                </div>

                <h4 className="global-footer-connect-title">Connect With Us</h4>

                <div className="global-footer-social">
                  <a href="#" aria-label="Facebook">
                    <i className="icon-autodeal-facebook" />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <i className="icon-autodeal-twitter" />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <i className="icon-autodeal-instagram" />
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <i className="icon-autodeal-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="global-footer-bottom">
          <p>&copy; 2026 Kan-de.com.jp All rights reserved.</p>
          <div>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <span>·</span>
            <Link to="/privacy">Privacy Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}