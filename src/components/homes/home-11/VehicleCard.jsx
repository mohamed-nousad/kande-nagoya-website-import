import { useNavigate } from "react-router-dom";
import {
  SaveIcon,
  MileageIcon,
  DieselIcon,
  AutoGearIcon,
  SeeMoreIcon,
} from "./Icon";
import { useState } from "react";
import { defaultPlaceholderImg } from "@/constants";
import { LOGIN_MODAL_ID } from "@/constants/AuthConstant";
import { open } from "@/utils/modal";
import { showToast } from "@/utils/toast";
import { useFavourite } from "@/utils/hooks/useFavourite";

const VehicleCard = ({
  vehicle,
  badge = true,
  badgeText = "Great Price",
  badgeClassName = "",
  badgeIcon = null,
}) => {
  const navigate = useNavigate();
  const { isSaved, toggle, isLoading, isLoggedIn } = useFavourite(vehicle?.id);

  if (!vehicle) return null;

  const toggleSave = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      open(LOGIN_MODAL_ID);
      return;
    }
    const result = await toggle();
    if (result?.error) showToast(result.error, "danger");
  };

  const navigateToViewDetail = () => navigate(`/listing-detail-v6/${vehicle?.id}`);

  return (
    <article className="vehicle-card" onClick={navigateToViewDetail}>
      <div className="vehicle-card__image-wrapper">
        <img
          src={vehicle.image}
          alt={vehicle.title || "Vehicle"}
          className="vehicle-card__image"
          onError={(e) => {
          e.target.onerror = null;
              e.target.src = defaultPlaceholderImg;
          }}
        />
        {badge && (
          badgeIcon ? (
            <div className="vehicle-card__badge-icon">
              {badgeIcon}
            </div>
          ) : (
            <span className={`vehicle-card__badge ${badgeClassName}`}>
              {badgeText}
            </span>
          )
        )}

        <button
          type="button"
          className={`vehicle-card__favorite ${isSaved ? "is-saved" : ""}`}
          onClick={toggleSave}
          disabled={isLoading}
        >
          <SaveIcon />
        </button>
      </div>

      <div className="vehicle-card__content">
        <h3 className="vehicle-card__title">
          {vehicle.title || "-"}
        </h3>

        <p className="vehicle-card__subtitle">
          {vehicle.subtitle || "-"}
        </p>

        <div className="vehicle-card__specs">
          <span>
            <MileageIcon />
            {vehicle.mileage}
          </span>

          <span>
            <DieselIcon />
            {vehicle.fuel}
          </span>

          <span>
            <AutoGearIcon />
            {vehicle.transmission}
          </span>
        </div>

        <div className="vehicle-card__footer">
          <div>
            <div className="vehicle-card__price-top">
              <span className="vehicle-card__from">
                from
              </span>

              <span className="vehicle-card__old-price">
                {vehicle.price}
              </span>
            </div>

            <p className="vehicle-card__price">
              {vehicle.discountPrice}
            </p>
          </div>

          <a className="vehicle-card__a" onClick={navigateToViewDetail}>
            View Details
            <SeeMoreIcon />
          </a>
        </div>
      </div>
    </article>
  );
};

export default VehicleCard;