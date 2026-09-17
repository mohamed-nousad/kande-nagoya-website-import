import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import SiteHeader from "@/components/homes/home-11/sections/SiteHeader";
import SiteFooter from "@/components/homes/home-11/sections/SiteFooter";

export default function PagePlaceholder({ title }) {
  return (
    <>
      <MetaComponent meta={{ title: `${title} | Wheels Lanka Trading`, description: title }} />
      <div className="kande-home">
        <SiteHeader />
        <section className="page-placeholder">
          <div className="container-wide">
            <h1>{title}</h1>
            <p>This page is coming soon.</p>
          </div>
        </section>
        <SiteFooter />
      </div>
    </>
  );
}
