import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { coverBannerData } from "../../data/coverBannerData";
import { LeftArrowIcon, RightArrowIcon } from "../homes/home-11/Icon";

const CoverBanners = () => {
  const sliderBanners = coverBannerData?.sliderBanners;

if (!Array.isArray(sliderBanners) || sliderBanners.length === 0) {
  return null;
}
  return (
    <section className="cover-banners-section">
      <div className="cover-banners-layout">
        <div className="cover-banners-main-slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".cover-banner-prev",
              nextEl: ".cover-banner-next",
            }}
            pagination={{
              clickable: true,
            }}
            slidesPerView={1}
            observer={true}
            observeParents={true}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
            {sliderBanners.map((banner, index) => (
              <SwiperSlide key={index}>
                <img
                  src={banner}
                  alt={`Banner ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className="cover-banner-prev"
            aria-label="Previous Slide"
          >
            <LeftArrowIcon />
          </button>

          <button
            type="button"
            className="cover-banner-next"
            aria-label="Next Slide"
          >
            <RightArrowIcon />
          </button>
        </div>

        <div className="cover-banners-mini-grid">
          <img
            src={coverBannerData.nohaBanner}
            alt="Toyota Noha"
          />

          <img
            src={coverBannerData.usedTruckBanner}
            alt="Used Truck"
          />

          <img
            src={coverBannerData.hiaceVanBanner}
            alt="Hiace Van"
          />

          <img
            src={coverBannerData.toyotaFitBanner}
            alt="Toyota Fit"
          />
        </div>
      </div>
    </section>
  );
};

export default CoverBanners;