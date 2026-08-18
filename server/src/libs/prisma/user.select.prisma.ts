import { Prisma } from '@generated/prisma/client';

export const userSelect = {
	id: true,
	email: true,
	username: true,
	role: true,
	emailVerified: true,
	timezone: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
	challengeRecoveries: true,
	challengeRecoveriesUpdatedAt: true,
	avatar: {
		select: {
			url: true,
			isDefault: true,
		},
	},
	coins: {
		select: {
			amount: true,
		},
	},
	userPrivacySettings: {
		select: {
			acceptFriendRequests: true,
			achievementsVisibility: true,
			profileVisibility: true,
			showActivity: true,
			statisticsVisibility: true,
		},
	},
} satisfies Prisma.UserSelect;
