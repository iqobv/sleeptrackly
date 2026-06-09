'use client';

import { getCollectionById } from '@/api';
import { BaseCollectionDto } from '@/dto';
import { CollectionProduct } from '@/types';
import {
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalTrigger,
	SectionHeader,
} from '@shared/ui';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './CollectionFormProduct.module.scss';
import CollectionFormProductBody from './CollectionFormProductBody';
import CollectionFormProductGrid from './CollectionFormProductGrid';

export type SelectedProduct = NonNullable<
	Awaited<ReturnType<typeof getCollectionById>>['products'][number]['product']
>;

interface CollectionFormProductProps {
	initialData?: CollectionProduct[];
}

export const CollectionFormProduct = ({
	initialData,
}: CollectionFormProductProps) => {
	const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
		[],
	);

	const { setValue, watch } = useFormContext<BaseCollectionDto>();

	useEffect(() => {
		if (initialData && initialData.length > 0) {
			setSelectedProducts(initialData.map((p) => p.product));
			setValue(
				'productIds',
				initialData.map((p) => p.productId),
				{
					shouldDirty: false,
				},
			);
		}
	}, [initialData, setValue]);

	const selectedProductIds = watch('productIds') || [];

	const handleSelect = (product: SelectedProduct) => {
		const isSelected = selectedProductIds.includes(product.id);

		if (isSelected) {
			const newSelected = selectedProductIds.filter((id) => id !== product.id);
			setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
			setValue('productIds', newSelected, { shouldDirty: true });
		} else {
			setSelectedProducts((prev) => [...prev, product]);
			setValue('productIds', [...selectedProductIds, product.id], {
				shouldDirty: true,
			});
		}
	};

	return (
		<div className={styles.collectionFormProduct}>
			<SectionHeader
				title="Products"
				titleProps={{ variant: 'body1' }}
				padding={5}
			/>
			<Modal>
				<ModalTrigger asChild>
					<Button>Select Products</Button>
				</ModalTrigger>
				<ModalContent className={styles.modalContent}>
					<ModalHeader>Select Products</ModalHeader>
					<CollectionFormProductBody
						onToggleProduct={handleSelect}
						selectedProducts={selectedProducts}
					/>
				</ModalContent>
			</Modal>
			{selectedProducts.length > 0 && (
				<CollectionFormProductGrid
					products={selectedProducts}
					onToggleProduct={handleSelect}
					selectedProducts={selectedProducts}
				/>
			)}
		</div>
	);
};
