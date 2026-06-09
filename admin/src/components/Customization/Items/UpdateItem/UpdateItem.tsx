'use client';

import { getItemById, updateItem } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateItemDto } from '@/dto';
import { updateItemSchema } from '@/schemas';
import { Form } from '@shared/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
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

	const { mutate } = useMutation({
		mutationFn: (data: UpdateItemDto) => updateItem(id, data),
		onSuccess: () => refetch(),
		onError: (e) => toast.error(e.message || 'Something went wrong'),
	});

	return (
		<Form<UpdateItemDto>
			schema={updateItemSchema}
			onSubmit={(data) => mutate(data)}
			defaultValues={{
				isExclusive: false,
				type: undefined,
				basePrice: 0,
				rarity: undefined,
				translations: [{ language: 'en', name: '' }],
				media: null as unknown as File,
				preview: null as unknown as File,
			}}
			values={{
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
		</Form>
	);
};

export default UpdateItem;
