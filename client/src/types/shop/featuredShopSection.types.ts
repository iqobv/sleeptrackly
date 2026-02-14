import { TItemType } from '../item/itemType.types';
import { IProduct } from '../product/product.types';

export interface IFeaturedShopSection {
	itemType: TItemType;
	items: IProduct[];
}
