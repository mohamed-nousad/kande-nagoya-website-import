import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CarGallery from "./CarGallery";
import CarPrice from "./CarPrice";
import PurchaseFlow from "../purchase-flow/PurchaseFlow";

import CarFeatures from "./CarFeatures";
import LeftSidebar from "@/components/common/leftSidebar";
import CarTestimonials from "../testimonials/CarTestimonials";
import CarSpecs from "./CarSpecs";
import RecommendedVehicles from "../vehicle-listings/RecommendedVehicles";
import { useGetStockQuery } from "@/store/api/webStockApi";
import { useUpdateBrowsingHistoryMutation } from "@/store/api/browsingHistoryApi";
import Loading from "../common/Loading";

export default function CarDetails() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const firedRef = useRef(false);

  const { data: vehicle, isLoading, isError } = useGetStockQuery(id, {
    skip: !id,
  });

  const [updateBrowsingHistory] = useUpdateBrowsingHistoryMutation();
  
  useEffect(() => {
    if (userId && id && !firedRef.current) {
      firedRef.current = true;
      updateBrowsingHistory({ id: userId, data: { vehicleId: id } });
    }
  }, [userId, id]);

  if (isLoading) return <Loading inline tall/>;
  if (isError || !vehicle) return <div className="cd6-error">Stock not found</div>;

  return (
    <section className="cd6">
      <div className="container2">
        <div className="cd6-grid">

          <div className="cd6-browse">
            <LeftSidebar />
          </div>

          <div className="cd6-left">
            <div className="cd6-head">
              <div className="cd6-breadcrumb">
                Japanese Used Cars Top <span>/</span> Car List <span>/</span> {vehicle.make} <span>/</span> {vehicle.model}
              </div>

              <div className="cd6-title-row">
                <div className="cd6-top">
                  <span className="cd6-ref">Kan No. {vehicle?.kandeNo}</span> 
                  <span className="cd6-hot__tag">
                    <span className="cd6-hot__badge">{vehicle?.inquiryCount}</span> Persons are Inquiring This Car
                  </span>
                </div>
                <h1 className="cd6-title">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
              </div>
            </div>

            <CarGallery vehicle={vehicle} />
            <hr />
            <CarSpecs vehicle={vehicle} />
            <hr />
            <CarFeatures vehicle={vehicle} />
            <hr className="cd6-divider-last" />

            <div className="cd6-content-width">
              <div className="cd6-purchase-flow">
                <PurchaseFlow vehicle={vehicle} />
              </div>
              <div className="cd6-recommended">
                <RecommendedVehicles vehicle={vehicle} />
              </div>
              <div className="cd6-testimonials">
                <CarTestimonials />
              </div>
            </div>
          </div>

          <div className="cd6-right">
            <div className="cd6-side">
              <CarPrice vehicle={vehicle} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}