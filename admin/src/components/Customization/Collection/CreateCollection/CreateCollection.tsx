'use client';

import { createCollection } from '@/api';
import { Form, NavigationBackButton } from '@/components/UI';
import { PAGES } from '@/config';
import { CreateCollectionDto } from '@/dto';
import { createCollectionSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { CustomizationPageHeader } from '../../CustomizationPageHeader';
import { CollectionForm } from '../CollectionForm';

export const CreateCollection = () => {
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: (data: CreateCollectionDto) => createCollection(data),
	});

	return (
		<div className="page">
			<CustomizationPageHeader
				title="New Collection"
				sectionHeaderProps={{
					leftSlot: <NavigationBackButton />,
				}}
			/>
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
				<CollectionForm />
			</Form>
		</div>
	);
};
