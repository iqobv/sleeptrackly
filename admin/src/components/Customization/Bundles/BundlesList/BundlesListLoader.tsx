import { BundleCardLoader } from '../../BundleCard/BundleCardLoader';
import { ItemsListPaginatedWrapperLoader } from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapperLoader';

export const BundlesListLoader = () => (
	<ItemsListPaginatedWrapperLoader count={10}>
		<BundleCardLoader />
	</ItemsListPaginatedWrapperLoader>
);
