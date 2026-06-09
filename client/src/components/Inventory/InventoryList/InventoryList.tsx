'use client';

import { getInventory } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { usePagination, usePaginationBounds } from '@shared/hooks';
import { Pagination } from '@shared/ui';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import styles from './InventoryList.module.scss';
import { InventoryListEmpty } from './InventoryListEmpty/InventoryListEmpty';
import { InventoryListItem } from './InventoryListItem';
import { InventoryListLoader } from './InventoryListLoader';

export const InventoryList = () => {
	const { currentPage, setPage } = usePagination();

	const { user } = useAuth();

	const { data, isLoading, refetch } = useQuery({
		queryKey: QUERY_KEYS.inventory.all(user ? user.id : '', currentPage),
		queryFn: () =>
			getInventory({ page: currentPage, limit: 20, language: 'en' }),
		placeholderData: keepPreviousData,
		enabled: !!user?.id,
	});

	usePaginationBounds(currentPage, setPage, data?.meta.totalPages);

	return (
		<div className={styles.inventory}>
			{isLoading && <InventoryListLoader />}
			{data && data.meta.total > 0 && (
				<>
					<div className={styles.list}>
						{data.items.map((item) => (
							<InventoryListItem key={item.id} item={item} refetch={refetch} />
						))}
					</div>
					<Pagination
						currentPage={currentPage}
						totalPages={data.meta.totalPages}
						onPageChange={setPage}
					/>
				</>
			)}
			{data && data.meta.total === 0 && <InventoryListEmpty />}
		</div>
	);
};
