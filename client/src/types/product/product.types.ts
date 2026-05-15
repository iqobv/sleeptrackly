import { Bundle } from '../bundle/bundle.types';
import { Item } from '../item/item.types';
import { ItemType } from '../item/itemType.types';
import { ProductType } from './productType.types';

export interface Product {
	id: string;
	type: ProductType;
	itemType: ItemType | null;
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
	bundle: Bundle | null;
	item: Item | null;
	isOwned: boolean;
}
