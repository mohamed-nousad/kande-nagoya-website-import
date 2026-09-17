
import {
   PakistanFlagIcon,
  StarIcon ,
  
} from "./Icon";

const TestimonialCard = ({
  name,
  country,
  rating,
  image,
  review,
}) => {
  if (!name && !review) {
    return null;
  }

  return (
    <div className="testimonial-card">
      <div className="testimonial-content">
        <h4>{name}</h4>

        <div className="testimonial-meta">
          <StarIcon className="star-icon" />

          <span className="rating-text">{rating}</span>

          <span className="meta-divider" />

          <PakistanFlagIcon className="flag-icon" />

          <span className="country-name">{country}</span>
        </div>

        <p>"{review}"</p>
      </div>

      <div className="testimonial-image">
        <img src={image} alt={name} />
      </div>
    </div>
  );
};

export default TestimonialCard;