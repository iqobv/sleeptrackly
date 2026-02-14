import { createProductSchema, updateProductSchema } from '@/schemas';
import z from 'zod';

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type CreateProductFormDto = z.input<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
