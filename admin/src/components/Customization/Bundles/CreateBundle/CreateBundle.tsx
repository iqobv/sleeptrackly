'use client';

import { createBundle } from '@/api';
import { PAGES } from '@/config';
import { CreateBundleDto } from '@/dto';
import { createBundleSchema } from '@/schemas';
import { Bundle } from '@/types';
import { useRouter } from 'next/navigation';
import CustomizationForm from '../../CustomizationForm/CustomizationForm';
import BundleForm from '../BundleForm/BundleForm';

const CreateBundle = () => {
	const router = useRouter();

	return (
		<CustomizationForm<CreateBundleDto, Bundle>
			schema={createBundleSchema}
			mutationFn={createBundle}
			onSuccess={(data) => {
				router.push(PAGES.BUNDLE(data.id));
			}}
			defaultValues={{
				isExclusive: false,
				discountPercentage: 20,
				itemsIds: [],
				translations: [{ language: 'en', name: '' }],
				file: null as unknown as File,
			}}
		>
			<BundleForm<CreateBundleDto> buttonLabel="Create Bundle" />
		</CustomizationForm>
	);
};

export default CreateBundle;
