import React, { useState, useMemo } from "react";
import { resolveImageUrl } from "@/utils/vehicleFormatters";
import { defaultPlaceholderImg } from "@/constants";

export default function CarGallery({ vehicle }) {
  const [active, setActive] = useState(0);

  const IMGS = useMemo(() => {
    const uploaded = vehicle?.uploadedImages || [];
    const urls = uploaded
      .map((img) => resolveImageUrl(img.imagePath))
      .filter(Boolean);
    return urls.length ? urls : [defaultPlaceholderImg];
  }, [vehicle]);

  const VISIBLE_THUMBS = Math.min(IMGS.length - 1, 15);
  const hasMultiple = IMGS.length > 1;

  const prev = () => setActive((v) => (v > 0 ? v - 1 : IMGS.length - 1));
  const next = () => setActive((v) => (v < IMGS.length - 1 ? v + 1 : 0));
console.log("IMGS", IMGS);
  return (
    <div className="cg-wrap">
      <div className="cg-viewer">
        <div className="cg-viewer__main">
          <img src={IMGS[active]} className="cg-viewer__img" alt="car" />

          {hasMultiple && (
            <>
              <button className="cg-viewer__arrow cg-viewer__arrow--prev" onClick={prev}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <button className="cg-viewer__arrow cg-viewer__arrow--next" onClick={next}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </>
          )}

          <span className="cg-viewer__badge">
            {active + 1}/{IMGS.length}
          </span>
        </div>

        {hasMultiple && (
          <div className="cg-viewer__thumbs">
            {IMGS.slice(0, VISIBLE_THUMBS).map((im, i) => (
              <button
                key={i}
                className={`cg-viewer__thumb${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
              >
                <img src={im} alt={`car-thumb-${i + 1}`} />
              </button>
            ))}

            {IMGS.length > VISIBLE_THUMBS && (
              <button
                className="cg-viewer__thumb cg-viewer__thumb--more"
                onClick={() => setActive(VISIBLE_THUMBS)}
              >
                <img src={IMGS[IMGS.length - 1]} alt="view all" />
                <div className="more-overlay">
                  <span className="more-label">View All<br />Images</span>
                </div>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="cg-actions">
        <div className="cg-actions__left">
          <button className="cg-actions__btn">
            <img src="/assets/images/car-details/icon-svg/icon-compare.svg" />
            <span>Compare</span>
          </button>

          <button className="cg-actions__btn">
            <img src="/assets/images/car-details/icon-svg/icon-favourite.svg" />
            <span>Add to wishlist</span>
          </button>

          <button className="cg-actions__btn">
            <img src="/assets/images/car-details/icon-svg/icon-print.svg" />
            <span>Print</span>
          </button>
        </div>

        <div className="cg-actions__right">
          <span className="cg-actions__share-label">Share:</span>

          <a href="#" className="cg-actions__social">
            <i className="icon-autodeal-facebook"></i>
          </a>
          <a href="#" className="cg-actions__social">
            <i className="icon-autodeal-linkedin"></i>
          </a>
          <a href="#" className="cg-actions__social">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="#" className="cg-actions__social">
            <i className="fa-regular fa-envelope"></i>
          </a>
        </div>
      </div>
    </div>
  );
}