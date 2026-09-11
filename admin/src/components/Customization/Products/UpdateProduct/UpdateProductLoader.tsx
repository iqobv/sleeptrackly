import { PageWrapperLoader } from '@/components/UI';
import { ProductFormLoader } from '../ProductForm/ProductFormLoader';

export const UpdateProductLoader = () => (
	<PageWrapperLoader showRightButton showBackButton>
		<ProductFormLoader isEdit />
	</PageWrapperLoader>
);
