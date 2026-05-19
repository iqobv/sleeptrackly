'use client';

import { Button, Modal } from '@/components/UI';

import styles from './ProductItemsModal.module.scss';
import ProductsList from './ProductsList/ProductsList';

const ProductItemModal = () => {
	return (
		<Modal>
			<Modal.Trigger asChild>
				<Button>Select</Button>
			</Modal.Trigger>
			<Modal.Content>
				<Modal.Header>Select Product</Modal.Header>
				<Modal.Body>
					<div className={styles.tabs}></div>
					<div>
						<ProductsList />
					</div>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default ProductItemModal;
