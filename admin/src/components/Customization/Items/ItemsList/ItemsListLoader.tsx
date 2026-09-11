import { PageWrapperLoader } from '@/components/UI';
import { ItemCardLoader } from '../../ItemCard/ItemCardLoader';
import { ItemsListPaginatedWrapperLoader } from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapperLoader';

export const ItemsListLoader = () => (
	<ItemsListPaginatedWrapperLoader count={20}>
		<ItemCardLoader />
	</ItemsListPaginatedWrapperLoader>
);

export const ItemsLoader = () => (
	<PageWrapperLoader showRightButton showBackButton={false}>
		<ItemsListLoader />
	</PageWrapperLoader>
);
