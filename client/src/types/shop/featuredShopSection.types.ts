import { ItemType } from '../item/itemType.types';
import { Product } from '../product/product.types';

export interface FeaturedShopSection {
	itemType: ItemType;
	items: Product[];
}
