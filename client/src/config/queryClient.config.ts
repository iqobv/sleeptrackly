import { PaginatedShopFilterDto } from '@/dto/shop/shop.dto';

export const QUERY_KEYS = {
	auth: {
		all: ['auth'] as const,
		needOldPassword: () => ['auth', 'needOldPassword'] as const,
		generateQr: () => ['auth', 'qr', 'generate'] as const,
	},
	sessions: {
		all: ['sessions'] as const,
		list: () => ['sessions', 'list'] as const,
	},
	challenges: {
		all: ['challenges'] as const,
		list: () => ['challenges', 'list'] as const,
		details: () => ['challenges', 'detail'] as const,
		detail: (id: string) => ['challenges', 'detail', id] as const,
	},
	dashboard: {
		base: ['dashboard'] as const,
		byDate: (date: string) => ['dashboard', { date }] as const,
	},
	friends: {
		all: ['friends'] as const,
		list: () => ['friends', 'list'] as const,
		pendings: () => ['friends', 'pendings'] as const,
	},
	user: {
		base: ['user'] as const,
		me: () => ['user', 'me'] as const,
	},
	profile: {
		base: ['profile'] as const,
		username: (username: string) => ['profile', username] as const,
	},
	timer: {
		one: ['timer'] as const,
	},
	notifications: {
		all: ['notifications'] as const,
		list: () => ['notifications', 'list'] as const,
		settings: () => ['notifications', 'settings'] as const,
	},
	inventory: {
		all: ['inventory'] as const,
		lists: () => ['inventory', 'list'] as const,
		list: (page: number) => ['inventory', 'list', { page }] as const,
	},
	shop: {
		all: ['shop'] as const,
		featured: () => ['shop', 'featured'] as const,
		catalogs: () => ['shop', 'catalog'] as const,
		catalog: (filters: PaginatedShopFilterDto) =>
			['shop', 'catalog', filters] as const,
		filters: ['shop', 'filters'],
	},
	coin: {
		userCoin: ['coins'] as const,
	},
	privacy: {
		base: ['privacy'] as const,
		settings: () => ['privacy', 'setting'] as const,
	},
	weeklySummary: {
		base: ['weeklySummary'] as const,
		one: (id: string) => ['weeklySummary', id],
	},
	achievement: {
		all: ['achievements'],
		list: () => ['achievements', 'list'] as const,
	} as const,
} as const;
