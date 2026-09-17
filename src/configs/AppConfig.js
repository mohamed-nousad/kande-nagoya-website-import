import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR } from '@/constants/ThemeConstant';

export const AUTHENTICATED_ENTRY = "/";
export const UNAUTHENTICATED_ENTRY = "/login";
export const REDIRECT_URL_KEY = "redirect";

export const APP_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5656"
export const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5656"

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'en',
	navType: NAV_TYPE_SIDE,
	topNavColor: '#0096DB',
	headerNavColor: '',
	mobileNav: false,
	currentTheme: 'light',
	direction: DIR_LTR,
	blankLayout: false
};

