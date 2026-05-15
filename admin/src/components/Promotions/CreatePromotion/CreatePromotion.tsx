'use client';

import { createPromotion } from '@/api';
import { PAGES } from '@/config';
import { CreatePromotionDto } from '@/dto';
import { basePromotionSchema } from '@/schemas';
import { Promotion } from '@/types';
import { useRouter } from 'next/navigation';
import FormFields from '../PromotionForm/FormFields/FormFields';
import PromotionForm from '../PromotionForm/PromotionForm';
import SelectProduct from '../SelectProduct/SelectProduct';
import { PROMOTIONS_FIELDS } from './promotionFields';

const CreatePromotion = () => {
	const router = useRouter();

	return (
		<div>
			<PromotionForm<CreatePromotionDto, Promotion>
				schema={basePromotionSchema}
				defaultValues={{
					alias: '',
					coinsReward: 0,
					productIdReward: undefined,
					maxUses: undefined,
					expiresAt: undefined,
				}}
				onSuccess={(data) => router.push(PAGES.PROMOTION(data.id))}
				mutationFn={(data) => createPromotion(data) as Promise<Promotion>}
			>
				<SelectProduct />
				<FormFields fields={PROMOTIONS_FIELDS} />
			</PromotionForm>
		</div>
	);
};

export default CreatePromotion;
