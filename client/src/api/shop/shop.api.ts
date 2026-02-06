import { LanguageDto } from '@/dto';
import { PaginatedShopFilterDto } from '@/dto/shop/shop.dto';
import { IFeaturedShop, IPaginatedDataResponse, IProduct } from '@/types';
import { createSearchParams, fetcher } from '@/utils';

export const getFeaturedShop = async (dto: LanguageDto) =>
	await fetcher<IFeaturedShop>(
		`/api/v1/shop/featured?language=${dto.language}`,
	);

export const getAllShop = async (dto: PaginatedShopFilterDto) => {
	const params = createSearchParams(dto);

	return await fetcher<IPaginatedDataResponse<IProduct>>(
		`/api/v1/shop/all?${params.toString()}`,
	);
};

export const makePurchase = async (productId: string) =>
	await fetcher<{ success: boolean }>(
		`/api/v1/shop/purchase/${productId}`,
		{
			method: 'POST',
		},
		true,
	);
