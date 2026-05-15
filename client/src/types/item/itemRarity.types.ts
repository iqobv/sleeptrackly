import { ITEM_RARITIES } from '@/constants';

export type ItemRarity = (typeof ITEM_RARITIES)[keyof typeof ITEM_RARITIES];
