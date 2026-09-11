'use client';

import {
	deletePromotion,
	getPromotionById,
	updatePromotion,
} from '@/api/promotion/promotion.api';
import { DeleteButton, FormFields, PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { UpdatePromotionDto } from '@/dto/promotion/promotion.dto';
import { updatePromotionSchema } from '@/schemas/promotion/updatePromotion.schema';
import { Form } from '@shared/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { PromotionForm } from '../PromotionForm/PromotionForm';
import { SelectProduct } from '../SelectProduct/SelectProduct';
import { PROMOTIONS_FIELDS } from './promotionFields';

export const EditPromotion = () => {
	const { id } = useParams<{ id: string }>();

	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryFn: () => getPromotionById(id),
		queryKey: QUERY_KEYS.promotion.detail(id),
		enabled: !!id,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: UpdatePromotionDto) => updatePromotion(id, data),
	});

	return (
		<PageWrapper
			title="Edit Promotion"
			description="Modify the details of the promotion"
			showBackButton
			customRightSlot={
				<DeleteButton
					id={data?.id || ''}
					mutationFn={deletePromotion}
					onSuccessNavigateTo={PAGES.PROMOTIONS}
					queryInvalidateKey={QUERY_KEYS.promotion.all}
					title="Delete Promotion"
					text="Are you sure you want to delete this promotion? This action cannot be undone."
				/>
			}
		>
			<Form<UpdatePromotionDto>
				schema={updatePromotionSchema}
				defaultValues={{
					coinsReward: undefined,
					productIdReward: undefined,
					maxUses: undefined,
					expiresAt: undefined,
				}}
				values={{
					coinsReward: data?.coinsReward,
					productIdReward: data?.productIdReward,
					maxUses: data?.maxUses,
					expiresAt: data?.expiresAt ? new Date(data.expiresAt) : undefined,
				}}
				onSubmit={(data, _e, methods) => {
					mutate(data, {
						onSuccess: () => {
							queryClient.invalidateQueries({
								queryKey: QUERY_KEYS.promotion.detail(id),
							});
							queryClient.invalidateQueries({
								queryKey: QUERY_KEYS.promotion.lists(),
							});
						},
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
				<PromotionForm isEditing isLoading={isPending}>
					<SelectProduct />
					<p>Alias</p>
					<p>{data?.alias}</p>
					<FormFields fields={PROMOTIONS_FIELDS} />
				</PromotionForm>
			</Form>
		</PageWrapper>
	);
};
