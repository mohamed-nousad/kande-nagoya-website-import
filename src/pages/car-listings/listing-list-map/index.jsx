import Cars5 from "@/components/carsListings/Cars5";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "kande-nagoya-website",
  description: "kande-nagoya-website",
};
export default function ListingListMapPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-fixed">
        <Header2 />
      </div>
      <Cars5 />
      <Footer1 />
    </>
  );
}
