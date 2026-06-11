import { ShopFilterDto } from '@/dto/shop/shop.dto';

export const DEFAULT_SHOP_FILTER_VALUES = {
	type: 'ALL',
	sortBy: 'DATE',
	sortOrder: 'DESC',
	search: '',
	itemType: [],
} satisfies ShopFilterDto;
