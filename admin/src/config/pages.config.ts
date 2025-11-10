export const PAGES = {
	HOME: '/',
	LOGIN: '/login',
	USERS: '/users',
	USER: (username: string) => `/users/${username}`,
	REPORTS: '/reports',
	REPORT: (id: string) => `/reports/${id}`,
} as const;
