import { basePromotionSchema, updatePromotionSchema } from '@/schemas';
import z from 'zod';

export type CreatePromotionDto = z.infer<typeof basePromotionSchema>;
export type UpdatePromotionDto = z.infer<typeof updatePromotionSchema>;
