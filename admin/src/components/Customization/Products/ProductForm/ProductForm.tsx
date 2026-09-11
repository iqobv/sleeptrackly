'use client';

import { FormContent, FormFields } from '@/components/UI';
import { ProductItemModal } from './ProductItemsModal/ProductItemsModal';
import { PRODUCTS_FIELDS } from './productFields';

interface ProductFormProps {
	isEdit?: boolean;
	isLoading?: boolean;
}

export const ProductForm = ({
	isEdit,
	isLoading = false,
}: ProductFormProps) => {
	return (
		<FormContent
			buttonLabel={isEdit ? 'Update Product' : 'Create Product'}
			isEdit={isEdit}
			isLoading={isLoading}
		>
			<ProductItemModal />
			<FormFields fields={PRODUCTS_FIELDS} />
		</FormContent>
	);
};
