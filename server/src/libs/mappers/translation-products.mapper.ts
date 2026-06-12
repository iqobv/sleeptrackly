import { TransformedProduct } from '@api/shop/types/transformed-product.types';
import { ProductWithInclude } from '@libs/types/product-with-include.types';
import { pickTranslation } from './pick-translation.mapper';

export const transformProduct = (
	product: ProductWithInclude,
	language: string,
): TransformedProduct => {
	const { item, bundle, ...rest } = product;

	const defaultTranslation = { language, name: 'Untitled' };

	return {
		...rest,
		isOwned: false,
		item: item
			? {
					...item,
					translation:
						pickTranslation(item.translations, language) ?? defaultTranslation,
					translations: undefined,
				}
			: null,
		bundle: bundle
			? {
					...bundle,
					translation:
						pickTranslation(bundle.translations, language) ??
						defaultTranslation,
					items: bundle.items.map((bi) => ({
						...bi,
						item: {
							...bi.item,
							translation:
								pickTranslation(bi.item.translations, language) ??
								defaultTranslation,
							translations: undefined,
						},
					})),
					translations: undefined,
				}
			: null,
	} as TransformedProduct;
};
