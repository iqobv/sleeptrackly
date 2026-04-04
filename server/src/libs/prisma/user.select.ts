import { Prisma } from 'generated/prisma/client';

export const userSelect: Prisma.UserSelect = {
	id: true,
	email: true,
	username: true,
	role: true,
	emailVerified: true,
	createdAt: true,
	avatar: {
		select: {
			url: true,
			isDefault: true,
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
};
