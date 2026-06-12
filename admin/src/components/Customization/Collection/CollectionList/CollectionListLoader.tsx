import { Grid } from '@shared/ui';
import { CollectionItemLoader } from './CollectionItem/CollectionItemLoader';
import styles from './CollectionList.module.scss';

export const CollectionListLoader = () => {
	return (
		<Grid className={styles.grid}>
			{Array.from({ length: 6 }).map((_, i) => (
				<CollectionItemLoader key={i} />
			))}
		</Grid>
	);
};
