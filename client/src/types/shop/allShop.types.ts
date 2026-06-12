import { getAllShop } from '@/api/shop/shop.api';

export type AllShop = Awaited<ReturnType<typeof getAllShop>>;
