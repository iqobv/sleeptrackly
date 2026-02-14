'use client';

import { getBundleById, updateBundle } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateBundleDto } from '@/dto';
import { updateBundleSchema } from '@/schemas';
import { IBundle } from '@/types';
import { useQuery } from '@tanstack/react-query';
import CustomizationForm from '../../CustomizationForm/CustomizationForm';
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

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<CustomizationForm<UpdateBundleDto, IBundle>
			schema={updateBundleSchema}
			mutationFn={(dto) => updateBundle(id, dto)}
			onSuccess={() => {
				refetch();
			}}
			defaultValues={{
				...data,
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
		</CustomizationForm>
	);
};

export default UpdateBundle;
