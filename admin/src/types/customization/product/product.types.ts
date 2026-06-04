import { getProductById } from '@/api';

export type Product = NonNullable<Awaited<ReturnType<typeof getProductById>>>;
