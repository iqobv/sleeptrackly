import { PageWrapperLoader } from '@/components/UI';
import { ItemFormLoader } from '../ItemForm/ItemFormLoader';

export const UpdateItemLoader = () => (
	<PageWrapperLoader showBackButton showRightButton>
		<ItemFormLoader isEdit />
	</PageWrapperLoader>
);
