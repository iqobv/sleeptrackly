import { FormContentLoader, FormFieldsLoader } from '@/components/UI';
import { TranslationFormLoader } from '../../TranslationForm';
import { COLLECTION_FORM_FIELDS } from './collectionFormFields';
import { CollectionFormProductLoader } from './CollectionFormProduct/CollectionFormProductLoader';

interface CollectionFormLoaderProps {
	isEdit?: boolean;
}

export const CollectionFormLoader = ({
	isEdit = false,
}: CollectionFormLoaderProps) => (
	<FormContentLoader isEdit={isEdit}>
		<FormFieldsLoader
			fields={[
				{
					label: true,
					type: 'text',
				},
			]}
		/>
		<CollectionFormProductLoader isEdit={isEdit} />
		<FormFieldsLoader
			fields={COLLECTION_FORM_FIELDS.map((f) => ({
				label: !!f.label,
				type: f.type,
			}))}
		/>
		<TranslationFormLoader />
	</FormContentLoader>
);
