import { ProductWithInclude } from '@libs/types/product-with-include.types';

export type ItemWithTranslations = NonNullable<ProductWithInclude['item']>;
export type BundleWithTranslations = NonNullable<ProductWithInclude['bundle']>;
export type BundleItemWithInclude = BundleWithTranslations['items'][number];
