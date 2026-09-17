import MetaComponent from "@/components/common/MetaComponent";
import SiteHeader from "@/components/homes/home-11/sections/SiteHeader";
import SiteFooter from "@/components/homes/home-11/sections/SiteFooter";
import LeftSidebar from "@/components/common/leftSidebar";
import RightSidebar from "@/components/common/rightSidebar";
import VehicleSearchFilter from "@/components/stock-list/VehicleSearchFilter";
import PriceCalculator from "@/components/stock-list/PriceCalculator";
import SearchResultsHeader from "@/components/stock-list/SearchResultsHeader";
import StockVehicleList from "@/components/stock-list/StockVehicleList";
import RecommendedVehicles from "@/components/vehicle-listings/RecommendedVehicles";
import CustomerTestimonials from "@/components/testimonials/CustomerTestimonials";
import ExploreToyotaModels from "@/components/explore-vehicles/ExploreToyotaModels";

const metadata = {
  title: "Stock List | Wheels Lanka Trading",
  description: "Browse the Wheels Lanka Trading vehicle stock list.",
};

export default function StockListPage() {
  return (
    <>
      <MetaComponent meta={metadata} />

      <div className="kande-home">
        <SiteHeader solid />
      </div>

      <div className="stock-list-page">
        <LeftSidebar />

        <main className="stock-list-main">
          <VehicleSearchFilter />
          <PriceCalculator />
          <SearchResultsHeader />
          <StockVehicleList />
          <RecommendedVehicles />
          <CustomerTestimonials />
          <ExploreToyotaModels />
        </main>

        <div className="stock-list-right-sidebar">
          <RightSidebar />
        </div>
      </div>

      <div className="mt-5 pt-5"></div>

      <div className="kande-home">
        <SiteFooter />
      </div>
    </>
  );
}
