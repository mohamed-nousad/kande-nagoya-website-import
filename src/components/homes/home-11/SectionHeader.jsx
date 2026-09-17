import {
  SectionHeaderLeftArrowIcon,
  SectionHeaderRightArrowIcon,
} from "./Icon";

const SectionHeader = ({ title, flag, countryCode, countryName, onPrev, onNext }) => {
  const flagNode =
    flag ??
    (countryCode && (
      <span
        className={`fi fi-${countryCode.toLowerCase()} vehicle-section-header__flag`}
        role="img"
        aria-label={countryName || countryCode}
      />
    ));

  return (
    <div className="vehicle-section-header">
      <div className="vehicle-section-header__left">
        {flagNode}
        <h2>{title}</h2>
      </div>

      <div className="vehicle-section-header__actions">
        <button type="button" onClick={onPrev}>
          <SectionHeaderLeftArrowIcon />
        </button>

        <button type="button" onClick={onNext}>
          <SectionHeaderRightArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default SectionHeader;