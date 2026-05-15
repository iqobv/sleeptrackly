import { UsePromotionDto } from '@/dto';
import { apiClient } from '../axios';

export const apiUsePromotion = async ({ alias }: UsePromotionDto) =>
	(await apiClient.get(`/v1/promotion-usage/${alias}`)).data;
