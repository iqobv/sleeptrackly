import { ShopFilterDto } from '@/dto';
import { ItemType, ProductType, ShopSortBy } from '@/types';

export const DEFAULT_SHOP_FILTER_VALUES: ShopFilterDto = {
	type: 'ALL',
	sortBy: 'DATE',
	sortOrder: 'desc',
	search: '',
	itemType: [],
};

export const getShopFiltersParamsFromUrl = (
	searchParams: URLSearchParams,
): ShopFilterDto => ({
	type: (searchParams.get('type') as 'ALL' | ProductType) || 'ALL',
	sortBy: (searchParams.get('sortBy') as ShopSortBy) || 'DATE',
	sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
	search: searchParams.get('search') || '',
	itemType: (searchParams.get('itemType')?.split(',') as ItemType[]) || [],
});
