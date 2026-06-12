import { createPromotionSchema } from '@/schemas/promotion/createPromotion.schema';
import { updatePromotionSchema } from '@/schemas/promotion/updatePromotion.schema';
import z from 'zod';

export type CreatePromotionDto = z.infer<typeof createPromotionSchema>;
export type UpdatePromotionDto = z.infer<typeof updatePromotionSchema>;
