import { useRef, useEffect, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import SectionHeader from "../home/SectionHeader";
import VehicleCard from "../home/VehicleCard";
import { useGetCountryStockQuery } from "@/store/api/webStockApi";
import { DEFAULT_CARD_LIMIT } from "@/constants";
import { useSelector } from "react-redux";
import { getCountryWithCode } from "@/utils/webUserCountryUtils";
import { useGetIpCountryQuery } from "@/store/api/ipCountryApi";

const COUNTRY_STOCK_BREAKPOINTS = {
  0: { slidesPerView: 1.5, spaceBetween: 12 },
  480: { slidesPerView: 2.2, spaceBetween: 12 },
  768: { slidesPerView: 3, spaceBetween: 16 },
  1024: { slidesPerView: 4, spaceBetween: 16 },
};

const CountryStock = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const savedCountry = useMemo(
    () => getCountryWithCode(countries, user?.country) ?? null,
    [countries, user?.country]
  );
  const { data: ipCountry } = useGetIpCountryQuery(undefined, {
    skip: !!savedCountry,
  });
  const userCountry = useMemo(
    () => savedCountry || ipCountry || null,
    [savedCountry, ipCountry]
  );

  useEffect(() => {
    let alive = true;
    fetch("/data/countries.json")
      .then((res) => res.json())
      .then((data) => { if (alive) setCountries(data); })
      .catch((error) => console.error("Failed to load countries:", error));
    return () => { alive = false; };
  }, []);

  const urlCountry = searchParams.get("country");
  const countryName = urlCountry || userCountry?.name;

  const countryCode = urlCountry
    ? countries.find((c) => c.label.toLowerCase() === urlCountry.toLowerCase())?.flag
    : userCountry?.code?.toLowerCase();

  const { data, isLoading, isError } = useGetCountryStockQuery(
    { ...DEFAULT_CARD_LIMIT, countryStock: countryName },
    { skip: !countryName }
  );

  const vehicles = data?.data ?? [];
  
  if (isLoading || !countryName) {
    return null;
  }

  const stockExist = !isError && vehicles.length > 0;
  const isLoop = vehicles.length > 4;

  const navigateToStockList = () => {
    navigate(stockExist ? `/stock-list?country=${encodeURIComponent(userCountry?.name ?? "")}` : "/stock-list");
  };

  return (
    <section className="country-stock-section">
      <SectionHeader
        title={`Stock for ${countryName} users`}
        countryCode={countryCode}
        countryName={countryName}
        onPrev={() => swiperRef.current?.slidePrev()}
        onNext={() => swiperRef.current?.slideNext()}
      />

      {!stockExist ? (
        <div className="country-stock-empty">
          <h4 className="country-stock-empty__title">No stock found for {countryName}</h4>
          <p className="country-stock-empty__desc">
            We don't have any vehicles listed for this country right now.
          </p>
          <button type="button" className="country-stock-empty__btn" onClick={navigateToStockList}>
            View all stocks
          </button>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={COUNTRY_STOCK_BREAKPOINTS}
          observer
          observeParents
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          className="country-stock-slider"
          loop={isLoop}
          autoplay={isLoop ? { delay: 5000, disableOnInteraction: false } : false}
        >
          {vehicles?.map((vehicle) => (
            <SwiperSlide key={vehicle.id}>
              <VehicleCard vehicle={vehicle} badgeText="Great Price" badgeClassName="vehicle-card__badge--green" />
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <button type="button" className="country-stock-view-all-card" onClick={navigateToStockList} aria-label="View all available stock">
              <span className="country-stock-view-all-card__circle">→</span>
              <span className="country-stock-view-all-card__title">View All</span>
              <span className="country-stock-view-all-card__description">Browse all available stocks</span>
            </button>
          </SwiperSlide>
        </Swiper>
      )}
    </section>
  );
};

export default CountryStock;