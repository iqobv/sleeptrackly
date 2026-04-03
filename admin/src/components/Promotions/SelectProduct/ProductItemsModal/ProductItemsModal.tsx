'use client';

import { Button, Modal } from '@/components/UI';
import { useState } from 'react';

import styles from './ProductItemsModal.module.scss';
import ProductsList from './ProductsList/ProductsList';

const ProductItemModal = () => {
	const [open, setOpen] = useState(false);

	const handleClose = () => setOpen((prev) => !prev);

	return (
		<div>
			<Button onClick={handleClose}>Select</Button>
			<Modal isOpen={open} onClose={handleClose}>
				<div className={styles['product-items__tabs']}></div>
				<div>
					<ProductsList />
				</div>
			</Modal>
		</div>
	);
};

export default ProductItemModal;
