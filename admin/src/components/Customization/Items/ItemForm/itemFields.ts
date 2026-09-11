import { CreateItemDto } from '@/dto/customization/item.dto';
import { Field } from '@/types/ui/field.types';
import { CREATE_ITEM_OPTIONS } from './CreateItemOptions';
import { CREATE_ITEM_RARITY_OPTIONS } from './CreateItemOptionsRarityOptions';

export const ITEM_FIELDS: Field<CreateItemDto>[] = [
	{
		name: 'basePrice',
		label: 'Base Price',
		type: 'number',
		placeholder: 'Enter base price',
	},
	{
		name: 'isExclusive',
		label: 'Exclusive',
		type: 'checkbox',
		placeholder: '',
	},
	{
		name: 'type',
		label: 'Type',
		type: 'select',
		placeholder: 'Select item type',
		options: CREATE_ITEM_OPTIONS,
	},
	{
		name: 'rarity',
		label: 'Rarity',
		type: 'select',
		placeholder: 'Select item rarity',
		options: CREATE_ITEM_RARITY_OPTIONS,
	},
];
