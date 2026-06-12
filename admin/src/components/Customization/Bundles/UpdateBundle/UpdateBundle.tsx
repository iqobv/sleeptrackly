'use client';

import { deleteBundle } from '@/api/customization/bundle/deleteBundle.api';
import { getBundleById } from '@/api/customization/bundle/getBundleById.api';
import { updateBundle } from '@/api/customization/bundle/updateBundle.api';
import { DeleteButton, PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { UpdateBundleDto } from '@/dto/customization/bundle.dto';
import { updateBundleSchema } from '@/schemas/customization/bundle/updateBundle.schema';
import { Form } from '@shared/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { BundleForm } from '../BundleForm/BundleForm';

interface UpdateBundleProps {
	id: string;
}

export const UpdateBundle = ({ id }: UpdateBundleProps) => {
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryFn: () => getBundleById(id),
		queryKey: QUERY_KEYS.customization.bundle.detail(id),
		enabled: !!id,
	});

	const initialItems = data?.items.map((bI) => bI.item);

	const { mutate } = useMutation({
		mutationFn: (dto: UpdateBundleDto) => updateBundle(id, dto),
	});

	if (isLoading) return <div>Loading...</div>;

	return (
		<PageWrapper
			title="Update Bundle"
			customRightSlot={
				<DeleteButton
					id={id}
					mutationFn={deleteBundle}
					onSuccessNavigateTo={PAGES.BUNDLES}
					queryInvalidateKey={QUERY_KEYS.customization.bundle.all}
					title="Delete Bundle"
					text="Are you sure you want to delete this bundle? This action cannot be undone."
				/>
			}
		>
			<Form<UpdateBundleDto>
				schema={updateBundleSchema}
				onSubmit={(data) =>
					mutate(data, {
						onSuccess: () => {
							queryClient.invalidateQueries({
								queryKey: QUERY_KEYS.customization.bundle.detail(id),
							});
							queryClient.invalidateQueries({
								queryKey: QUERY_KEYS.customization.bundle.lists,
							});
							toast.success('Bundle updated successfully');
						},
						onError: (e) => toast.error(e.message || 'Something went wrong'),
					})
				}
				defaultValues={{
					discountPercentage: undefined,
					file: undefined,
					itemsIds: [],
					isExclusive: false,
					translations: [
						{
							language: 'en',
							name: '',
						},
					],
				}}
				values={{
					discountPercentage: data?.discountPercentage ?? undefined,
					isExclusive: data?.isExclusive || false,
					translations: data?.translations.map((t) => ({
						language: t.language,
						name: t.name,
					})) || [{ language: 'en', name: '' }],
					itemsIds: data?.items.map((bI) => bI.itemId) || [],
					file: null as unknown as File,
				}}
			>
				<BundleForm
					mediaUrl={data?.mediaUrl || undefined}
					isEdit
					initialItems={initialItems}
				/>
			</Form>
		</PageWrapper>
	);
};
