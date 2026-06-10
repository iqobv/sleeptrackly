import { FormContentLoader, FormFieldsLoader } from '@/components/UI';
import { SkeletonLoader } from '@shared/ui';
import { PRODUCTS_FIELDS } from './productFields';

interface ProductFormLoaderProps {
	isEdit?: boolean;
}

export const ProductFormLoader = ({ isEdit }: ProductFormLoaderProps) => (
	<FormContentLoader isEdit={isEdit}>
		<SkeletonLoader height="2.75rem" width="11.25rem" />
		<FormFieldsLoader
			fields={PRODUCTS_FIELDS.map((f) => ({
				label: !!f.label,
				type: f.type,
			}))}
		/>
	</FormContentLoader>
);
