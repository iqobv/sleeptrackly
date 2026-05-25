'use client';

import ItemCard from '@/components/Promotions/SelectProduct/ProductItemsModal/ProductsList/ItemCard/ItemCard';
import { Button, Field, Modal } from '@/components/UI';
import { BaseAchievementDto } from '@/dto';
import { Product } from '@/types';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './AchievementFormProducts.module.scss';
import AchievementFormProductsBody from './AchievementFormProductsBody';

const AchievementFormProducts = () => {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const { register, setValue } = useFormContext<BaseAchievementDto>();

	useEffect(() => {
		if (selectedProduct) {
			setValue('rewardProductId', selectedProduct.id, { shouldDirty: true });
		}
	}, [selectedProduct, setValue]);

	return (
		<Field className={styles.achievementFormProducts}>
			{selectedProduct && (
				<ItemCard
					product={selectedProduct}
					actions={
						<Button
							variant="contained"
							fullWidth
							onClick={() => {
								setSelectedProduct(null);
								setValue('rewardProductId', null, { shouldDirty: true });
							}}
						>
							Remove
						</Button>
					}
				/>
			)}
			<input type="hidden" {...register('rewardProductId')} />
			<Modal>
				<Modal.Trigger asChild>
					<Button>Select Reward Product</Button>
				</Modal.Trigger>
				<Modal.Content className={styles.content}>
					<Modal.Header>Select Reward Product</Modal.Header>
					<AchievementFormProductsBody
						selectedProduct={selectedProduct}
						setSelectedProduct={setSelectedProduct}
					/>
				</Modal.Content>
			</Modal>
		</Field>
	);
};

export default AchievementFormProducts;
