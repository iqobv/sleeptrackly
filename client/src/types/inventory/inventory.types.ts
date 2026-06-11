import { getInventory } from '@/api/inventory/inventory.api';

export type InventoryItem = Awaited<
	ReturnType<typeof getInventory>
>['items'][number];
