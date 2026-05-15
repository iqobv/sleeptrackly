import { ITEM_TYPES } from '@/constants';

export type ItemType = (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES];
