import { UsePromotionDto } from '@/dto/promotion/promotion.dto';
import { paths } from '@shared/types';
import { apiClient } from '../axios';

type UsePromotionResponse =
	paths['/v1/promotion-usage/{alias}']['post']['responses']['200']['content']['application/json'];

export const promotionUse = async ({ alias }: UsePromotionDto) =>
	(await apiClient.post<UsePromotionResponse>(`/v1/promotion-usage/${alias}`))
		.data;
