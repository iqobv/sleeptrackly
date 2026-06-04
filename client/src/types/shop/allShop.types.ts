import { getAllShop } from '@/api';

export type AllShop = Awaited<ReturnType<typeof getAllShop>>;
