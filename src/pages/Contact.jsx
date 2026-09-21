import React, { useState } from "react";
import MetaComponent from "@/components/common/MetaComponent";
import SiteHeader from "@/components/home/sections/SiteHeader";
import Footer1 from "@/components/footer/Footer1";

const OFFICES = [
  { name: "Dematagoda", address: "No. 680, Baseline Road, Dematagoda, Colombo 09", phone: "+94 (0) 772 244 442", email: "+94 (0) 777 244 442" },
  { name: "Dematagoda", address: "No. 680, Baseline Road, Dematagoda, Colombo 09", phone: "+94 (0) 772 244 442", email: "+94 (0) 777 244 442" },
  { name: "Dematagoda", address: "No. 680, Baseline Road, Dematagoda, Colombo 09", phone: "+94 (0) 772 244 442", email: "+94 (0) 777 244 442" },
  { name: "Dematagoda", address: "No. 680, Baseline Road, Dematagoda, Colombo 09", phone: "+94 (0) 772 244 442", email: "+94 (0) 777 244 442" },
];

const FAQS = [
  "What types of vehicles does Wheels Lanka offer?",
  "How does the import process work?",
  "Do you offer finance options?",
  "How is pricing and delivery handled?",
  "Can you help me choose the right vehicle?",
];

function OfficeCard({ office }) {
  return (
    <article className="contact-office">
      <span className="contact-office__icon" aria-hidden="true"><i className="fa-solid fa-location-dot" /></span>
      <h3>{office.name}</h3>
      <p><i className="fa-solid fa-location-dot" aria-hidden="true" />{office.address}</p>
      <p><i className="fa-solid fa-phone" aria-hidden="true" />{office.phone}</p>
      <p><i className="fa-solid fa-envelope" aria-hidden="true" />{office.email}</p>
    </article>
  );
}

function ContactForm({ submitted, onSubmit }) {
  return (
    <div className="contact-form-wrap">
      <h2>Get in touch</h2>
      <p className="contact-form-wrap__intro">We&apos;re happy to answer any questions and provide clear, reliable support.</p>
      <form onSubmit={onSubmit}>
        <div className="contact-form-grid">
          <input aria-label="Street" placeholder="Street" />
          <div className="contact-form-row"><input aria-label="City" placeholder="City" /><input aria-label="Postcode" placeholder="Postcode" /></div>
          <input aria-label="Contact Phone" placeholder="Contact Phone" />
          <input type="email" aria-label="Email" placeholder="E-mail" required />
          <textarea aria-label="Message" placeholder="Let's talk about your idea" rows="3" />
        </div>
        <label className="contact-upload">
          <span aria-hidden="true">⇧</span> Upload Additional File
          <input type="file" />
        </label>
        <small className="contact-upload-note">Allowed file types: jpg, png, pdf. Maximum file size 10MB.</small>
        <label className="contact-consent"><input type="checkbox" required /> I consent to my details being used for contact.</label>
        <button type="submit">{submitted ? "SUBMITTED" : "SUBMIT"}</button>
      </form>
    </div>
  );
}

function ContactFaq({ openFaq, onToggle }) {
  return (
    <section className="contact-faq">
      <div className="contact-faq__inner">
        <h2>FAQ</h2>
        <p>Explore our FAQs for quick answers<br />about purchasing, importing, delivery &amp; more...</p>
        <div className="contact-faq__list">
          {FAQS.map((question, index) => (
            <div className="contact-faq__item" key={question}>
              <button type="button" aria-expanded={openFaq === index} onClick={() => onToggle(openFaq === index ? -1 : index)}>
                {question}<span aria-hidden="true">⌄</span>
              </button>
              {openFaq === index && <p>Our team is happy to guide you through the full process and provide the latest details.</p>}
            </div>
          ))}
        </div>
        <a className="contact-faq__button" href="#contact-form">Explore More <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <MetaComponent meta={{ title: "Contact Us | Wheels Lanka Trading", description: "Contact Wheels Lanka Trading." }} />
      <div className="kande-home contact-page">
        <SiteHeader solid />

        <section className="contact-hero">
          <div className="contact-hero__inner">
            <h1>Contact Us</h1>
            <p>Home <span>/</span> Contact Us</p>
          </div>
        </section>

        <main>
          <section className="contact-offices">
            <div className="contact-heading">
              <h2>Get in touch</h2>
              <p>Contact Wheels Lanka for trusted guidance, vehicle inquiries,<br />and professional assistance.</p>
            </div>
            <div className="contact-office-grid">
              {OFFICES.map((office) => <OfficeCard office={office} key={office.name} />)}
            </div>
          </section>

          <section id="contact-form" className="contact-form-section">
            <ContactForm submitted={submitted} onSubmit={submitForm} />
            <div className="contact-map" aria-label="Wheels Lanka location map">
              <iframe title="Wheels Lanka location" src="https://www.openstreetmap.org/export/embed.html?bbox=79.84%2C6.89%2C79.90%2C6.96&layer=mapnik" />
            </div>
          </section>

          <ContactFaq openFaq={openFaq} onToggle={setOpenFaq} />
        </main>

        <Footer1 />
      </div>
    </>
  );
}
