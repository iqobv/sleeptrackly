import { getPromotionById } from '@/api';

export type Promotion = Awaited<ReturnType<typeof getPromotionById>>;
