import { UsePromotionDto } from '@/dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type UsePromotionResponse =
	paths['/v1/promotion-usage/{alias}']['post']['responses']['200']['content']['application/json'];

export const usePromotion = async ({ alias }: UsePromotionDto) =>
	(await apiClient.post<UsePromotionResponse>(`/v1/promotion-usage/${alias}`))
		.data;
