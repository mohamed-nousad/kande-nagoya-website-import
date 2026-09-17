import { Routes, Route } from "react-router-dom";
import HomePage2 from "@/pages/homes/home02";
import HomePage5 from "@/pages/homes/home05";
import HomePage7 from "@/pages/homes/home07";
import HomePage8 from "@/pages/homes/home08";
import HomePage9 from "@/pages/homes/home09";
import HomePage11 from "@/pages/homes/home11";
import SignupLoginPage from "@/pages/auth/SignupLoginPage";
import StockListPage from "@/pages/car-listings/stock-list";
import BlogListingDetailsPage6 from "@/pages/car-details/listing-detail-v6";
import Profile from "@/pages/profile";
import NotFound from "@/components/notFound";
import SamplePagination from "@/pages/other-pages/paginationTest";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import AboutUs from "@/pages/AboutUs";
import PreOrder from "@/pages/PreOrder";
import Vehicles from "@/pages/Vehicles";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";

const PORT = Number(window.location.port || 5000);

const LandingByPort = {
  5000: HomePage11,
  5001: HomePage2,
  5002: HomePage5,
  5003: HomePage7,
  5004: HomePage8,
  5005: HomePage9,
};

const LandingComponent = LandingByPort[PORT] || HomePage11;

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route index element={<LandingComponent />} />
        <Route path="home11" element={<HomePage11 />} />
        <Route path="login" element={<SignupLoginPage />} />
        <Route path="stock-list" element={<StockListPage />} />
        <Route path="listing-detail-v6/:id" element={<BlogListingDetailsPage6 />} />
        <Route path="sample-pagination" element={<SamplePagination />} />

        <Route path="about-us" element={<AboutUs />} />
        <Route path="pre-order" element={<PreOrder />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
