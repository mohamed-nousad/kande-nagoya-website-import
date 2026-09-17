import Cars4 from "@/components/carsListings/Cars4";
import Footer1 from "@/components/footer/Footer1";
import Header2 from "@/components/headers/Header2";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "kande-nagoya-website",
  description: "kande-nagoya-website",
};
export default function ListingGridMapPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-fixed">
        <Header2 />
      </div>
      <Cars4 />
      <Footer1 />
    </>
  );
}
