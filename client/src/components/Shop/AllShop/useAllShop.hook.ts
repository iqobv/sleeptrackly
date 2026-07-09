'use client';

import { getAllShop } from '@/api/shop/shop.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { PaginatedShopFilterDto } from '@/dto/shop/shop.dto';
import { useDebounce } from '@shared/hooks';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
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

	const handleSelectChange = <K extends keyof AllShopFiltersForm>(
		name: K,
		value: AllShopFiltersForm[K],
	) => {
		methods.setValue(name, value as never);

		if (name === 'sort' && typeof value === 'string') {
			const [sortBy, sortOrder] = value.split('_') as [
				PaginatedShopFilterDto['sortBy'],
				PaginatedShopFilterDto['sortOrder'],
			];
			setUrlFilters({ sortBy, sortOrder, page: 1 });
		} else {
			setUrlFilters({ [name]: value, page: 1 });
		}
	};

	const watchedSearch = useWatch({ control: methods.control, name: 'search' });
	const watchedMinPrice = useWatch({
		control: methods.control,
		name: 'minPrice',
	});
	const watchedMaxPrice = useWatch({
		control: methods.control,
		name: 'maxPrice',
	});

	const debouncedSearch = useDebounce(watchedSearch, 500);
	const debouncedMinPrice = useDebounce(watchedMinPrice, 500);
	const debouncedMaxPrice = useDebounce(watchedMaxPrice, 500);

	useEffect(() => {
		let shouldUpdate = false;
		const newFilters: Partial<PaginatedShopFilterDto> = {};

		if (debouncedSearch !== (urlFilters.search ?? undefined)) {
			newFilters.search = debouncedSearch;
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
		handleSelectChange,
	};
};
