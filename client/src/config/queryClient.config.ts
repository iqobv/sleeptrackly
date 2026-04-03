export const QUERY_KEYS = {
	auth: {
		needOldPassword: (userId: string) => ['needOldPassword', userId] as const,
		sessions: (userId: string) => ['sessions', userId] as const,
		terminateSession: (userId: string, sessionId: string) =>
			['terminateSession', userId, sessionId] as const,
		terminateAllSession: (userId: string) =>
			['terminateAllSession', userId] as const,
		validateVerificationToken: (userId: string, token: string | null) =>
			['validateVerificationToken', userId, token] as const,
		sendEmailForResetPassword: ['sendEmailForResetPassword'] as const,
		sendVerificationEmail: ['sendVerificationEmail'] as const,
		resetPassword: ['resetPassword'] as const,
		changePassword: (userId: string) => ['changePassword', userId] as const,
		deleteAccount: ['deleteAccount'] as const,
		generateQr: ['generateQr'] as const,
		setSession: ['setSession'] as const,
		approveQrLogin: ['approveQrLogin'] as const,
		logout: (userId: string) => ['logout', userId] as const,
		resendVerificationEmail: (email: string) =>
			['resendVerificationEmail', email] as const,
	},
	challenges: {
		all: (userId: string) => ['challenges', userId] as const,
		one: (id: string) => ['challenge', id] as const,
		deleteChallenge: (id: string) => ['challenge', id] as const,
		markTaskAsCompleted: (taskId: string) =>
			['markAsCompleted', taskId] as const,
	},
	dashboard: {
		all: (userId: string, selectedWeek: number) =>
			['dashboard', userId, selectedWeek] as const,
	},
	friends: {
		all: (userId: string) => ['friends', userId] as const,
		pendings: (userId: string) => ['pendings', userId] as const,
		search: (search: string) => ['search', search] as const,
		sendFriendRequest: (userId: string) =>
			['sendFriendRequest', userId] as const,
		pendingsManyChange: (userId: string) =>
			['pendingsManyChange', userId] as const,
		pendingsChange: (userId: string) => ['pendingsChange', userId] as const,
	},
	user: {
		avatar: (userId: string) => ['user', userId] as const,
		me: ['user', 'me'] as const,
	},
	profile: {
		username: (username: string) => ['profile', username] as const,
	},
	timer: {
		one: (userId: string) => ['timer', userId] as const,
		update: (userId: string) => ['updateSleep', userId] as const,
	},
	report: {
		send: ['sendReport'] as const,
	},
	notifications: {
		all: (userId: string) => ['notifications', userId] as const,
		settings: (userId: string) => ['notificationSettings', userId] as const,
		updateSettings: (userId: string) =>
			['updateNotificationSettings', userId] as const,
		markAllAsRead: (userId: string) => ['markAllAsRead', userId] as const,
	},
	inventory: {
		all: (userId: string, page: number) => ['inventory', userId, page] as const,
		equipItem: (itemId: string) => ['equipItem', itemId] as const,
	},
	shop: {
		featured: ['featuredShop'] as const,
		allProducts: (filters: string) => ['allProducts', filters] as const,
		makePurchase: (productId: string) => ['makePurchase', productId] as const,
	},
	coin: {
		userCoin: ['userCoin'] as const,
	},
	privacy: {
		get: ['privacy', 'get'] as const,
		update: ['privacy', 'update'] as const,
	},
	promotion: {
		use: ['promotion', 'use'] as const,
	},
} as const;
