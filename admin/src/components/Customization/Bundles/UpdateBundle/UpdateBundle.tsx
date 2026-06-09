'use client';

import { getBundleById, updateBundle } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateBundleDto } from '@/dto';
import { updateBundleSchema } from '@/schemas';
import { Form } from '@shared/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import BundleForm from '../BundleForm/BundleForm';

interface UpdateBundleProps {
	id: string;
}

const UpdateBundle = ({ id }: UpdateBundleProps) => {
	const { data, refetch, isLoading } = useQuery({
		queryFn: () => getBundleById(id),
		queryKey: QUERY_KEYS.customization.bundle.getById(id),
		enabled: !!id,
	});

	const initialItems = data?.items.map((bI) => bI.item);

	const { mutate } = useMutation({
		mutationFn: (dto: UpdateBundleDto) => updateBundle(id, dto),
	});

	if (isLoading) return <div>Loading...</div>;

	return (
		<Form<UpdateBundleDto>
			schema={updateBundleSchema}
			onSubmit={(data) =>
				mutate(data, {
					onSuccess: () => refetch(),
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
			<BundleForm<UpdateBundleDto>
				buttonLabel="Update Bundle"
				mediaUrl={data?.mediaUrl || undefined}
				isEdit
				initialItems={initialItems}
				id={id}
			/>
		</Form>
	);
};

export default UpdateBundle;
