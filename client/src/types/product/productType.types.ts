import { PRODUCT_TYPES } from '@/constants';

export type TProductType = (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];
