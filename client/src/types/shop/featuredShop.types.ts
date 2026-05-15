import { Product } from '../product/product.types';
import { FeaturedShopSection } from './featuredShopSection.types';

export interface FeaturedShop {
	carousel: Product[];
	sections: FeaturedShopSection[];
}
