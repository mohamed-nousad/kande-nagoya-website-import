import { COOKIE_OPTIONS, COOKIE_REMOVE_OPTIONS } from "@/constants/AuthConstant";
import { AUTH_TOKEN, REFRESH_TOKEN } from "@/constants/AuthConstant";

export const storage = {
  set: (key, value) => localStorage.setItem(key, value),
  get: (key) => localStorage.getItem(key),
  remove: (key) => localStorage.removeItem(key),
};

export const cookie = {
  set: (name, value) => { document.cookie = `${name}=${value}; ${COOKIE_OPTIONS}`; },
  get: (name) => { return document.cookie.split("; ").find((row) => row.startsWith(name + "="))?.split("=")[1] || ""; },
  remove: (name) => { document.cookie = `${name}=; ${COOKIE_REMOVE_OPTIONS}`; },
};

export const tokenService = {
  setAccessToken: (value) => storage.set(AUTH_TOKEN, value),
  getAccessToken: () => storage.get(AUTH_TOKEN),
  removeAccessToken: () => storage.remove(AUTH_TOKEN),

  setRefreshToken: (value) => storage.set(REFRESH_TOKEN, value),
  getRefreshToken: () => storage.get(REFRESH_TOKEN),
  removeRefreshToken: () => storage.remove(REFRESH_TOKEN),
};
