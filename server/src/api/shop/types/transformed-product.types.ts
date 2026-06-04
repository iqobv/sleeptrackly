import { BundleTranslation, ItemTranslation } from '@generated/prisma/client';
import { ProductWithInclude } from '../../../libs/types/product-with-include.types';
import {
	BundleItemWithInclude,
	BundleWithTranslations,
	ItemWithTranslations,
} from './items-with-translations.types';

export type TransformedProduct = Omit<ProductWithInclude, 'item' | 'bundle'> & {
	isOwned: boolean;
	item:
		| (Omit<ItemWithTranslations, 'translations'> & {
				translation: ItemTranslation;
		  })
		| null;
	bundle:
		| (Omit<BundleWithTranslations, 'translations' | 'items'> & {
				translation: BundleTranslation;
				items: (Omit<BundleItemWithInclude, 'item'> & {
					item: Omit<ItemWithTranslations, 'translations'> & {
						translation: ItemTranslation;
					};
				})[];
		  })
		| null;
};
