import { getFeaturedShop } from '@/api/shop/shop.api';

export type FeaturedShop = Awaited<ReturnType<typeof getFeaturedShop>>;
