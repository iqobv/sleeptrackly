import { createPromotionSchema, updatePromotionSchema } from '@/schemas';
import z from 'zod';

export type CreatePromotionDto = z.infer<typeof createPromotionSchema>;
export type UpdatePromotionDto = z.infer<typeof updatePromotionSchema>;
