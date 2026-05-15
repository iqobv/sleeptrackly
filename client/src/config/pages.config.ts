export const PAGES = {
	HOME: '/',
	PROFILE: (username: string) => `/u/${username}`,
	TERMS_AND_CONDITIONS: '/terms-and-conditions',
	COOKIES: '/cookies',
	PRIVACY_POLICY: '/privacy-policy',
} as const;
