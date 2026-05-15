import { Translation } from '@/types/translation/translation.types';
import { ItemInBundle } from './itemInBundle.types';

export interface Bundle {
	id: string;
	isExclusive: false;
	basePrice: number;
	discountPercentage: number;
	mediaUrl: string;
	createdAt: Date;
	updatedAt: Date;
	translations: Translation[];
	items: ItemInBundle[];
}
