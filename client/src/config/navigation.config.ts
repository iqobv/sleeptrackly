import { getAbsoluteUrl } from '@/utils/getAbsolutePath.util';
import { AUTH_PAGES } from './authPages.config';
import { PAGES } from './pages.config';
import { PRIVATE_PAGES } from './privatePages.config';
import { SUBDOMAINS } from './subdomains.config';

export const CROSS_DOMAIN_ROUTES = {
	HOME: getAbsoluteUrl(SUBDOMAINS.WWW, PAGES.HOME),
	APP_LOGIN: getAbsoluteUrl(SUBDOMAINS.APP, AUTH_PAGES.LOGIN),
	APP_REGISTER: getAbsoluteUrl(SUBDOMAINS.APP, AUTH_PAGES.REGISTER),
	APP_DASHBOARD: getAbsoluteUrl(SUBDOMAINS.APP, PRIVATE_PAGES.DASHBOARD),
	TERMS_AND_CONDITIONS: getAbsoluteUrl(
		SUBDOMAINS.WWW,
		PAGES.TERMS_AND_CONDITIONS,
	),
	PRIVACY_POLICY: getAbsoluteUrl(SUBDOMAINS.WWW, PAGES.PRIVACY_POLICY),
	COOKIES: getAbsoluteUrl(SUBDOMAINS.WWW, PAGES.COOKIES),
} as const;
