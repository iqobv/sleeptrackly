'use client';

import { createBundle } from '@/api';
import { PageWrapper } from '@/components/UI';
import { CreateBundleDto } from '@/dto';
import { createBundleSchema } from '@/schemas';
import { Form } from '@shared/form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { BundleForm } from '../BundleForm/BundleForm';

export const CreateBundle = () => {
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationFn: (dto: CreateBundleDto) => createBundle(dto),
		onSuccess: (data) => router.push(data.id),
		onError: (e) => toast.error(e.message || 'Something went wrong'),
	});

	return (
		<PageWrapper title="Create Bundle">
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
				<BundleForm isLoading={isPending} />
			</Form>
		</PageWrapper>
	);
};
