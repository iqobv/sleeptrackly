import { PageWrapperLoader } from '@/components/UI';
import { ProductsListLoader } from '../ProductsList/ProductsListLoader';

export const ProductsLoader = () => (
	<PageWrapperLoader showBackButton={false} showRightButton>
		<ProductsListLoader />
	</PageWrapperLoader>
);
