import { getAllCollections, getCollectionById } from '@/api';

export type BaseCollection = Awaited<
	ReturnType<typeof getAllCollections>
>[number];
export type FullCollection = Awaited<ReturnType<typeof getCollectionById>>;
export type CollectionProduct = FullCollection['products'][number];
