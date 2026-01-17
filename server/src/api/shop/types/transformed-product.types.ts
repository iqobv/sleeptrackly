import { Prisma } from '@prisma/client';
import { ProductWithInclude } from '../../../libs/types/product-with-include.types';
import {
	BundleItemWithInclude,
	BundleWithTranslations,
	ItemWithTranslations,
} from './items-with-translations.types';

export type TransformedProduct = Omit<ProductWithInclude, 'item' | 'bundle'> & {
	item:
		| (Omit<ItemWithTranslations, 'translations'> & {
				translation: Prisma.ItemTranslationSelect | null;
		  })
		| null;
	bundle:
		| (Omit<BundleWithTranslations, 'translations' | 'items'> & {
				translation: Prisma.BundleTranslationSelect | null;
				items: (Omit<BundleItemWithInclude, 'item'> & {
					item: Omit<ItemWithTranslations, 'translations'> & {
						translation: Prisma.ItemTranslationSelect | null;
					};
				})[];
		  })
		| null;
};
