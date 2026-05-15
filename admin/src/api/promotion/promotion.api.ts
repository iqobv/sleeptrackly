import { CreatePromotionDto } from '@/dto';
import { Promotion } from '@/types';
import { apiClient } from '../axios';

export const getAllPromotions = async () =>
	(await apiClient.get<Promotion[]>(`/v1/promotions`)).data;

export const getPromotionById = async (id: string) =>
	(await apiClient.get<Promotion>(`/v1/promotions/id/${id}`)).data;

export const createPromotion = async (data: CreatePromotionDto) =>
	(await apiClient.post(`/v1/promotions`, data)).data;

export const updatePromotion = async (id: string, data: CreatePromotionDto) =>
	(await apiClient.patch(`/v1/promotions/${id}`, data)).data;

export const deletePromotion = async (id: string) =>
	(await apiClient.delete(`/v1/promotions/${id}`)).data;
