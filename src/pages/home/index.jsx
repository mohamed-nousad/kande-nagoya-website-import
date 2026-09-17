import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import SiteHeader from "@/components/home/sections/SiteHeader";
import HeroSearch from "@/components/home/sections/HeroSearch";
import BrowseSection from "@/components/home/sections/BrowseSection";
import CollectionSection from "@/components/home/sections/CollectionSection";
import DealSection from "@/components/home/sections/DealSection";
import BestDealSection from "@/components/home/sections/BestDealSection";
import CompareSection from "@/components/home/sections/CompareSection";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";
import VideoSection from "@/components/home/sections/VideoSection";
import BlogsSection from "@/components/home/sections/BlogsSection";
import FaqSection from "@/components/home/sections/FaqSection";
import Footer1 from "@/components/footer/Footer1";

const metadata = {
  title: "Wheels Lanka Trading",
  description: "Find your perfect vehicle with Wheels Lanka Trading, Sri Lanka.",
};

export default function Home() {
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
        <Footer1 />
      </div>
    </>
  );
}
