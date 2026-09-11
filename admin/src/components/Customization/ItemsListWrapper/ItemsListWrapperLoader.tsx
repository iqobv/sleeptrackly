import { Grid } from '@shared/ui';
import styles from './ItemsListWrapper.module.scss';

interface ItemsListWrapperLoaderProps {
	children?: React.ReactNode;
}

export const ItemsListWrapperLoader = ({
	children,
}: ItemsListWrapperLoaderProps) => {
	return <Grid className={styles.itemsGrid}>{children}</Grid>;
};
