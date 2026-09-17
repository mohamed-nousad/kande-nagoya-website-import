import { useNavigate } from "react-router-dom";
import {WhiteSeeMoreIcon } from "./Icon";

const SeeMoreButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="see-more-button"
      onClick={() => navigate("/stock-list")}
    >
      <span>See More</span>

      <div className="see-more-button__icon">
        <WhiteSeeMoreIcon />
      </div>
    </button>
  );
};

export default SeeMoreButton;