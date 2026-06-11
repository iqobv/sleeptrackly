'use client';

import { FormContent, FormFields } from '@/components/UI';
import { Item } from '@/types';
import { FileForm } from '../../FileForm/FileForm';
import { TranslationForm } from '../../TranslationForm';
import { BundleItems } from '../BundleItems/BundleItems';
import { BUNDLE_FIELDS } from './bundleFilds';

interface BundleFormProps {
	mediaUrl?: string;
	isAnimated?: boolean;
	isEdit?: boolean;
	initialItems?: Item[];
	isLoading?: boolean;
}

export const BundleForm = ({
	mediaUrl,
	isAnimated,
	isEdit = false,
	initialItems,
	isLoading = false,
}: BundleFormProps) => {
	return (
		<FormContent
			buttonLabel={isEdit ? 'Update Bundle' : 'Create Bundle'}
			isEdit={isEdit}
			isLoading={isLoading}
		>
			<FileForm
				isAnimated={isAnimated}
				mediaUrl={mediaUrl}
				label="Upload Image"
				pathname="file"
			/>
			<BundleItems initialItems={initialItems} />
			<FormFields fields={BUNDLE_FIELDS} />
			<TranslationForm />
		</FormContent>
	);
};
