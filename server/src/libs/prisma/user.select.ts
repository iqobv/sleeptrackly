import { Prisma } from '@prisma/client';

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
};
