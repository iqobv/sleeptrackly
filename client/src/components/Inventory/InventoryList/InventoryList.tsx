'use client';

import { getInventory } from '@/api';
import { Pagination } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { useAuth, usePagination } from '@/hooks';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import styles from './InventoryList.module.scss';
import InventoryListEmpty from './InventoryListEmpty/InventoryListEmpty';
import InventoryListItem from './InventoryListItem/InventoryListItem';
import InventoryListLoader from './InventoryListLoader';

const InventoryList = () => {
	const searchParams = useSearchParams();
	const pageFromUrl = Number(searchParams.get('page')) || 1;

	const { user } = useAuth();

	const { data, isLoading, refetch } = useQuery({
		queryKey: QUERY_KEYS.inventory.all(user ? user.id : '', pageFromUrl),
		queryFn: () =>
			getInventory({ page: pageFromUrl, limit: 20, language: 'en' }),
		placeholderData: keepPreviousData,
		enabled: !!user?.id,
	});

	const { currentPage, setPage } = usePagination(data?.meta.totalPages);

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

export default InventoryList;
