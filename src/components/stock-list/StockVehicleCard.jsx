import { Link } from "react-router-dom";
import { SaveIcon } from "./Icon";
import { useSelector } from "react-redux";
import { INQUIRY_MODAL_ID, LOGIN_MODAL_ID } from "@/constants/AuthConstant";
import { open } from "@/utils/modal";

const StockVehicleCard = ({ vehicle, onInquiry }) => {
  const user = useSelector((state) => state?.auth?.user);
  // console.log(useSelector((state) => state?.auth))

  const handleRequestInquiry = () => {
    if (!user) {
      open(LOGIN_MODAL_ID);
      return;
    }
    onInquiry?.();
    open(INQUIRY_MODAL_ID);
  };

  return (
    <article className="stock-vehicle-card">
      <div className="stock-card-image-column">
        <div className="stock-card-image-wrapper">
          <img
            src={vehicle.image}
            alt={vehicle.title}
            className="stock-card-image"
          />

          <span className="stock-card-badge">
            {vehicle.badge}
          </span>

        <button
          type="button"
          className="stock-card-favorite"
        >
          <SaveIcon />
        </button>
        </div>

        <div className="stock-card-kan-no">
          Kan No. {vehicle.kanNo}
        </div>
      </div>

      <div className="stock-card-content">
        <Link to={`/listing-detail-v6/${vehicle?._id}`} className="stock-card-title-link">
        <h3 className="stock-card-title">
          {vehicle?.title}
        </h3>
        </Link>

        <div className="stock-card-specs-top">
      <div className="stock-card-spec-item">
        <span>Mileage</span>
        <strong>{vehicle.mileage}</strong>
      </div>

      <div className="stock-card-spec-item">
        <span>Year</span>
        <strong>{vehicle.year}</strong>
      </div>

      <div className="stock-card-spec-item">
        <span>Engine</span>
        <strong>{vehicle.engine}</strong>
      </div>

      <div className="stock-card-spec-item">
        <span>Trans</span>
        <strong>{vehicle.transmission}</strong>
      </div>

      <div className="stock-card-spec-item">
        <span>Location</span>

        <strong className="stock-location">
          <img
            src="/assets/images/stock-list/sg.png"
            alt="Singapore"
            className="stock-location-flag"
          />
          {vehicle.origin}
        </strong>
      </div>
    </div>

    <div className="stock-card-table-wrapper">
    <div className="stock-card-table">
      <div>Model Code</div>
      <div>{vehicle.modelCode}</div>

      <div>Steering</div>
      <div>{vehicle.steering}</div>

      <div>Fuel</div>
      <div>{vehicle.fuel}</div>

      <div>Seats</div>
      <div>{vehicle.seats}</div>

      <div>Engine Code</div>
      <div>{vehicle.engineCode}</div>

      <div>Color</div>
      <div>{vehicle.color}</div>

      <div>Drive</div>
      <div>{vehicle.drive}</div>

      <div>Doors</div>
      <div>{vehicle.doors}</div>
    </div>
    </div>

   <div className="stock-card-features">
      {vehicle.features?.length > 0 ? (
        <>
          {vehicle.features?.slice(0, 3).join(" / ")}
           {vehicle.features?.length > 3 && (
            <a href="/" className="ms-1"> and {vehicle?.features?.length - 3} more....</a>
          )}
        </>
      ) : (
        "No features"
      )}
    </div>
    </div>

      <div className="stock-card-price-column">
        <div className="price-row">
    <div className="price-left">
      <span className="price-label">
        Price
      </span>
    </div>

  <div className="price-right">
    <h3>{vehicle.discountPrice}</h3>

    <div className="discount-row">
      <span>{vehicle.discount}% OFF {vehicle.price}</span>
    </div>
  </div>
</div>

<div className="total-row">
  <div className="total-left">
    <span className="total-price-label">
      Total Price
    </span>

    <small>
      CIF Inspect to {vehicle.destinationPort}
    </small>
  </div>

  <div className="total-right">
    <h4>{vehicle.totalPrice}</h4>

    <span className="roro-text">
      {vehicle.shipType}
    </span>
  </div>
</div>
  <button
    type="button"
    className="inquiry-btn"
    onClick={handleRequestInquiry}
    >
  <img
    src="/assets/images/home-11/icon-svg/email.svg"
    alt="Email"
    className="inquiry-btn-icon"
  />

  INQUIRY
  </button>
  </div>
  </article>
  );
};

export default StockVehicleCard;