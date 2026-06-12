import { CreateBundleDto } from '@/dto/customization/bundle.dto';
import { Field } from '@/types/ui/field.types';

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
