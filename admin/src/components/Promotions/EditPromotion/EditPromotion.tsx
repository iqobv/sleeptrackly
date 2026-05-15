'use client';

import { getPromotionById, updatePromotion } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdatePromotionDto } from '@/dto';
import { updatePromotionSchema } from '@/schemas';
import { Promotion } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import FormFields from '../PromotionForm/FormFields/FormFields';
import PromotionForm from '../PromotionForm/PromotionForm';
import SelectProduct from '../SelectProduct/SelectProduct';
import { PROMOTIONS_FIELDS } from './promotionFields';

const EditPromotion = () => {
	const { id } = useParams<{ id: string }>();

	const { data } = useQuery({
		queryFn: () => getPromotionById(id),
		queryKey: QUERY_KEYS.promotion.byId(id),
	});

	return (
		<div>
			{data && (
				<PromotionForm<UpdatePromotionDto, Promotion>
					schema={updatePromotionSchema}
					defaultValues={{
						coinsReward: data.coinsReward ?? undefined,
						productIdReward: data.productIdReward ?? undefined,
						maxUses: data.maxUses ?? undefined,
						expiresAt: data.expiresAt ?? undefined,
					}}
					mutationFn={(mutationData) =>
						updatePromotion(id, mutationData) as Promise<Promotion>
					}
				>
					<SelectProduct />
					<p>Alias</p>
					<p>{data.alias}</p>
					<FormFields fields={PROMOTIONS_FIELDS} />
				</PromotionForm>
			)}
		</div>
	);
};

export default EditPromotion;
