'use client';

import { getAllShop } from '@/api/shop/shop.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { PaginatedShopFilterDto } from '@/dto/shop/shop.dto';
import { useDebounce } from '@shared/hooks';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { AllShopFiltersForm } from './AllShop';
import { useShopFilters } from './useShopFilters.hook';

export const useAllShop = () => {
	const [urlFilters, setUrlFilters] = useShopFilters();

	const formValues = useMemo(
		() => ({
			...urlFilters,
			sort: `${urlFilters.sortBy}_${urlFilters.sortOrder}`.toUpperCase(),
		}),
		[urlFilters],
	);

	const methods = useForm<AllShopFiltersForm>({
		defaultValues: formValues,
	});

	const { watch } = methods;

	const apiFilters = useMemo((): PaginatedShopFilterDto => {
		return {
			type: urlFilters.type,
			itemType: urlFilters.itemType,
			sortBy: urlFilters.sortBy,
			sortOrder: urlFilters.sortOrder,
			collection: urlFilters.collection,
			search: urlFilters.search,
			page: urlFilters.page,
			limit: urlFilters.limit,
			language: urlFilters.language,
			minPrice: urlFilters.minPrice,
			maxPrice: urlFilters.maxPrice,
		};
	}, [urlFilters]);

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.shop.catalog(apiFilters),
		queryFn: () => getAllShop(apiFilters),
	});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (
				!name ||
				name === 'search' ||
				name === 'sort' ||
				name === 'minPrice' ||
				name === 'maxPrice'
			) {
				return;
			}

			setUrlFilters({
				type: value.type ?? null,
				itemType: value.itemType?.length ? value.itemType : null,
				collection: value.collection?.length ? value.collection : null,
				sortBy: value.sortBy ?? null,
				sortOrder: value.sortOrder ?? null,
				page: 1,
			});
		});

		return () => subscription.unsubscribe();
	}, [watch, setUrlFilters]);

	const watchedSearch = watch('search');
	const watchedMinPrice = watch('minPrice');
	const watchedMaxPrice = watch('maxPrice');

	const debouncedSearch = useDebounce(watchedSearch, 500);
	const debouncedMinPrice = useDebounce(watchedMinPrice, 500);
	const debouncedMaxPrice = useDebounce(watchedMaxPrice, 500);

	useEffect(() => {
		let shouldUpdate = false;
		const newFilters: Partial<PaginatedShopFilterDto> = {};

		const normalizedSearch = debouncedSearch;
		if (normalizedSearch !== (urlFilters.search ?? undefined)) {
			newFilters.search = normalizedSearch;
			shouldUpdate = true;
		}

		const normalizedMinPrice = debouncedMinPrice ?? 0;

		if (normalizedMinPrice !== urlFilters.minPrice) {
			newFilters.minPrice = normalizedMinPrice;
			shouldUpdate = true;
		}

		const normalizedMaxPrice = debouncedMaxPrice ?? null;

		if (normalizedMaxPrice !== urlFilters.maxPrice) {
			newFilters.maxPrice = normalizedMaxPrice;
			shouldUpdate = true;
		}

		if (shouldUpdate) {
			newFilters.page = 1;
			setUrlFilters(newFilters);
		}
	}, [
		debouncedSearch,
		debouncedMinPrice,
		debouncedMaxPrice,
		setUrlFilters,
		urlFilters.search,
		urlFilters.minPrice,
		urlFilters.maxPrice,
	]);

	const handlePageChange = (page: number) => setUrlFilters({ page });

	return {
		data,
		isLoading,
		methods,
		currentPage: urlFilters.page,
		handlePageChange,
	};
};
