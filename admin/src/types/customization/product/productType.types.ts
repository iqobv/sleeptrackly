import { PRODUCT_TYPES } from '@/constants';

export type ProductType = (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];
