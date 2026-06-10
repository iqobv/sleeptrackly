import { PageWrapperLoader } from '@/components/UI';
import { CollectionFormLoader } from '../CollectionForm/CollectionFormLoader';

export const EditCollectionLoader = () => (
	<PageWrapperLoader showBackButton customRightSlot>
		<CollectionFormLoader isEdit />
	</PageWrapperLoader>
);
