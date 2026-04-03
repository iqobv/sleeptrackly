import z from 'zod';
import { promotionFields } from './basePromotion.schema';

export const updatePromotionSchema = z
	.object(promotionFields)
	.omit({ alias: true })
	.refine(
		(data) => {
			return data.coinsReward != null || data.productIdReward != null;
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
			return new Date(data.expiresAt) > new Date();
		},
		{
			message: 'Expiration date must be in the future',
			path: ['expiresAt'],
		},
	);
