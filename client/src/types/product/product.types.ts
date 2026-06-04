import { getAllShop } from '@/api';

export type Product = Awaited<ReturnType<typeof getAllShop>>['items'][number];
