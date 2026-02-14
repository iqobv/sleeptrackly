import { ITranslation } from '@/types/translation/translation.types';
import { IItemInBundle } from './itemInBundle.types';

export interface IBundle {
	id: string;
	isExclusive: false;
	basePrice: number;
	discountPercentage: number;
	mediaUrl: string;
	createdAt: Date;
	updatedAt: Date;
	translations: ITranslation[];
	items: IItemInBundle[];
}
