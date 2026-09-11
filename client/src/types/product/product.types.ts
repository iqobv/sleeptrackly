import { getAllShop } from '@/api/shop/shop.api';

export type Product = Awaited<ReturnType<typeof getAllShop>>['items'][number];
