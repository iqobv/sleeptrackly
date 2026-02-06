'use client';

import { getAllShop } from '@/api';
import { Pagination } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { PaginationWithLanguageDto, ShopFilterDto } from '@/dto';
import { useDebounce, usePagination } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ShopCard from '../ShopCard/ShopCard';
import styles from './AllShop.module.scss';
import AllShopFilter from './AllShopFilter/AllShopFilter';
import AllShopFilterSearchBar from './AllShopFilterSearchBar/AllShopFilterSearchBar';
import { getShopFiltersParamsFromUrl } from './shopFilterValues';
import { useSyncUrlWithForm } from './useSyncUrlWithForm.hook';

const AllShop = () => {
	const isFirstRender = useRef(true);
	const searchParams = useSearchParams();
	const pageFromParams = Number(searchParams.get('page')) || 1;

	const params = getShopFiltersParamsFromUrl(searchParams);
	const defaultPaginationParams: PaginationWithLanguageDto = {
		page: pageFromParams,
		limit: 20,
		language: 'en',
	};

	const methods = useForm<ShopFilterDto & { sort?: string }>({
		defaultValues: {
			...params,
			sort: `${params.sortBy || 'DATE'}_${(params.sortOrder || 'desc').toUpperCase()}`,
		},
		shouldUnregister: false,
	});

	const watched = methods.watch();
	const searchValue = methods.watch('search');
	const debouncedSearch = useDebounce(searchValue, 500);

	const apiFilters = useMemo(() => {
		const { sort, ...rest } = watched;
		return {
			...rest,
			search: debouncedSearch,
		};
	}, [watched, debouncedSearch]);

	const apiKey = useMemo(
		() =>
			JSON.stringify({
				...apiFilters,
				...defaultPaginationParams,
			}),
		[apiFilters, defaultPaginationParams],
	);

	const { data } = useQuery({
		queryKey: QUERY_KEYS.shop.allProducts(apiKey),
		queryFn: () =>
			getAllShop({
				...apiFilters,
				...defaultPaginationParams,
			}),
	});

	const { syncUrlWithForm } = useSyncUrlWithForm();
	const { reset } = methods;
	const { currentPage, setPage } = usePagination(data?.meta.totalPages);

	useEffect(() => {
		if (!isFirstRender.current) return;
		reset(params);
		isFirstRender.current = false;
	}, [reset, params]);

	const urlSyncKey = useMemo(() => {
		const { sort, ...rest } = watched;
		return JSON.stringify(rest);
	}, [watched]);

	useEffect(() => {
		if (isFirstRender.current) return;
		syncUrlWithForm(watched);
	}, [urlSyncKey]);

	return (
		<div className={styles['all-shop']}>
			<FormProvider {...methods}>
				<form onSubmit={(e) => e.preventDefault()}>
					<div className={styles['all-shop__content']}>
						<AllShopFilter />
						<div className={styles['all-shop__items-container']}>
							<AllShopFilterSearchBar />
							<div className={styles['all-shop__items']}>
								{data && data.items.length > 0 ? (
									<>
										<div className={styles['all-shop__items-grid']}>
											{data.items.map((product) => (
												<ShopCard key={product.id} product={product} />
											))}
										</div>
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
		</div>
	);
};

export default AllShop;
