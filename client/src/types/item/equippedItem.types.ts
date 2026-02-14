import { TItemType } from './itemType.types';

export interface IEquippedItem {
	id: string;
	type: TItemType;
	isAnimated: boolean;
	mediaUrl: string;
}
