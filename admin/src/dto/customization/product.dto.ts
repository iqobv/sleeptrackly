import { createProductSchema } from '@/schemas/customization/product/createProduct.schema';
import { updateProductSchema } from '@/schemas/customization/product/updateProduct.schema';
import z from 'zod';

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type CreateProductFormDto = z.input<typeof createProductSchema>;
export type FormProductValues = z.input<typeof updateProductSchema>;
export type UpdateProductDto = z.output<typeof updateProductSchema>;
