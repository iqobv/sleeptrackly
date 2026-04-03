import { usePromotionSchema } from '@/schemas';
import z from 'zod';

export type UsePromotionDto = z.infer<typeof usePromotionSchema>;
