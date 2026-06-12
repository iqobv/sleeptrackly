'use client';

import { createPromotion } from '@/api/promotion/promotion.api';
import { FormFields, PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { CreatePromotionDto } from '@/dto/promotion/promotion.dto';
import { createPromotionSchema } from '@/schemas/promotion/createPromotion.schema';
import { Form } from '@shared/form';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PromotionForm } from '../PromotionForm/PromotionForm';
import { SelectProduct } from '../SelectProduct/SelectProduct';
import { PROMOTIONS_FIELDS } from './promotionFields';

export const CreatePromotion = () => {
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: CreatePromotionDto) => createPromotion(data),
	});

	return (
		<PageWrapper
			title="Create Promotion"
			description="Fill in the details to create a new promotion"
		>
			<Form<CreatePromotionDto>
				schema={createPromotionSchema}
				defaultValues={{
					coinsReward: undefined,
					productIdReward: undefined,
					maxUses: undefined,
					alias: undefined,
					expiresAt: undefined,
				}}
				onSubmit={(data, _e, methods) => {
					const {
						formState: { errors },
					} = methods;
					console.log(data);

					console.log(data, errors);
					mutate(data, {
						onSuccess: (data) => router.push(PAGES.PROMOTION(data.id)),
						onError: (e) => {
							if (isAxiosError(e) && e.response?.data.code) {
								if (e.response.data.field) {
									methods.setError(e.response.data.field, {
										message: e.response.data.message,
									});
									return;
								}

								toast.error(e.response.data.message);
							}

							toast.error(
								e.message || 'An error occurred while creating the promotion',
							);
						},
					});
				}}
			>
				<PromotionForm isEditing={false} isLoading={isPending}>
					<SelectProduct />
					<FormFields fields={PROMOTIONS_FIELDS} />
				</PromotionForm>
			</Form>
		</PageWrapper>
	);
};
