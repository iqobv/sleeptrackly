import { getAllCollections } from '@/api/customization/collection/getAllCollections.api';
import { getCollectionById } from '@/api/customization/collection/getCollectionById.api';

export type BaseCollection = Awaited<
	ReturnType<typeof getAllCollections>
>['items'][number];
export type FullCollection = Awaited<ReturnType<typeof getCollectionById>>;
export type CollectionProduct = FullCollection['products'][number];
