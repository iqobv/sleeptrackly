import { ITEM_RARITIES } from '@/constants';

export type TItemRarity = (typeof ITEM_RARITIES)[keyof typeof ITEM_RARITIES];
