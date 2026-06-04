import { getAllItems, getItemById } from '@/api';

export type Item = NonNullable<
	Awaited<ReturnType<typeof getAllItems>>['items'][number]
>;
export type FullItem = Awaited<ReturnType<typeof getItemById>>;
