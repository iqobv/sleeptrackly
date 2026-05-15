import { LanguageDto } from '@/dto';
import { PaginatedShopFilterDto } from '@/dto/shop/shop.dto';
import { IFeaturedShop, IPaginatedDataResponse, IProduct } from '@/types';
import { apiClient } from '../axios';

export const getFeaturedShop = async (dto: LanguageDto) =>
	(
		await apiClient.get<IFeaturedShop>(`/v1/shop/featured`, {
			params: dto,
		})
	).data;

export const getAllShop = async ({
	itemType,
	...dto
}: PaginatedShopFilterDto) => {
	const params = {
		...dto,
		itemType: itemType?.length ? itemType?.join(',') : undefined,
	};

	return (
		await apiClient.get<IPaginatedDataResponse<IProduct>>(`/v1/shop/all`, {
			params,
		})
	).data;
};

export const makePurchase = async (productId: string) =>
	(await apiClient<{ success: boolean }>(`/v1/shop/purchase/${productId}`))
		.data;
