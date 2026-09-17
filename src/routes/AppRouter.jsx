import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
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

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route index element={<Home />} />
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
