import { Prisma } from '@generated/prisma/client';

export const userInventorySelect = {
	id: true,
	item: {
		select: {
			id: true,
			type: true,
			mediaUrl: true,
			isAnimated: true,
		},
	},
} satisfies Prisma.UserInventorySelect;
