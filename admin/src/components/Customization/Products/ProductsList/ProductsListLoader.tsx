import { ItemsListPaginatedWrapperLoader } from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapperLoader';
import { ProductCardLoader } from './ProductCard/ProductCardLoader';

export const ProductsListLoader = () => (
	<ItemsListPaginatedWrapperLoader count={10}>
		<ProductCardLoader />
	</ItemsListPaginatedWrapperLoader>
);
