'use client';

import { Button, Modal } from '@/components/UI';
import { ProductType } from '@/types';
import { useState } from 'react';
import ProductBundlesList from './ProductBundlesList/ProductBundlesList';
import ProductItemsList from './ProductItemsList/ProductItemsList';

import styles from './ProductItemsModal.module.scss';

const ProductItemModal = () => {
	const [selectedType, setSelectedType] = useState<ProductType>('ITEM');

	return (
		<div>
			<Modal>
				<Modal.Trigger asChild>
					<Button>Select</Button>
				</Modal.Trigger>
				<Modal.Content className={styles.content}>
					<Modal.Header>Select Item</Modal.Header>
					<Modal.Body>
						<div>
							<div className={styles.tabs}>
								<Button
									variant={selectedType === 'ITEM' ? 'contained' : 'outlined'}
									color="secondary"
									onClick={() => setSelectedType('ITEM')}
								>
									Items
								</Button>
								<Button
									variant={selectedType === 'BUNDLE' ? 'contained' : 'outlined'}
									color="secondary"
									onClick={() => setSelectedType('BUNDLE')}
								>
									Bundles
								</Button>
							</div>
							<div>
								{selectedType === 'ITEM' && <ProductItemsList />}
								{selectedType === 'BUNDLE' && <ProductBundlesList />}
							</div>
						</div>
					</Modal.Body>
				</Modal.Content>
			</Modal>
		</div>
	);
};

export default ProductItemModal;
