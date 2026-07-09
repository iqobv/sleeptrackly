'use client';

import {
	equipInventoryItem,
	getInventory,
} from '@/api/inventory/inventory.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { PaginationWithLanguageDto } from '@/dto/query/pagination.dto';
import { usePagination, usePaginationBounds } from '@shared/hooks';
import { Pagination } from '@shared/ui';
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import styles from './InventoryList.module.scss';
import { InventoryListEmpty } from './InventoryListEmpty/InventoryListEmpty';
import { InventoryListItem } from './InventoryListItem/InventoryListItem';
import { InventoryListLoader } from './InventoryListLoader';

type InventoryResponse = Awaited<ReturnType<typeof getInventory>>;

export const InventoryList = () => {
	const queryClient = useQueryClient();

	const { currentPage, setPage } = usePagination();

	const filters: PaginationWithLanguageDto = {
		page: currentPage,
		limit: 20,
		language: 'en',
	};

	const queryKey = QUERY_KEYS.inventory.list(filters);

	const { data, isLoading } = useQuery({
		queryKey,
		queryFn: () => getInventory(filters),
		placeholderData: keepPreviousData,
	});

	const { mutate: equipItem } = useMutation({
		mutationFn: (itemId: string) => equipInventoryItem(itemId),
		onMutate: async (itemId: string) => {
			await queryClient.cancelQueries({ queryKey });
			const previousData =
				queryClient.getQueryData<InventoryResponse>(queryKey);

			queryClient.setQueryData<InventoryResponse>(queryKey, (old) => {
				if (!old) return old;
				return {
					...old,
					items: old.items.map((item) =>
						item.id === itemId
							? { ...item, isEquipped: !item.isEquipped }
							: item,
					),
				};
			});

			return { previousData };
		},
		onError: (_e, _v, ctx) => {
			if (ctx?.previousData) {
				queryClient.setQueryData(queryKey, ctx.previousData);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});

	usePaginationBounds(currentPage, setPage, data?.meta.totalPages);

	return (
		<div className={styles.inventory}>
			{isLoading && <InventoryListLoader />}
			{data && data.meta.total > 0 && (
				<>
					<div className={styles.list}>
						{data.items.map((item) => (
							<InventoryListItem
								key={item.id}
								item={item}
								onEquip={() => equipItem(item.id)}
							/>
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
