import { Item } from '@generated/prisma/client';

export interface ItemsToAdd {
	alreadyOwnedItems: {
		itemId: string;
	}[];
	itemsToAdd: Item[];
}
