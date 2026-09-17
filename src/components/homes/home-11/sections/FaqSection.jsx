import React, { useState } from "react";

const FAQS = [
  { q: "What types of vehicles does Wheels Lanka offer?", a: "We offer a wide range of vehicles, including brand-new, reconditioned (unregistered), and high quality pre owned vehicles." },
  { q: "How does the import process work?", a: "Our team can guide you through selection, import, delivery and registration." },
  { q: "Do you offer finance options?", a: "Contact us for current stock and finance options." },
  { q: "How is pricing and delivery handled?", a: "We provide transparent pricing and delivery updates." },
  { q: "Can you help me choose the right vehicle?", a: "Our specialists are available to help you find the right vehicle." },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq">
      <div className="faq-inner container-wide">
        <div className="section-heading">
          <h2>FAQ</h2>
          <p>
            Explore our FAQs for quick answers
            <br />
            about purchasing, importing, delivery &amp; more...
          </p>
        </div>
        <div className="accordion">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className="accordion-item" key={i}>
                <h2 className="accordion-header">
                  <button
                    type="button"
                    className={`accordion-button${isOpen ? "" : " collapsed"}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    {item.q}
                  </button>
                </h2>
                <div className={`accordion-collapse collapse${isOpen ? " show" : ""}`}>
                  <div className="accordion-body">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
