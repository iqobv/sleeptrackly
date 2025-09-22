export const PAGES = {
	HOME: '/',
	TIMER: '/timer',
	CHALLENGES: '/challenges',
	CHALLENGE: (id: string) => `/challenges/${id}`,
	NEW_CHALLENGE: '/challenges/new',
	EDIT_CHALLENGE: (id: string) => `/challenges/${id}/edit`,
	DASHBOARD: '/dashboard',
	LOGIN: '/login',
	REGISTER: '/register',
	SETTINGS: '/settings',
	PROFILE: (username: string) => `/u/${username}`,
	EMAIL_CONFIRMATION :"/email-confirmation"
};
