import { WhiteSeeMoreIcon } from "./Icon";

const CtaCard = ({
  title,
  description,
  buttonText,
  icon,
  variant,
}) => {
  return (
    <div
  className={`cta-card cta-card--${variant || "primary"}`}
>
      <div className="cta-card__content">
        <h3>{title || ""}</h3>


        <p>{description || ""}</p>

        <button
          type="button"
          className="cta-card__button"
        >
          <span>{buttonText}</span>

          <span className="cta-card__button-icon">
            <WhiteSeeMoreIcon />
          </span>
        </button>
      </div>

      <div className="cta-card__image">
       <img
          src={icon || ""}
          alt={title || "CTA image"}
        />
      </div>
    </div>
  );
};

export default CtaCard;