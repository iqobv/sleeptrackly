import { ITranslation } from '@/types/translation/translation.types';
import { TItemRarity } from './itemRarity.types';
import { TItemType } from './itemType.types';

export interface IItem {
	id: string;
	type: TItemType;
	isExclusive: boolean;
	rarity: TItemRarity;
	basePrice: number;
	mediaUrl: string;
	previewUrl: string;
	createdAt: Date;
	isAnimated: boolean;
	updatedAt: Date;
	translations: ITranslation[];
}
