import TestimonialCard from "../../components/homes/home-11/TestimonialCard";
import { testimonialData } from "../../data/testimonialData";
import { RightArrowIcon } from "../../components/homes/home-11/Icon";

const CustomerTestimonials = () => {
  return (
    <section className="customer-testimonials-section">
      <h2>Customer Testimonials</h2>

      <p>
       Hear from our happy buyers! See real feedback on car quality, smooth transactions, and great support. Trust their experiences for your next purchase!
      </p>

      <div className="testimonials-grid">
        {Array.isArray(testimonialData) &&
        testimonialData.map((item) => (
          <TestimonialCard
            key={item.id}
            {...item}
          />
        ))}
      </div>

     <button
        type="button"
        className="read-more-btn"
      >
        <span>Read More</span>

        <span className="read-more-icon">
          <RightArrowIcon />
        </span>
      </button>
    </section>
  );
};

export default CustomerTestimonials;