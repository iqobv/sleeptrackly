import { PageWrapperLoader } from '@/components/UI';
import { CollectionListLoader } from '../CollectionList/CollectionListLoader';

export const CollectionsLoader = () => (
	<PageWrapperLoader showBackButton={false} showRightButton>
		<CollectionListLoader />
	</PageWrapperLoader>
);
