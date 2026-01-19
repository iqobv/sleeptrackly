import { ITranslation } from '../translation/translation.types';
import { TItemRarity } from './itemRarity.types';
import { TItemType } from './itemType.types';

export interface IItem {
	id: string;
	type: TItemType;
	isExclusive: boolean;
	rarity: TItemRarity;
	basePrice: number;
	mediaUrl: string;
	createdAt: Date;
	updatedAt: Date;
	translation: ITranslation;
}
