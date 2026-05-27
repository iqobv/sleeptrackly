import { PaginationDto, PaginationWithLanguageDto } from '@/dto';
import { ReportPaginationQuery } from '@/types/report/reportPaginationQuery.types';

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
		getReports: (filter: ReportPaginationQuery) =>
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
	customization: {
		item: {
			getAll: (params: PaginationDto) => ['getAllItems', params] as const,
			getById: (id: string) => ['getItemById', id] as const,
			create: ['createItem'] as const,
			update: (id: string) => ['updateItem', id] as const,
			delete: (id: string) => ['deleteItem', id] as const,
			getAllAvailable: (params: PaginationDto) =>
				['getAllAvailableItems', params] as const,
		},
		bundle: {
			getAll: (params: PaginationDto) => ['getAllBundles', params] as const,
			getById: (id: string) => ['getBundleById', id] as const,
			create: ['createBundle'] as const,
			update: (id: string) => ['updateBundle', id] as const,
			delete: (id: string) => ['deleteBundle', id] as const,
			getAllAvailable: (params: PaginationDto) =>
				['getAllAvailableBundles', params] as const,
		},
		product: {
			getAll: (params: PaginationWithLanguageDto) =>
				['getAllProducts', params] as const,
			getAllAvailable: (params: PaginationDto) =>
				['getAllAvailableProducts', params] as const,
			getById: (id: string) => ['getProductById', id] as const,
			create: ['createProduct'] as const,
			update: (id: string) => ['updateProduct', id] as const,
			delete: (id: string) => ['deleteProduct', id] as const,
		},
	},
	promotion: {
		all: ['getAllPromotions'],
		byId: (id: string) => ['getPromotionById', id] as const,
	} as const,
	achievement: {
		all: ['getAllAchievements'],
		byId: (id: string) => ['getAchievementById', id] as const,
	} as const,
} as const;
