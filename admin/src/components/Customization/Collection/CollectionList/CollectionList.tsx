'use client';

import { getAllCollections } from '@/api/customization/collection/getAllCollections.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { PaginationDto } from '@/dto/query/pagination.dto';
import { usePagination, usePaginationBounds } from '@shared/hooks';
import { Grid, GridItem, Pagination } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { CollectionItem } from './CollectionItem/CollectionItem';
import styles from './CollectionList.module.scss';
import { CollectionListLoader } from './CollectionListLoader';

export const CollectionList = () => {
	const { currentPage, setPage } = usePagination();

	const params: PaginationDto = {
		limit: 20,
		page: currentPage,
	};

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.customization.collection.list(params),
		queryFn: () => getAllCollections(params),
	});

	usePaginationBounds(currentPage, setPage, data?.meta.totalPages || 0);

	if (isLoading) return <CollectionListLoader />;
	if (!data) return null;

	return (
		<>
			<Grid className={styles.grid}>
				{data.items.map((item) => (
					<GridItem key={item.id}>
						<CollectionItem key={item.id} collection={item} />
					</GridItem>
				))}
			</Grid>
			<Pagination
				currentPage={currentPage}
				onPageChange={setPage}
				totalPages={data.meta.totalPages}
			/>
		</>
	);
};
