import { PageWrapperLoader } from '@/components/UI';
import { ItemFormLoader } from '../ItemForm/ItemFormLoader';

export const CreateItemLoader = () => (
	<PageWrapperLoader showBackButton>
		<ItemFormLoader />
	</PageWrapperLoader>
);
