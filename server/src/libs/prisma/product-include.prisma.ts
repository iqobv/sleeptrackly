import { Prisma } from '@prisma/client';

const itemTranslationsSelect: Prisma.ItemTranslationSelect = {
	language: true,
	name: true,
};

const bundleTranslationsSelect: Prisma.BundleTranslationSelect = {
	language: true,
	name: true,
};

const translationWhere = (language: string) => ({
	language: { in: [language, 'en'] },
});

export const productInclude = (language: string) =>
	({
		bundle: {
			include: {
				translations: {
					where: translationWhere(language),
					select: bundleTranslationsSelect,
				},
				items: {
					include: {
						item: {
							include: {
								translations: {
									where: translationWhere(language),
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
					where: translationWhere(language),
					select: itemTranslationsSelect,
				},
			},
		},
	}) satisfies Prisma.ProductInclude;
