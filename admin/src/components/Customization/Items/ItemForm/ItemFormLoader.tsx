import { FormContentLoader, FormFieldsLoader } from '@/components/UI';
import { TranslationFormLoader } from '../../TranslationForm/TranslationFormLoader';
import { ITEM_FIELDS } from './itemFields';

interface ItemFormLoaderProps {
	isEdit?: boolean;
}

export const ItemFormLoader = ({ isEdit = false }: ItemFormLoaderProps) => (
	<FormContentLoader isEdit={isEdit}>
		<FormFieldsLoader
			fields={[
				{ label: true, type: 'file' },
				{ label: true, type: 'file' },
			]}
		/>
		<FormFieldsLoader
			fields={ITEM_FIELDS.map((f) => ({
				label: !!f.label,
				type: f.type,
			}))}
		/>
		<TranslationFormLoader />
	</FormContentLoader>
);
