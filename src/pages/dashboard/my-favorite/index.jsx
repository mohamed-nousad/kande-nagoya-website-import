import MyFavourite from "@/components/dashboard/MyFavourite";
import Sidebar from "@/components/dashboard/Sidebar";
import Header4 from "@/components/headers/Header4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "kande-nagoya-website",
  description: "kande-nagoya-website",
};
export default function MyFavoritePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Sidebar />
      <div id="wrapper-dashboard">
        <div id="pagee" className="clearfix">
          <Header4 />
        </div>
        <div id="themesflat-content"></div>
        <div className="dashboard-toggle">Show DashBoard</div>
        <MyFavourite />
      </div>
    </>
  );
}
