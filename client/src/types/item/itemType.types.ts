import { ITEM_TYPES } from '@/constants';

export type TItemType = (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES];
