import { z } from 'zod';

export const promotionFields = {
	alias: z.string().min(6).max(100).optional(),
	maxUses: z.number().nullish(),
	expiresAt: z.coerce.date().nullish(),
	coinsReward: z.number().nullish(),
	productIdReward: z.string().uuid().nullish(),
};

export const basePromotionSchema = z
	.object(promotionFields)
	.refine(
		(data) => {
			return (
				data.coinsReward !== undefined || data.productIdReward !== undefined
			);
		},
		{
			message: 'At least one reward must be specified',
			path: ['coinsReward', 'productIdReward'],
		},
	)
	.refine(
		(data) => {
			if (!data.expiresAt) {
				return true;
			}
			return data.expiresAt > new Date();
		},
		{
			message: 'Expiration date must be in the future',
			path: ['expiresAt'],
		},
	);
