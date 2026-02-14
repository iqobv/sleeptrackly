'use client';

import { Button, Modal } from '@/components/UI';
import { TProductType } from '@/types';
import { useState } from 'react';
import ProductBundlesList from './ProductBundlesList/ProductBundlesList';
import ProductItemsList from './ProductItemsList/ProductItemsList';

import styles from './ProductItemsModal.module.scss'

const ProductItemModal = () => {
	const [selectedType, setSelectedType] = useState<TProductType>('ITEM');
	const [open, setOpen] = useState(false);

	const handleClose = () => setOpen((prev) => !prev);

	return (
		<div>
			<Button onClick={handleClose}>Select</Button>
			<Modal isOpen={open} onClose={handleClose}>
				<div className={styles['product-items__tabs']}>
					<Button
						variant={selectedType === 'ITEM' ? 'secondary' : 'outlined'}
						onClick={() => setSelectedType('ITEM')}
					>
						Items
					</Button>
					<Button
						variant={selectedType === 'BUNDLE' ? 'secondary' : 'outlined'}
						onClick={() => setSelectedType('BUNDLE')}
					>
						Bundles
					</Button>
				</div>
				<div>
					{selectedType === 'ITEM' && <ProductItemsList />}
					{selectedType === 'BUNDLE' && <ProductBundlesList />}
				</div>
			</Modal>
		</div>
	);
};

export default ProductItemModal;
