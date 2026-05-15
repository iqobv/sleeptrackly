import { Translation } from '@/types/translation/translation.types';
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
	createdAt: Date;
	isAnimated: boolean;
	updatedAt: Date;
	translations: Translation[];
}
