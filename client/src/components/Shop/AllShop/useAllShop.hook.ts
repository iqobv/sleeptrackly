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

	const defaultValues = useMemo(
		() => ({
			...urlFilters,
			sort: `${urlFilters.sortBy}_${urlFilters.sortOrder}`.toUpperCase(),
		}),
		[urlFilters],
	);

	const methods = useForm<AllShopFiltersForm>({
		defaultValues,
	});

	const formValues = useWatch({ control: methods.control });

	const debouncedSearch = useDebounce(formValues.search, 500);
	const debouncedMinPrice = useDebounce(formValues.minPrice, 500);
	const debouncedMaxPrice = useDebounce(formValues.maxPrice, 500);

	useEffect(() => {
		const nextFilters = { ...formValues } as Record<string, unknown>;

		delete nextFilters.sort;

		nextFilters.search = debouncedSearch || null;
		nextFilters.minPrice = debouncedMinPrice ?? null;
		nextFilters.maxPrice = debouncedMaxPrice ?? null;

		for (const key in nextFilters) {
			const value = nextFilters[key];

			if (Array.isArray(value) && value.length === 0) {
				nextFilters[key] = null;
			} else if (value === undefined) {
				nextFilters[key] = null;
			}
		}

		const hasChanges = Object.keys(nextFilters).some((key) => {
			const typedKey = key as keyof PaginatedShopFilterDto;
			const newVal = nextFilters[key];
			const oldVal = urlFilters[typedKey] ?? null;

			if (Array.isArray(newVal) && Array.isArray(oldVal))
				return newVal.join(',') !== oldVal.join(',');

			return newVal !== oldVal;
		});

		if (hasChanges)
			setUrlFilters({
				...(nextFilters as Partial<PaginatedShopFilterDto>),
				page: 1,
			});
	}, [
		formValues,
		debouncedSearch,
		debouncedMinPrice,
		debouncedMaxPrice,
		urlFilters,
		setUrlFilters,
	]);

	const apiFilters = useMemo((): PaginatedShopFilterDto => {
		return { ...urlFilters } as PaginatedShopFilterDto;
	}, [urlFilters]);

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.shop.catalog(apiFilters),
		queryFn: () => getAllShop(apiFilters),
	});

	const handlePageChange = (page: number) => setUrlFilters({ page });

	return {
		data,
		isLoading,
		methods,
		currentPage: urlFilters.page,
		handlePageChange,
	};
};
