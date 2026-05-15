import { Item } from '../item/item.types';

export interface ItemInBundle {
	itemId: string;
	bundleId: string;
	item: Item;
}
