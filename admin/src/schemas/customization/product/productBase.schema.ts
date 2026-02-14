import z from 'zod';

export const productBaseShape = z.object({
	itemId: z.uuidv4().optional(),
	bundleId: z.uuidv4().optional(),
	isNew: z.boolean(),
	isExclusive: z.boolean(),
	isShowInStore: z.boolean(),
	isLimited: z.boolean(),
	price: z.number().min(0).optional(),
	discountedPrice: z.number().min(0).optional(),
	maxStock: z.number().min(0).optional(),
	expiresAt: z
		.string()
		.optional()
		.refine((v) => !v || !isNaN(Date.parse(v)), 'Invalid date')
		.refine(
			(v) => !v || new Date(v) >= new Date(),
			'Expires date cannot be in the past',
		),
});

export const mutualExclusionRefinement = (data: {
	itemId?: string;
	bundleId?: string;
}) => (!!data.itemId && !data.bundleId) || (!data.itemId && !!data.bundleId);

export const mutualExclusionError = {
	message: 'Either itemId or bundleId must be provided, but not both.',
	path: ['itemId'],
};
