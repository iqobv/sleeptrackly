import { createBundleSchema } from '@/schemas/customization/bundle/createBundle.schema';
import { updateBundleSchema } from '@/schemas/customization/bundle/updateBundle.schema';
import z from 'zod';

export type CreateBundleDto = z.infer<typeof createBundleSchema>;
export type UpdateBundleDto = z.infer<typeof updateBundleSchema>;
