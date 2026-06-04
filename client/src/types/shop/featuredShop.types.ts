import { getFeaturedShop } from '@/api';

export type FeaturedShop = Awaited<ReturnType<typeof getFeaturedShop>>;
