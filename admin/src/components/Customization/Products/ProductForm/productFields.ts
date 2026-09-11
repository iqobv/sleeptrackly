import { CreateProductDto } from '@/dto/customization/product.dto';
import { Field } from '@/types/ui/field.types';

export const PRODUCTS_FIELDS: Field<CreateProductDto>[] = [
	{
		name: 'itemId',
		label: 'Item Id',
		placeholder: 'Item',
		type: 'hidden',
	},
	{
		name: 'bundleId',
		label: 'Bundle Id',
		placeholder: 'Bundle',
		type: 'hidden',
	},
	{
		name: 'isNew',
		label: 'Is New',
		placeholder: 'New',
		type: 'checkbox',
	},
	{
		name: 'isShowInStore',
		label: 'Show In Store',
		placeholder: 'Show In Store',
		type: 'checkbox',
	},
	{
		name: 'isExclusive',
		label: 'Exclusive',
		placeholder: 'Exclusive',
		type: 'checkbox',
	},

	{
		name: 'isLimited',
		label: 'Limited',
		placeholder: 'Limited',
		type: 'checkbox',
	},
	{
		name: 'price',
		label: 'Enter Price (leave emptry to inherit from item or bundle)',
		placeholder: 'Price',
		type: 'number',
	},
	{
		name: 'discountedPrice',
		label: 'Enter Discounted Price (leave emptry to not make discount)',
		placeholder: 'Discounted Price',
		type: 'number',
	},
	{
		name: 'maxStock',
		label: 'Enter Max Stock (leave emptry to remove stock limit)',
		placeholder: 'Max Stock',
		type: 'number',
	},
	{
		name: 'expiresAt',
		label: 'Expires At',
		placeholder: 'Expires At',
		type: 'datetime-local',
	},
];
