import { PaginationDto, PaginationWithLanguageDto } from '@/dto';
import { ReportPaginationQuery } from '@/types/report/reportPaginationQuery.types';

export const QUERY_KEYS = {
	profile: {
		all: ['profile'],
		username: (username: string) =>
			[...QUERY_KEYS.profile.all, username] as const,
	},
	report: {
		all: ['reports'],
		lists: ['reports', 'list'],
		list: (filter: ReportPaginationQuery) =>
			[...QUERY_KEYS.report.lists, filter] as const,
		details: ['reports', 'detail'],
		detail: (id: string) => [...QUERY_KEYS.report.details, id] as const,
	},
	customization: {
		item: {
			all: ['customization', 'items'],
			lists: ['customization', 'items', 'list'],
			list: (params: PaginationDto) =>
				[...QUERY_KEYS.customization.item.lists, 'all', params] as const,
			listAvailable: (params: PaginationDto) =>
				[...QUERY_KEYS.customization.item.lists, 'available', params] as const,
			details: ['customization', 'items', 'detail'] as const,
			detail: (id: string) =>
				[...QUERY_KEYS.customization.item.details, id] as const,
		},
		bundle: {
			all: ['customization', 'bundles'],
			lists: ['customization', 'bundles', 'list'],
			list: (params: PaginationDto) =>
				[...QUERY_KEYS.customization.bundle.lists, 'all', params] as const,
			listAvailable: (params: PaginationDto) =>
				[
					...QUERY_KEYS.customization.bundle.lists,
					'available',
					params,
				] as const,
			details: ['customization', 'bundles', 'detail'],
			detail: (id: string) =>
				[...QUERY_KEYS.customization.bundle.details, id] as const,
		},
		product: {
			all: ['customization', 'products'],
			lists: ['customization', 'products', 'list'],
			list: (params: PaginationWithLanguageDto) =>
				[...QUERY_KEYS.customization.product.lists, 'all', params] as const,
			listAvailable: (params: PaginationDto) =>
				[
					...QUERY_KEYS.customization.product.lists,
					'available',
					params,
				] as const,
			details: ['customization', 'products', 'detail'],
			detail: (id: string) =>
				[...QUERY_KEYS.customization.product.details, id] as const,
		},
		collection: {
			all: ['customization', 'collections'],
			lists: ['customization', 'collections', 'list'],
			list: (params: PaginationDto) =>
				[...QUERY_KEYS.customization.collection.lists, params] as const,
			details: ['customization', 'collections', 'detail'],
			detail: (id: string) =>
				[...QUERY_KEYS.customization.collection.details, id] as const,
		},
	},
	promotion: {
		all: ['promotions'],
		lists: ['promotions', 'list'],
		details: ['promotions', 'detail'],
		detail: (id: string) => [...QUERY_KEYS.promotion.details, id] as const,
	},
	achievement: {
		all: ['achievements'],
		lists: ['achievements', 'list'],
		details: ['achievements', 'detail'],
		detail: (id: string) => [...QUERY_KEYS.achievement.details, id] as const,
	},
} as const;
