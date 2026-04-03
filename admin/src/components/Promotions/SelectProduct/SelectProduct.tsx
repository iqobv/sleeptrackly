'use client';

import { CreatePromotionDto } from '@/dto';
import { FormProvider, useFormContext } from 'react-hook-form';
import ProductItemModal from './ProductItemsModal/ProductItemsModal';
import styles from './SelectProduct.module.scss';

const SelectProduct = () => {
	const methods = useFormContext<CreatePromotionDto>();

	const { register } = methods;

	return (
		<FormProvider {...methods}>
			<div className={styles.SelectProduct}>
				<input type="hidden" {...register('productIdReward')} />
			</div>

			<ProductItemModal />
		</FormProvider>
	);
};

export default SelectProduct;
