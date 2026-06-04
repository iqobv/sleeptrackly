import { Prisma } from '@generated/prisma/client';
import { productInclude } from './product.include.prisma';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const collectionInclude = (language?: string) =>
	({
		translations: true,
		products: {
			include: {
				product: {
					include: productInclude(language),
				},
			},
		},
	}) satisfies Prisma.CollectionInclude;
