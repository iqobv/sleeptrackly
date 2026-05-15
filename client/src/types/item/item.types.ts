import { Translation } from '../translation/translation.types';
import { ItemRarity } from './itemRarity.types';
import { ItemType } from './itemType.types';

export interface Item {
	id: string;
	type: ItemType;
	isExclusive: boolean;
	rarity: ItemRarity;
	basePrice: number;
	mediaUrl: string;
	previewUrl: string;
	isAnimated: boolean;
	createdAt: Date;
	updatedAt: Date;
	translation: Translation;
}
