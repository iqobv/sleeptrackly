'use client';

import { ProductType } from '@shared/types';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTrigger,
} from '@shared/ui';
import { useState } from 'react';
import { ProductBundlesList } from './ProductBundlesList/ProductBundlesList';
import { ProductItemsList } from './ProductItemsList/ProductItemsList';
import styles from './ProductItemsModal.module.scss';

export const ProductItemModal = () => {
	const [selectedType, setSelectedType] = useState<ProductType>('ITEM');

	return (
		<Modal>
			<ModalTrigger asChild>
				<Button>Select</Button>
			</ModalTrigger>
			<ModalContent className={styles.content}>
				<ModalHeader>Select Item</ModalHeader>
				<ModalBody>
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
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
