import { ChallengeQueryDto } from '@/dto/challenge/challenge.dto';
import { ChallengeTemplatesQueryDto } from '@/dto/challenge/challengeTemplate.dto';
import {
	PaginationDto,
	PaginationWithLanguageDto,
} from '@/dto/query/pagination.dto';
import { ReportPaginationQuery } from '@/types/report/reportPaginationQuery.types';

export const QUERY_KEYS = {
	profile: {
		all: ['profile'],
		username: (username: string) =>
			[...QUERY_KEYS.profile.all, username] as const,
	},
	report: {
		all: ['reports'] as const,
		lists: () => ['reports', 'list'] as const,
		list: (filter: ReportPaginationQuery) =>
			[...QUERY_KEYS.report.lists(), filter] as const,
		details: () => ['reports', 'detail'] as const,
		detail: (id: string) => [...QUERY_KEYS.report.details(), id] as const,
	},
	customization: {
		item: {
			all: ['customization', 'items'] as const,
			lists: () => ['customization', 'items', 'list'] as const,
			list: (params: PaginationDto) =>
				[...QUERY_KEYS.customization.item.lists(), 'all', params] as const,
			listAvailable: (params: PaginationDto) =>
				[
					...QUERY_KEYS.customization.item.lists(),
					'available',
					params,
				] as const,
			details: () => ['customization', 'items', 'detail'] as const,
			detail: (id: string) =>
				[...QUERY_KEYS.customization.item.details(), id] as const,
		},
		bundle: {
			all: ['customization', 'bundles'] as const,
			lists: () => ['customization', 'bundles', 'list'] as const,
			list: (params: PaginationDto) =>
				[...QUERY_KEYS.customization.bundle.lists(), 'all', params] as const,
			listAvailable: (params: PaginationDto) =>
				[
					...QUERY_KEYS.customization.bundle.lists(),
					'available',
					params,
				] as const,
			details: () => ['customization', 'bundles', 'detail'] as const,
			detail: (id: string) =>
				[...QUERY_KEYS.customization.bundle.details(), id] as const,
		},
		product: {
			all: ['customization', 'products'] as const,
			lists: () => ['customization', 'products', 'list'] as const,
			list: (params: PaginationWithLanguageDto) =>
				[...QUERY_KEYS.customization.product.lists(), 'all', params] as const,
			listAvailable: (params: PaginationDto) =>
				[
					...QUERY_KEYS.customization.product.lists(),
					'available',
					params,
				] as const,
			details: () => ['customization', 'products', 'detail'] as const,
			detail: (id: string) =>
				[...QUERY_KEYS.customization.product.details(), id] as const,
		},
		collection: {
			all: ['customization', 'collections'] as const,
			lists: () => ['customization', 'collections', 'list'] as const,
			list: (params: PaginationDto) =>
				[...QUERY_KEYS.customization.collection.lists(), params] as const,
			details: () => ['customization', 'collections', 'detail'] as const,
			detail: (id: string) =>
				[...QUERY_KEYS.customization.collection.details(), id] as const,
		},
	},
	promotion: {
		all: ['promotions'] as const,
		lists: () => ['promotions', 'list'] as const,
		details: () => ['promotions', 'detail'] as const,
		detail: (id: string) => [...QUERY_KEYS.promotion.details(), id] as const,
	},
	achievement: {
		all: ['achievements'] as const,
		lists: () => ['achievements', 'list'] as const,
		details: () => ['achievements', 'detail'] as const,
		detail: (id: string) => [...QUERY_KEYS.achievement.details(), id] as const,
	},
	challenge: {
		all: ['challenges'] as const,
		lists: () => ['challenges', 'list'] as const,
		list: (params: ChallengeQueryDto) =>
			[...QUERY_KEYS.challenge.lists(), params] as const,
		details: () => ['challenges', 'detail'] as const,
		detail: (id: string) => [...QUERY_KEYS.challenge.details(), id] as const,
		allTemplates: ['challenges', 'templates'] as const,
		listsTemplates: () => ['challenges', 'templates', 'list'] as const,
		listTemplates: (params: ChallengeTemplatesQueryDto) =>
			[...QUERY_KEYS.challenge.listsTemplates(), params] as const,
		detailsTemplates: () => ['challenges', 'templates', 'detail'] as const,
		detailTemplate: (id: string) =>
			[...QUERY_KEYS.challenge.detailsTemplates(), id] as const,
	},
} as const;
