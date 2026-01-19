import { IItem } from '../item/item.types';
import { TAcquiredFrom } from './acquiredFrom.types';

export interface IInventory {
	id: string;
	userId: string;
	itemId: string;
	isEquipped: boolean;
	acquiredFrom: TAcquiredFrom;
	acquiredAt: Date;
	createdAt: Date;
	updatedAt: Date;
	item: IItem;
}
