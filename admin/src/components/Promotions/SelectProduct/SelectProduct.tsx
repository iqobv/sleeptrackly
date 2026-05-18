'use client';

import { CreatePromotionDto } from '@/dto';
import { FormProvider, useFormContext } from 'react-hook-form';
import ProductItemModal from './ProductItemsModal/ProductItemsModal';

const SelectProduct = () => {
	const methods = useFormContext<CreatePromotionDto>();

	const { register } = methods;

	return (
		<FormProvider {...methods}>
			<input type="hidden" {...register('productIdReward')} />
			<ProductItemModal />
		</FormProvider>
	);
};

export default SelectProduct;
