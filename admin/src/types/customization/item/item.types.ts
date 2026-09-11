import { getAllItems, getItemById } from '@/api/customization/item/item.api';

export type Item = NonNullable<
	Awaited<ReturnType<typeof getAllItems>>['items'][number]
>;
export type FullItem = Awaited<ReturnType<typeof getItemById>>;
