'use client';

import { getAllCollections } from '@/api';
import { QUERY_KEYS } from '@/config';
import { Grid, GridItem } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { CollectionItem } from './CollectionItem/CollectionItem';
import styles from './CollectionList.module.scss';
import { CollectionListLoader } from './CollectionListLoader';

export const CollectionList = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.customization.collection.all,
		queryFn: getAllCollections,
	});

	if (isLoading) return <CollectionListLoader />;
	if (!data) return null;

	return (
		<Grid className={styles.grid}>
			{data.map((item) => (
				<GridItem key={item.id}>
					<CollectionItem key={item.id} collection={item} />
				</GridItem>
			))}
		</Grid>
	);
};
