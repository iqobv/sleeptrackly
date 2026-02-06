import { IBundle } from '../bundle/bundle.types';
import { IItem } from '../item/item.types';
import { TItemType } from '../item/itemType.types';
import { TProductType } from './productType.types';

export interface IProduct {
	id: string;
	type: TProductType;
	itemType: TItemType | null;
	bundleId: string | null;
	itemId: string | null;
	isNew: boolean;
	isPopular: boolean;
	isExclusive: boolean;
	isShowInStore: boolean;
	isLimited: boolean;
	price: number;
	discountedPrice: number | null;
	maxStock: number | null;
	soldCount: number;
	expiresAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
	bundle: IBundle | null;
	item: IItem | null;
	isOwned: boolean;
}
