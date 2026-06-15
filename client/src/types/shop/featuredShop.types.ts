import { getFeaturedShop } from '@/api/shop/shop.api';

export type FeaturedShop = Awaited<ReturnType<typeof getFeaturedShop>>;
export type FeaturedShopSection = FeaturedShop['sections'][number];
export type FeaturedShopCarouselItem = FeaturedShop['carousel'][number];
export type FeaturedShopCollection = FeaturedShop['collections'][number];
