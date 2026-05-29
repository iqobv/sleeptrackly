import { DefaultFields } from '@/types/defaultFields.types';

export interface CollectionBaseTranslation {
	language: string;
	name: string;
}

export interface FullCollectionTranslation
	extends CollectionBaseTranslation, DefaultFields {
	collectionId: string;
}
