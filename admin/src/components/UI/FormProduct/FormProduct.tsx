'use client';

import { ItemCard } from '@/components/Promotions/SelectProduct/ProductItemsModal/ProductsList/ItemCard/ItemCard';
import { Product } from '@/types/customization/product/product.types';
import {
	Button,
	Field,
	Modal,
	ModalContent,
	ModalHeader,
	ModalTrigger,
	Typography,
} from '@shared/ui';
import { useEffect, useState } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import styles from './FormProduct.module.scss';
import { FormProductProps } from './FormProduct.types';
import { FormProductBody } from './FormProductBody';

export const FormProduct = <D extends FieldValues>({
	initProduct,
	name,
}: FormProductProps<D>) => {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(
		() => initProduct || null,
	);

	const { register, setValue } = useFormContext<D>();

	useEffect(() => {
		if (selectedProduct) {
			setValue(name, selectedProduct.id as PathValue<D, Path<D>>, {
				shouldDirty: true,
			});
		}
	}, [selectedProduct, setValue]);

	return (
		<Field contentClassName={styles.product}>
			<Typography>Reward Product</Typography>
			{selectedProduct && (
				<ItemCard
					product={selectedProduct}
					actions={
						<Button
							variant="contained"
							fullWidth
							onClick={() => {
								setSelectedProduct(null);
								setValue(name, null as PathValue<D, Path<D>>, {
									shouldDirty: true,
								});
							}}
						>
							Remove
						</Button>
					}
				/>
			)}
			<input type="hidden" {...register(name)} />
			<Modal>
				<ModalTrigger asChild>
					<Button>Select Product</Button>
				</ModalTrigger>
				<ModalContent className={styles.content}>
					<ModalHeader>Select Product</ModalHeader>
					<FormProductBody
						selectedProduct={selectedProduct}
						setSelectedProduct={setSelectedProduct}
					/>
				</ModalContent>
			</Modal>
		</Field>
	);
};
