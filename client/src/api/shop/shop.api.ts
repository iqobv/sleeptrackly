import { LanguageDto } from '@/dto/query/pagination.dto';
import { PaginatedShopFilterDto } from '@/dto/shop/shop.dto';
import { paths } from '@shared/types';
import { apiClient } from '../axios';

type GetFeaturedShopResponse =
	paths['/v1/shop/featured']['get']['responses']['200']['content']['application/json'];
type GetAllShopResponse =
	paths['/v1/shop/all']['get']['responses']['200']['content']['application/json'];
type MakePurchaseResponse =
	paths['/v1/shop/purchase/{productId}']['post']['responses']['200']['content']['application/json'];

export const getFeaturedShop = async (dto: LanguageDto) =>
	(
		await apiClient.get<GetFeaturedShopResponse>(`/v1/shop/featured`, {
			params: dto,
		})
	).data;

export const getAllShop = async (params: PaginatedShopFilterDto) =>
	(
		await apiClient.get<GetAllShopResponse>(`/v1/shop/all`, {
			params,
			paramsSerializer: {
				indexes: null,
			},
		})
	).data;

export const makePurchase = async (productId: string) =>
	(await apiClient.post<MakePurchaseResponse>(`/v1/shop/purchase/${productId}`))
		.data;
