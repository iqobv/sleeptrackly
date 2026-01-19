import { IBundle } from '../bundle/bundle.types';
import { IItem } from '../item/item.types';

export interface IFeaturedShop {
	items: IItem[];
	bundles: IBundle[];
}
