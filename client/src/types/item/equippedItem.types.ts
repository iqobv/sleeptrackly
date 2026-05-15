import { ItemType } from './itemType.types';

export interface EquippedItem {
	id: string;
	type: ItemType;
	isAnimated: boolean;
	mediaUrl: string;
}
