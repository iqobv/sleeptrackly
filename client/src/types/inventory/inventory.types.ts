import { getInventory } from '@/api';

export type InventoryItem = Awaited<
	ReturnType<typeof getInventory>
>['items'][number];
