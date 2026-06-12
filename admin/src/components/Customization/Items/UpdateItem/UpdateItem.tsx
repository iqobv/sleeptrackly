'use client';

import {
	deleteItem,
	getItemById,
	updateItem,
} from '@/api/customization/item/item.api';
import { DeleteButton, PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { UpdateItemDto } from '@/dto/customization/item.dto';
import { updateItemSchema } from '@/schemas/customization/item/updateItem.schema';
import { Form } from '@shared/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ItemForm } from '../ItemForm/ItemForm';

interface UpdateItemProps {
	id: string;
}

export const UpdateItem = ({ id }: UpdateItemProps) => {
	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryFn: () => getItemById(id!),
		queryKey: QUERY_KEYS.customization.item.detail(id),
		enabled: !!id,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: UpdateItemDto) => updateItem(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.customization.item.detail(id),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.customization.item.lists,
			});
			toast.success('Item updated successfully');
		},
		onError: (e) => toast.error(e.message || 'Something went wrong'),
	});

	return (
		<PageWrapper
			title="Update Item"
			customRightSlot={
				<DeleteButton
					id={id}
					mutationFn={deleteItem}
					onSuccessNavigateTo={PAGES.ITEMS}
					queryInvalidateKey={QUERY_KEYS.customization.item.all}
					text="Are you sure you want to delete this item? This action cannot be undone."
					title="Delete Item"
				/>
			}
		>
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
				<ItemForm
					isAnimated={data?.isAnimated}
					mediaUrl={data?.mediaUrl}
					previewUrl={data?.previewUrl}
					isEdit
					isLoading={isPending}
				/>
			</Form>
		</PageWrapper>
	);
};
