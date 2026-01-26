import { LanguageDto } from '@/dto';
import { IFeaturedShop } from '@/types';
import { fetcher } from '@/utils';

export const getFeaturedShop = async (dto: LanguageDto) =>
	await fetcher<IFeaturedShop>(
		`/api/v1/shop/featured?language=${dto.language}`,
	);

export const makePurchase = async (productId: string) =>
	await fetcher<{ success: boolean }>(
		`/api/v1/shop/purchase/${productId}`,
		{
			method: 'POST',
		},
		true,
	);
