import { useRef, useState, } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import SectionHeader from "../homes/home-11/SectionHeader";
import VehicleCard from "../homes/home-11/VehicleCard";
import { SriLankaFlag } from "../homes/home-11/Icon";
import { useGetStockSriLankaQuery } from "@/store/api/webStockApi";
import { useNavigate } from "react-router-dom";
import { DEFAULT_CARD_LIMIT } from "@/constants";

const SRILANKA_BREAKPOINTS = {
  0: { slidesPerView: 1.5, spaceBetween: 12 },
  480: { slidesPerView: 2.2, spaceBetween: 12 },
  768: { slidesPerView: 3, spaceBetween: 16 },
  1024: { slidesPerView: 4, spaceBetween: 16 },
};

const StockSriLanka = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetStockSriLankaQuery(DEFAULT_CARD_LIMIT);

  const vehicles = data?.data ?? [];

  if (isLoading || isError || vehicles.length === 0) {
    return null;
  }

  return (
    <section className="stock-srilanka-section">
      <SectionHeader
        title="Stock for SRI LANKA users"
        flag={<SriLankaFlag />}
        onPrev={() => swiperRef.current?.slidePrev()}
        onNext={() => swiperRef.current?.slideNext()}
      />

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1.5}
        breakpoints={SRILANKA_BREAKPOINTS}
        observer
        observeParents
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        className="stock-srilanka-slider"
      >
        {vehicles.map((vehicle) => (
          <SwiperSlide key={vehicle.id}>
            <VehicleCard
              vehicle={vehicle}
              badgeText="Great Price"
              badgeClassName="vehicle-card__badge--green"
            />
          </SwiperSlide>
        ))}

        <SwiperSlide>
          <button
            type="button"
            className="stock-srilanka-view-all-card"
            onClick={() => navigate("/stock-list")}
            aria-label="View all available stock"
          >
            <span className="stock-srilanka-view-all-card__circle">
              →
            </span>

            <span className="stock-srilanka-view-all-card__title">
              View All
            </span>

            <span className="stock-srilanka-view-all-card__description">
              Browse all available stocks
            </span>
          </button>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default StockSriLanka;