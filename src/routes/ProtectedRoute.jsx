import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UNAUTHENTICATED_ENTRY, REDIRECT_URL_KEY } from "@/configs/AppConfig";
import { LOGIN_MODAL_ID } from "@/constants/AuthConstant";
import { close } from "@/utils/modal";
import { signOutSuccess } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "@/auth/session";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const isValid = !!getSession(); 

  useEffect(() => {
    if (isValid) {
      close(LOGIN_MODAL_ID);
    } else if (user) {
      dispatch(signOutSuccess());
    }
  }, [isValid, user, dispatch]);

  if (!isValid) {
    return (
      <Navigate
        to={`${UNAUTHENTICATED_ENTRY}?${REDIRECT_URL_KEY}=${pathname}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;