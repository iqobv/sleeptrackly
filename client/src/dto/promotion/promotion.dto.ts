import { usePromotionSchema } from '@/schemas/promotion/promotion.schema';
import { z } from 'zod';

export type UsePromotionDto = z.infer<typeof usePromotionSchema>;
