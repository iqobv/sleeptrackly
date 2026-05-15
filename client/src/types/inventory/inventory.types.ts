import { Item } from '../item/item.types';
import { AcquiredFrom } from './acquiredFrom.types';

export interface Inventory {
	id: string;
	userId: string;
	itemId: string;
	isEquipped: boolean;
	acquiredFrom: AcquiredFrom;
	acquiredAt: Date;
	createdAt: Date;
	updatedAt: Date;
	item: Item;
}
