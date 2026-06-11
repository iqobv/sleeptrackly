import { CreateBundleDto } from '@/dto';
import { Field } from '@/types';

export const BUNDLE_FIELDS: Field<CreateBundleDto>[] = [
	{
		name: 'isExclusive',
		placeholder: 'Is Exclusive',
		label: 'Exclusive',
		type: 'checkbox',
	},
	{
		name: 'discountPercentage',
		placeholder: 'Discount Percentage',
		label: 'Discount Percentage',
		type: 'number',
	},
];
