import { getPromotionById } from '@/api/promotion/promotion.api';

export type Promotion = Awaited<ReturnType<typeof getPromotionById>>;
