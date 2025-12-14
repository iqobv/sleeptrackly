import { IReportPaginationQuery } from '@/types/report/reportPaginationQuery.types';

export const QUERY_KEYS = {
	auth: {
		logout: (userId: string) => ['logout', userId] as const,
	},
	user: {
		avatar: (userId: string) => ['user', userId] as const,
	},
	profile: {
		username: (username: string) => ['profile', username] as const,
	},
	report: {
		getReports: (filter: IReportPaginationQuery) =>
			['getReports', filter] as const,
		getReport: (id: string) => ['getReport', id] as const,
		send: ['sendReport'] as const,
	},
	userSanction: {
		create: ['createSanction'] as const,
		remove: ['removeSanction'] as const,
	},
	notifications: {
		create: ['createNotification'] as const,
	},
} as const;
