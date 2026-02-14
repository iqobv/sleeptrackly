import { IItem } from '../item/item.types';

export interface IItemInBundle {
	itemId: string;
	bundleId: string;
	item: IItem;
}
