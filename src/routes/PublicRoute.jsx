import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { UNAUTHENTICATED_ENTRY } from "@/configs/AppConfig";
import { LOGIN_MODAL_ID, LOGIN_MODAL_STORAGE_KEY } from "@/constants/AuthConstant";
import { open, close } from "@/utils/modal";

const PublicRoute = () => {
  const { pathname } = useLocation();
  const isLoggedIn = useSelector((state) => !!state.auth.user);

  useEffect(() => {
    const isModalClosed = localStorage.getItem(LOGIN_MODAL_STORAGE_KEY) === "true";
    const landingRoutes = ["/", "/home11"];

    const shouldShow =
      !isLoggedIn &&
      pathname !== UNAUTHENTICATED_ENTRY &&
      !landingRoutes.includes(pathname) &&
      !isModalClosed;

    if (shouldShow) {
      open(LOGIN_MODAL_ID);
    } else {
      close(LOGIN_MODAL_ID);
    }
  }, [isLoggedIn, pathname]);

  return <Outlet />;
};

export default PublicRoute;