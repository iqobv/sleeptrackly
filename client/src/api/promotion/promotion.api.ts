import { UsePromotionDto } from '@/dto';
import { fetcher } from '@/utils';

export const apiUsePromotion = async ({ alias }: UsePromotionDto) =>
	await fetcher(`/api/v1/promotion-usage/${alias}`);
