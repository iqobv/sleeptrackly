'use client';

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTrigger,
} from '@/components/UI';

import styles from './ProductItemsModal.module.scss';
import ProductsList from './ProductsList/ProductsList';

const ProductItemModal = () => {
	return (
		<Modal>
			<ModalTrigger asChild>
				<Button>Select</Button>
			</ModalTrigger>
			<ModalContent>
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

export default ProductItemModal;
