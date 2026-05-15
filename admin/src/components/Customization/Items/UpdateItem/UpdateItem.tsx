'use client';

import { getItemById, updateItem } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateItemDto } from '@/dto';
import { updateItemSchema } from '@/schemas';
import { Item } from '@/types';
import { useQuery } from '@tanstack/react-query';
import CustomizationForm from '../../CustomizationForm/CustomizationForm';
import ItemForm from '../ItemForm/ItemForm';

interface UpdateItemProps {
	id: string;
}

const UpdateItem = ({ id }: UpdateItemProps) => {
	const { data, refetch } = useQuery({
		queryFn: () => getItemById(id!),
		queryKey: QUERY_KEYS.customization.item.getById(id!),
		enabled: !!id,
	});

	return (
		<CustomizationForm<UpdateItemDto, Item>
			schema={updateItemSchema}
			mutationFn={(data) => updateItem(id, data)}
			onSuccess={() => {
				refetch();
			}}
			id={id}
			defaultValues={{
				...data,
				translations: data?.translations.map((t) => ({
					language: t.language,
					name: t.name,
				})) || [{ language: 'en', name: '' }],
				media: null as unknown as File,
				preview: null as unknown as File,
			}}
		>
			<ItemForm<UpdateItemDto>
				isAnimated={data?.isAnimated}
				mediaUrl={data?.mediaUrl}
				previewUrl={data?.previewUrl}
				isEdit
				buttonLabel="Update Item"
				id={id}
			/>
		</CustomizationForm>
	);
};

export default UpdateItem;
