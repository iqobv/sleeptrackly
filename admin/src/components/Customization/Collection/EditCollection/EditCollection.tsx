'use client';

import { getCollectionById, updateCollection } from '@/api';
import { Form } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { UpdateCollectionDto } from '@/dto';
import { updateCollectionSchema } from '@/schemas';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { CustomizationPageHeader } from '../../CustomizationPageHeader';
import { CollectionForm } from '../CollectionForm';
import EditCollectionDelete from './EditCollectionDelete';

export const EditCollection = () => {
	const { id } = useParams<{ id: string }>();
	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: QUERY_KEYS.customization.collection.byId(id),
		queryFn: () => getCollectionById(id),
		enabled: !!id,
	});

	const { mutate } = useMutation({
		mutationFn: (data: UpdateCollectionDto) => updateCollection(id, data),
	});

	return (
		<div className="page" style={{ paddingBottom: '3.75rem' }}>
			<CustomizationPageHeader
				title="Edit Collection"
				customButton={<EditCollectionDelete id={id} />}
			/>
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
								QUERY_KEYS.customization.collection.byId(id),
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
				<CollectionForm initialData={data} isEdit />
			</Form>
		</div>
	);
};
