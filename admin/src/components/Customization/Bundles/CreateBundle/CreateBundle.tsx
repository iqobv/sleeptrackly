'use client';

import { createBundle } from '@/api';
import { CreateBundleDto } from '@/dto';
import { createBundleSchema } from '@/schemas';
import { Form } from '@shared/form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import BundleForm from '../BundleForm/BundleForm';

const CreateBundle = () => {
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: (dto: CreateBundleDto) => createBundle(dto),
		onSuccess: (data) => router.push(data.id),
		onError: (e) => toast.error(e.message || 'Something went wrong'),
	});

	return (
		<Form<CreateBundleDto>
			schema={createBundleSchema}
			defaultValues={{
				isExclusive: false,
				discountPercentage: 20,
				itemsIds: [],
				translations: [{ language: 'en', name: '' }],
				file: null as unknown as File,
			}}
			onSubmit={(data) => mutate(data)}
		>
			<BundleForm<CreateBundleDto> buttonLabel="Create Bundle" />
		</Form>
	);
};

export default CreateBundle;
