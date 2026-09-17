import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICONS } from "@/configs/assetPaths";
import Icon from "../Icon";
import "./CarCard.scss";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="car-card">
      <div className="car-image-wrapper">
        <img src={car.image} alt={car.title} className="car-image" />
        <button
          className="wishlist-btn"
          onClick={() => setWishlisted(!wishlisted)}
        >
          <Icon src={wishlisted ? ICONS.saveFilled : ICONS.saveOutline} alt="wishlist" />
        </button>
      </div>

      <div className="car-info">
        <h4 className="car-title">{car.title}</h4>
        <p className="car-subtitle">{car.subtitle}</p>

        <div className="car-specs">
          <div className="spec">
            <Icon src={ICONS.milage} alt="mileage" />
            <span>{car.mileage}</span>
          </div>
          <div className="spec">
            <Icon src={ICONS.fuel} alt="fuel" />
            <span>{car.fuel}</span>
          </div>
          <div className="spec">
            <Icon src={ICONS.transmission} alt="transmission" />
            <span>{car.transmission}</span>
          </div>
        </div>

        <div className="car-footer">
          <div className="price-block">
            <span className="price-label">from</span>
            <span className="price">{car.price}</span>
          </div>
          <button
            className="view-details-btn"
            onClick={() => navigate(`/listing-detail-v6/${car.id}`)}
          >
            View Details
            <Icon src={ICONS.arrowTopRight} alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;