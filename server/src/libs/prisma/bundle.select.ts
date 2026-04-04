import { Prisma } from 'generated/prisma/client';

export const bundleInclude: Prisma.BundleInclude = {
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
};
