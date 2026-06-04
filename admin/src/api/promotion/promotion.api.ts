import { CreatePromotionDto } from '@/dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAllPromotionsResponse =
	paths['/v1/promotions']['get']['responses']['200']['content']['application/json'];
type GetPromotionByIdResponse =
	paths['/v1/promotions/id/{id}']['get']['responses']['200']['content']['application/json'];
type CreatePromotionResponse =
	paths['/v1/promotions']['post']['responses']['200']['content']['application/json'];
type UpdatePromotionResponse =
	paths['/v1/promotions/{id}']['patch']['responses']['200']['content']['application/json'];
type DeletePromotionResponse =
	paths['/v1/promotions/{id}']['delete']['responses']['200']['content']['application/json'];

export const getAllPromotions = async () =>
	(await apiClient.get<GetAllPromotionsResponse>(`/v1/promotions`)).data;

export const getPromotionById = async (id: string) =>
	(await apiClient.get<GetPromotionByIdResponse>(`/v1/promotions/id/${id}`))
		.data;

export const createPromotion = async (data: CreatePromotionDto) =>
	(await apiClient.post<CreatePromotionResponse>(`/v1/promotions`, data)).data;

export const updatePromotion = async (id: string, data: CreatePromotionDto) =>
	(await apiClient.patch<UpdatePromotionResponse>(`/v1/promotions/${id}`, data))
		.data;

export const deletePromotion = async (id: string) =>
	(await apiClient.delete<DeletePromotionResponse>(`/v1/promotions/${id}`))
		.data;
