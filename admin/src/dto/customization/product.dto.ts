import { createProductShema, updateProductSchema } from '@/schemas';
import z from 'zod';

export type CreateProductDto = z.infer<typeof createProductShema>;
export type CreateProductFormDto = z.input<typeof createProductShema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
