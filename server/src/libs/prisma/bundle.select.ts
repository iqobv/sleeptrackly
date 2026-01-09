import { Prisma } from '@prisma/client';

export type BundleWithTranslations = Prisma.BundleGetPayload<{
	include: ReturnType<typeof bundleSelect>;
}>;

export const bundleSelect = (language: string) =>
	({
		translations: {
			where: { language: { in: [language, 'en'] } },
		},
		items: {
			include: {
				item: {
					include: {
						translations: {
							where: { language: { in: [language, 'en'] } },
						},
					},
				},
			},
		},
	}) satisfies Prisma.BundleInclude;
