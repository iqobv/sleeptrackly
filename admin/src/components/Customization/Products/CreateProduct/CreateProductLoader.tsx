import { PageWrapperLoader } from '@/components/UI';
import { ProductFormLoader } from '../ProductForm/ProductFormLoader';

export const CreateProductLoader = () => (
	<PageWrapperLoader showBackButton showRightButton>
		<ProductFormLoader />
	</PageWrapperLoader>
);
