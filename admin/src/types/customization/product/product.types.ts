import { getProductById } from '@/api/customization/product/product.api';

export type Product = NonNullable<Awaited<ReturnType<typeof getProductById>>>;
