import CarDetails from "@/components/car-details";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header5";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "kande-nagoya-website",
  description: "kande-nagoya-website",
};

export default function BlogListingDetailsPage6() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-fixed">
        <Header2 />
      </div>
      <CarDetails />
      <Footer1 />
    </>
  );
}
