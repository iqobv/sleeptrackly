'use client';

import { deleteProduct } from '@/api';
import { PAGES } from '@/config';
import { FieldValues } from 'react-hook-form';
import DeleteButton from '../../DeleteButton/DeleteButton';
import FormContent from '../../FormContent/FormContent';
import FormFields from '../../FormFields/FormFields';
import { getProductsFields } from './productFields';
import ProductItemModal from './ProductItemsModal/ProductItemsModal';

interface ProductFormProps {
	buttonLabel?: string;
	isEdit?: boolean;
	id?: string;
}

const ProductForm = <T extends FieldValues>({
	buttonLabel,
	isEdit,
	id,
}: ProductFormProps) => {
	const fields = getProductsFields<T>();

	return (
		<FormContent buttonLabel={buttonLabel} isEdit={isEdit}>
			{isEdit && id && (
				<DeleteButton
					id={id}
					mutationFn={deleteProduct}
					onSuccessNavigateTo={PAGES.PRODUCTS}
				/>
			)}
			<ProductItemModal />
			<FormFields fields={fields} />
		</FormContent>
	);
};

export default ProductForm;
