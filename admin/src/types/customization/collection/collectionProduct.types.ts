import { DefaultFields } from '@/types/defaultFields.types';
import { Product } from '../product';

export interface CollectionProduct extends Omit<DefaultFields, 'updatedAt'> {
	collectionId: string;
	productId: string;
}

export interface FullCollectionProduct extends CollectionProduct {
	product: Product;
}
