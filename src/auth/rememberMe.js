import { REMEMBER_EMAIL_KEY } from "@/constants/AuthConstant";

export const rememberEmail = {
  save: (email) => localStorage.setItem(REMEMBER_EMAIL_KEY, email),
  get: () => localStorage.getItem(REMEMBER_EMAIL_KEY) || "",
  clear: ()  => localStorage.removeItem(REMEMBER_EMAIL_KEY),
};