import { DefaultFields } from '@/types/defaultFields.types';
import { FullCollectionProduct } from './collectionProduct.types';
import { FullCollectionTranslation } from './collectionTranslation.types';

export interface BaseCollection extends DefaultFields {
	slug: string;
	accentColor: string;
	iconUrl: string;
	showInStore: boolean;
}

export interface FullCollection extends BaseCollection {
	translations: FullCollectionTranslation[];
	products: FullCollectionProduct[];
}
