'use client';

import { getAllShop } from '@/api/shop/shop.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
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

	const apiFilters = useMemo(() => {
		return {
			type: urlFilters.type,
			itemType: urlFilters.itemType,
			sortBy: urlFilters.sortBy,
			sortOrder: urlFilters.sortOrder,
			search: urlFilters.search,
			page: urlFilters.page,
			limit: urlFilters.limit,
			language: urlFilters.language,
		};
	}, [urlFilters]);

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.shop.allProducts(JSON.stringify(apiFilters)),
		queryFn: () => getAllShop(apiFilters),
	});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (!name || name === 'search' || name === 'sort') return;

			setUrlFilters({
				type: value.type ?? null,
				itemType: value.itemType?.length ? value.itemType : null,
				sortBy: value.sortBy ?? null,
				sortOrder: value.sortOrder ?? null,
				page: 1,
			});
		});

		return () => subscription.unsubscribe();
	}, [watch, setUrlFilters]);

	const watchedSearch = watch('search');
	const debouncedSearch = useDebounce(watchedSearch, 500);

	useEffect(() => {
		if (
			debouncedSearch !== undefined &&
			debouncedSearch !== urlFilters.search
		) {
			setUrlFilters({ search: debouncedSearch || null, page: 1 });
		}
	}, [debouncedSearch, setUrlFilters, urlFilters.search]);

	const handlePageChange = (page: number) => setUrlFilters({ page });

	return {
		data,
		isLoading,
		methods,
		currentPage: urlFilters.page,
		handlePageChange,
	};
};
