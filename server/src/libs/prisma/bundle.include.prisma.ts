import { Prisma } from '@generated/prisma/client';

export const bundleInclude = {
	translations: true,
	items: {
		include: {
			item: {
				include: {
					translations: true,
				},
			},
		},
	},
} satisfies Prisma.BundleInclude;
