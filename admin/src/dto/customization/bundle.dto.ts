import { createBundleSchema, updateBundleSchema } from '@/schemas';
import z from 'zod';

export type CreateBundleDto = z.infer<typeof createBundleSchema>;
export type UpdateBundleDto = z.infer<typeof updateBundleSchema>;
