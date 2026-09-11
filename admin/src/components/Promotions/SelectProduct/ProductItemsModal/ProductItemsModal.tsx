'use client';

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTrigger,
} from '@shared/ui';
import styles from './ProductItemsModal.module.scss';
import { ProductsList } from './ProductsList/ProductsList';

export const ProductItemModal = () => {
	return (
		<Modal>
			<ModalTrigger asChild>
				<Button>Select</Button>
			</ModalTrigger>
			<ModalContent className={styles.modalContent}>
				<ModalHeader>Select Product</ModalHeader>
				<ModalBody>
					<div className={styles.tabs}></div>
					<div>
						<ProductsList />
					</div>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
