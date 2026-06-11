import { PageWrapperLoader } from '@/components/UI';
import { CollectionFormLoader } from '../CollectionForm/CollectionFormLoader';

export const CreateCollectionLoader = () => (
	<PageWrapperLoader>
		<CollectionFormLoader />
	</PageWrapperLoader>
);
