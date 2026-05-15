import { pickTranslation } from '@libs/mappers';
import { TransformedProduct } from '../../api/shop/types';
import { ProductWithInclude } from '../types';

export const transformProduct = (
	product: ProductWithInclude,
	language: string,
): TransformedProduct => {
	const { item, bundle, ...rest } = product;

	return {
		...rest,
		item: item
			? {
					...item,
					translation: pickTranslation(item.translations, language),
					translations: undefined,
				}
			: null,
		bundle: bundle
			? {
					...bundle,
					translation: pickTranslation(bundle.translations, language),
					items: bundle.items.map((bi) => ({
						...bi,
						item: {
							...bi.item,
							translation: pickTranslation(bi.item.translations, language),
							translations: undefined,
						},
					})),
					translations: undefined,
				}
			: null,
	} as TransformedProduct;
};
