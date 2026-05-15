'use client';

import { getAllShop } from '@/api';
import { List, Pagination } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { ShopFilterDto } from '@/dto';
import { useDebounce, usePagination } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ShopCard from '../ShopCard/ShopCard';
import styles from './AllShop.module.scss';
import AllShopFilter from './AllShopFilter/AllShopFilter';
import AllShopFilterSearchBar from './AllShopFilterSearchBar/AllShopFilterSearchBar';
import AllShopLoader from './AllShopLoader';
import { getShopFiltersParamsFromUrl } from './shopFilterValues';
import { useSyncUrlWithForm } from './useSyncUrlWithForm.hook';

const AllShop = () => {
	const searchParams = useSearchParams();
	const { syncUrlWithForm } = useSyncUrlWithForm();

	const paramsFromUrl = useMemo(
		() => getShopFiltersParamsFromUrl(searchParams),
		[searchParams],
	);

	const formValues = useMemo(
		() => ({
			...paramsFromUrl,
			sort: `${paramsFromUrl.sortBy || 'DATE'}_${(paramsFromUrl.sortOrder || 'desc').toUpperCase()}`,
		}),
		[paramsFromUrl],
	);

	const methods = useForm<ShopFilterDto & { sort?: string }>({
		values: formValues,
	});

	const watchedSearch = methods.watch('search');
	const debouncedSearch = useDebounce(watchedSearch, 500);

	const apiFilters = useMemo(() => {
		const { sort: _, ...rest } = methods.getValues();
		return {
			...rest,
			search: debouncedSearch,
			page: Number(searchParams.get('page')) || 1,
			limit: 20,
			language: 'en',
		};
	}, [debouncedSearch, methods, searchParams]);

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.shop.allProducts(JSON.stringify(apiFilters)),
		queryFn: () => getAllShop(apiFilters),
	});

	const { currentPage, setPage } = usePagination(data?.meta.totalPages);

	useEffect(() => {
		const subscription = methods.watch((value) => {
			const values = { ...value, search: debouncedSearch };
			syncUrlWithForm(values as ShopFilterDto);
		});
		return () => subscription.unsubscribe();
	}, [methods, syncUrlWithForm, debouncedSearch]);

	return (
		<div className={styles['all-shop']}>
			{isLoading && <AllShopLoader />}
			{data && (
				<FormProvider {...methods}>
					<form onSubmit={(e) => e.preventDefault()}>
						<div className={styles['all-shop__content']}>
							<AllShopFilter />
							<div className={styles['all-shop__items-container']}>
								<AllShopFilterSearchBar />
								<div className={styles['all-shop__items']}>
									{data.items.length > 0 ? (
										<>
											<List
												items={data.items}
												className={styles['all-shop__items-grid']}
												renderItem={(item, index) => (
													<ShopCard
														key={item.id}
														product={item}
														isPreload={index < 3}
													/>
												)}
											/>
											<Pagination
												currentPage={currentPage}
												totalPages={data.meta.totalPages}
												onPageChange={setPage}
											/>
										</>
									) : (
										<div className={styles['all-shop__no-results']}>
											No products found with current filters
										</div>
									)}
								</div>
							</div>
						</div>
					</form>
				</FormProvider>
			)}
		</div>
	);
};

export default AllShop;
