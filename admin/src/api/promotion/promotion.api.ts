import { CreatePromotionDto } from '@/dto';
import { IPromotion } from '@/types';
import { fetcher } from '@/utils';

export const getAllPromotions = async () =>
	await fetcher<IPromotion[]>(`/api/v1/promotions`);

export const getPromotionById = async (id: string) =>
	await fetcher<IPromotion>(`/api/v1/promotions/id/${id}`);

export const createPromotion = async (data: CreatePromotionDto) =>
	await fetcher(`/api/v1/promotions`, {
		method: 'POST',
		body: JSON.stringify(data),
	});

export const updatePromotion = async (id: string, data: CreatePromotionDto) =>
	await fetcher(`/api/v1/promotions/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
	});

export const deletePromotion = async (id: string) =>
	await fetcher(`/api/v1/promotions/${id}`, {
		method: 'DELETE',
	});
