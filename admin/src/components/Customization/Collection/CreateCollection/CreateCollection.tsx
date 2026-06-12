'use client';

import { createCollection } from '@/api/customization/collection/createCollection.api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { CreateCollectionDto } from '@/dto/customization/collection.dto';
import { createCollectionSchema } from '@/schemas/customization/collection/createCollection.schema';
import { Form } from '@shared/form';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { CollectionForm } from '../CollectionForm/CollectionForm';

export const CreateCollection = () => {
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: CreateCollectionDto) => createCollection(data),
	});

	return (
		<PageWrapper title="New Collection">
			<Form<CreateCollectionDto>
				schema={createCollectionSchema}
				onSubmit={(data, _e, methods) => {
					mutate(data, {
						onSuccess: (data) => router.push(PAGES.COLLECTION(data.id)),
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
			>
				<CollectionForm isLoading={isPending} />
			</Form>
		</PageWrapper>
	);
};
