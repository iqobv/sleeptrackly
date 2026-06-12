import { FormContentLoader, FormFieldsLoader } from '@/components/UI';
import { FileFormLoader } from '../../FileForm/FileFormLoader';
import { TranslationFormLoader } from '../../TranslationForm/TranslationFormLoader';
import { BundleItemsLoader } from '../BundleItems/BundleItemsLoader';
import { BUNDLE_FIELDS } from './bundleFilds';

interface BundleFormLoaderProps {
	isEdit?: boolean;
}

export const BundleFormLoader = ({ isEdit = false }: BundleFormLoaderProps) => (
	<FormContentLoader isEdit={isEdit}>
		<FileFormLoader isEdit={isEdit} />
		<BundleItemsLoader isEdit={isEdit} />
		<FormFieldsLoader
			fields={BUNDLE_FIELDS.map((f) => ({
				label: !!f.label,
				type: f.type,
			}))}
		/>
		<TranslationFormLoader />
	</FormContentLoader>
);
