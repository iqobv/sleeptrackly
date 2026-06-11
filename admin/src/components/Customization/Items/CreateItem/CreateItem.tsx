'use client';

import { createItem } from '@/api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config';
import { CreateItemDto } from '@/dto';
import { createItemSchema } from '@/schemas';
import { Form } from '@shared/form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ItemForm } from '../ItemForm/ItemForm';

export const CreateItem = () => {
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationFn: (dto: CreateItemDto) => createItem(dto),
		onSuccess: (data) => router.push(PAGES.ITEM(data.id)),
		onError: (e) => toast.error(e.message || 'Something went wrong'),
	});

	return (
		<PageWrapper title="Create Item">
			<Form<CreateItemDto>
				schema={createItemSchema}
				onSubmit={(data) => mutate(data)}
				defaultValues={{
					isExclusive: false,
					type: 'AVATAR_FRAME',
					basePrice: 0,
					rarity: 'COMMON',
					translations: [{ language: 'en', name: '' }],
					media: null as unknown as File,
					preview: null as unknown as File,
				}}
			>
				<ItemForm isLoading={isPending} />
			</Form>
		</PageWrapper>
	);
};
