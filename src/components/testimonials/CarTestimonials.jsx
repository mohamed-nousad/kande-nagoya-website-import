import { useState } from "react";
import TestimonialCard from "../../components/homes/home-11/TestimonialCard";
import { testimonialData } from "../../data/testimonialData";

const CarTestimonials = () => {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const total = testimonialData?.length || 0;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const currentData = testimonialData?.slice(start, start + perPage) || [];

  const getPagination = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages - 1, totalPages];
    }
    if (page >= totalPages - 3) {
      return [1, 2, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, 2, "...", page - 1, page, page + 1, "...", totalPages - 1, totalPages];
  };

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return (
    <section className="car-testimonials-section">
      <h2>HONDA CIVIC REVIEWS AND RATINGS</h2>

      <p>
        Hear from our happy buyers! See real feedback on car quality, smooth transactions,
        and great support. Trust their experiences for your next purchase!
      </p>

      <div className="ct__rating">
        <span className="ct__stars">★★★★★</span>
        <span className="ct__score">4.6</span>
        <a className="ct__link" href="#">
          190 Reviews on HONDA CIVIC
        </a>
      </div>

      <div className="testimonials-grid">
        {currentData.map((item) => (
          <TestimonialCard key={item.id} {...item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="ct__pagination">
          {getPagination().map((num, i) =>
            num === "..." ? (
              <span key={`ellipsis-${i}`} className="ct__ellipsis">
                ....
              </span>
            ) : (
              <button
                key={`page-${num}`}
                className={`ct__dot${page === num ? " is-active" : ""}`}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            )
          )}

          {page < totalPages && (
            <button className="ct__next" onClick={handleNext}>
              Next <i className="fa-solid fa-arrow-right ct__arrow"></i>
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default CarTestimonials;