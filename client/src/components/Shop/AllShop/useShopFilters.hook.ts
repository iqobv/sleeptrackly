'use client';

import { PaginatedShopFilterDto } from '@/dto/shop/shop.dto';
import { SortOrder } from '@/types/api/sortOrder.types';
import { ItemType } from '@/types/item/itemType.types';
import { FilterProductType } from '@/types/product/productType.types';
import { ShopSortBy } from '@/types/shop/shopSortBy.types';
import {
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
	parseAsStringEnum,
	useQueryStates,
} from 'nuqs';
import { DEFAULT_SHOP_FILTER_VALUES } from './shopFilterValues';

type StrictParsersMap<T> = Record<keyof Required<T>, unknown>;

const productTypeValues = Object.values(FilterProductType);
const itemTypeValues = Object.values(ItemType);
const sortByValues = Object.values(ShopSortBy);
const sortOrderValues = Object.values(SortOrder);

export const shopFilterParsers = {
	page: parseAsInteger.withDefault(1),
	limit: parseAsInteger.withDefault(20),
	language: parseAsString.withDefault('en'),
	search: parseAsString.withDefault(DEFAULT_SHOP_FILTER_VALUES.search),
	itemType: parseAsArrayOf(parseAsStringEnum(itemTypeValues)).withDefault(
		DEFAULT_SHOP_FILTER_VALUES.itemType,
	),
	collection: parseAsArrayOf(parseAsString).withDefault([]),
	type: parseAsStringEnum(productTypeValues).withDefault(
		DEFAULT_SHOP_FILTER_VALUES.type,
	),
	sortBy: parseAsStringEnum(sortByValues).withDefault(
		DEFAULT_SHOP_FILTER_VALUES.sortBy,
	),
	sortOrder: parseAsStringEnum(sortOrderValues).withDefault(
		DEFAULT_SHOP_FILTER_VALUES.sortOrder,
	),
	minPrice: parseAsInteger.withDefault(DEFAULT_SHOP_FILTER_VALUES.minPrice),
	maxPrice: parseAsInteger,
} satisfies StrictParsersMap<PaginatedShopFilterDto>;

export const useShopFilters = () => {
	return useQueryStates(shopFilterParsers);
};
