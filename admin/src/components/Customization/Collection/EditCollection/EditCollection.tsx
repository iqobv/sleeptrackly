'use client';

import { deleteCollection } from '@/api/customization/collection/deleteCollection.api';
import { getCollectionById } from '@/api/customization/collection/getCollectionById.api';
import { updateCollection } from '@/api/customization/collection/updateCollection.api';
import { DeleteButton, PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { UpdateCollectionDto } from '@/dto/customization/collection.dto';
import { updateCollectionSchema } from '@/schemas/customization/collection/updateCollection.schema';
import { Form } from '@shared/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { CollectionForm } from '../CollectionForm/CollectionForm';

export const EditCollection = () => {
	const { id } = useParams<{ id: string }>();
	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: QUERY_KEYS.customization.collection.detail(id),
		queryFn: () => getCollectionById(id),
		enabled: !!id,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: UpdateCollectionDto) => updateCollection(id, data),
	});

	return (
		<PageWrapper
			title="Edit Collection"
			customRightSlot={
				<DeleteButton
					id={id}
					mutationFn={deleteCollection}
					onSuccessNavigateTo={PAGES.COLLECTIONS}
					queryInvalidateKey={QUERY_KEYS.customization.collection.all}
					title="Delete Collection"
					text="Are you sure you want to delete this collection? This action cannot be undone."
				/>
			}
		>
			<Form<UpdateCollectionDto>
				schema={updateCollectionSchema}
				defaultValues={{
					icon: undefined,
					productIds: [],
					showInStore: false,
					slug: '',
					translations: [
						{
							language: 'en',
							name: '',
						},
					],
					accentColor: '#000000',
				}}
				onSubmit={(data, _e, methods) => {
					mutate(data, {
						onSuccess: (data) => {
							queryClient.setQueryData(
								QUERY_KEYS.customization.collection.detail(id),
								data,
							);

							queryClient.invalidateQueries({
								queryKey: QUERY_KEYS.customization.collection.all,
							});
						},
						onError: (error) => {
							if (
								isAxiosError(error) &&
								error.response?.data.code === 'COLLECTION_SLUG_EXISTS'
							) {
								methods.setError('slug', {
									message: error.response.data.message || 'Slug already exists',
								});

								return;
							}

							methods.setError('root', {
								message:
									error.message ||
									'An error occurred while creating the collection.',
							});
						},
					});
				}}
				values={{
					productIds: data?.products.map((p) => p.productId) || [],
					showInStore: data?.showInStore,
					slug: data?.slug,
					translations: data?.translations.map((t) => ({
						language: t.language,
						name: t.name,
					})),
					accentColor: data?.accentColor,
				}}
			>
				<CollectionForm initialData={data} isEdit isLoading={isPending} />
			</Form>
		</PageWrapper>
	);
};
