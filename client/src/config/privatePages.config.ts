export const PRIVATE_PAGES = {
	TIMER: '/timer',
	CHALLENGES_BASE: '/challenges',
	CHALLENGES: {
		ALL: '/challenges',
		BY_ID: (id: string) => `/challenges/${id}`,
		NEW: '/challenges/new',
		EDIT: (id: string) => `/challenges/${id}/edit`,
	},
	DASHBOARD: '/dashboard',
	SETTINGS_BASE: '/settings',
	SETTINGS: {
		MAIN: '/settings',
		SESSIONS: '/settings/sessions',
	},
	FRIENDS_BASE: '/friends',
	FRIENDS: {
		ALL: '/friends',
		REQUESTS: '/friends/pending',
	},
	INVENTORY: '/inventory',
	SHOP_BASE: '/shop',
	SHOP: {
		FEATURED: '/shop',
		CATALOG: '/shop/catalog',
	},
	PROMO: '/promo',
} as const;
