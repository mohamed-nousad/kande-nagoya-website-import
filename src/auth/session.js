import { jwtDecode } from "jwt-decode";
import { tokenService } from "@/services/authUtils";

let sessionToken = null;
let sessionUser = null;

const decode = (token) => {
  if (token !== sessionToken) {
    try {
      sessionUser = jwtDecode(token);
    } catch {
      sessionUser = null;
    }
    sessionToken = token;
  }
  return sessionUser;
};

const clear = () => {
  sessionToken = null;
  sessionUser = null;
};

export const getSession = () => {
  const token = tokenService.getAccessToken();
  if (!token) return null;

  const user = decode(token);
  if (!user) return null;

  if (user.exp * 1000 < Date.now()) {
    clear();
    tokenService.removeAccessToken();
    tokenService.removeRefreshToken();
    return null;
  }
  return user;
};

export const clearSession= clear;