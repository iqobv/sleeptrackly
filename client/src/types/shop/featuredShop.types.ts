import { IProduct } from '../product/product.types';
import { IFeaturedShopSection } from './featuredShopSection.types';

export interface IFeaturedShop {
	carousel: IProduct[];
	sections: IFeaturedShopSection[];
}
