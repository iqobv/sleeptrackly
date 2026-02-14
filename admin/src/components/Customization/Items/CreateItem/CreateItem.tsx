'use client';

import { createItem } from '@/api';
import { PAGES } from '@/config';
import { CreateItemDto } from '@/dto';
import { createItemSchema } from '@/schemas';
import { IItem } from '@/types';
import { useRouter } from 'next/navigation';
import CustomizationForm from '../../CustomizationForm/CustomizationForm';
import ItemForm from '../ItemForm/ItemForm';

const CreateItem = () => {
	const router = useRouter();

	return (
		<CustomizationForm<CreateItemDto, IItem>
			schema={createItemSchema}
			mutationFn={createItem}
			onSuccess={(data) => {
				router.push(PAGES.ITEM(data.id));
			}}
			defaultValues={{
				isExclusive: false,
				type: 'AVATAR_FRAME',
				basePrice: 0,
				rarity: 'COMMON',
				translations: [{ language: 'en', name: '' }],
				file: null as unknown as File,
			}}
		>
			<ItemForm<CreateItemDto> />
		</CustomizationForm>
	);
};

export default CreateItem;
