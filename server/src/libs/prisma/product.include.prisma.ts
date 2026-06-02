import { Prisma } from '@generated/prisma/client';

const itemTranslationsSelect = {
	language: true,
	name: true,
} satisfies Prisma.ItemTranslationSelect;

const bundleTranslationsSelect = {
	language: true,
	name: true,
} satisfies Prisma.BundleTranslationSelect;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const translationWhere = (language: string) => ({
	language: { in: [language, 'en'] },
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const productInclude = (language?: string) =>
	({
		bundle: {
			include: {
				translations: {
					...(language && {
						where: translationWhere(language),
					}),
					select: bundleTranslationsSelect,
				},
				items: {
					include: {
						item: {
							include: {
								translations: {
									...(language && {
										where: translationWhere(language),
									}),
									select: itemTranslationsSelect,
								},
							},
						},
					},
				},
			},
		},
		item: {
			include: {
				translations: {
					...(language && {
						where: translationWhere(language),
					}),
					select: itemTranslationsSelect,
				},
			},
		},
	}) satisfies Prisma.ProductInclude;
