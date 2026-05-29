import { CustomizationPageHeaderLoader } from '../../CustomizationPageHeader';
import { ItemCardLoader } from '../../ItemCard';
import { ItemsListPaginatedWrapperLoader } from '../../ItemsListPaginatedWrapper';
import styles from './ItemsList.module.scss';

export const ItemsListLoader = () => (
	<ItemsListPaginatedWrapperLoader count={20}>
		<ItemCardLoader />
	</ItemsListPaginatedWrapperLoader>
);

export const ItemsLoader = () => {
	return (
		<div className={styles.items}>
			<CustomizationPageHeaderLoader />
			<ItemsListLoader />
		</div>
	);
};
