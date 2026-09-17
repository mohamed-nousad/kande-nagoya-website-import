import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import SiteHeader from "@/components/homes/home-11/sections/SiteHeader";
import HeroSearch from "@/components/homes/home-11/sections/HeroSearch";
import BrowseSection from "@/components/homes/home-11/sections/BrowseSection";
import CollectionSection from "@/components/homes/home-11/sections/CollectionSection";
import DealSection from "@/components/homes/home-11/sections/DealSection";
import BestDealSection from "@/components/homes/home-11/sections/BestDealSection";
import CompareSection from "@/components/homes/home-11/sections/CompareSection";
import TestimonialsSection from "@/components/homes/home-11/sections/TestimonialsSection";
import VideoSection from "@/components/homes/home-11/sections/VideoSection";
import BlogsSection from "@/components/homes/home-11/sections/BlogsSection";
import FaqSection from "@/components/homes/home-11/sections/FaqSection";
import SiteFooter from "@/components/homes/home-11/sections/SiteFooter";

const metadata = {
  title: "Wheels Lanka Trading",
  description: "Find your perfect vehicle with Wheels Lanka Trading, Sri Lanka.",
};

export default function HomePage11() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="kande-home">
        <SiteHeader />
        <HeroSearch />
        <BrowseSection />
        <CollectionSection />
        <DealSection />
        <BestDealSection />
        <CompareSection />
        <TestimonialsSection />
        <VideoSection />
        <BlogsSection />
        <FaqSection />
        <SiteFooter />
      </div>
    </>
  );
}
