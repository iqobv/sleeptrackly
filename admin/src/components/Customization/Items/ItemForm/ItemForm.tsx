'use client';

import { FormContent, FormFields } from '@/components/UI';
import { FileForm } from '../../FileForm/FileForm';
import { TranslationForm } from '../../TranslationForm';
import { ITEM_FIELDS } from './itemFields';

interface ItemFormProps {
	mediaUrl?: string;
	previewUrl?: string;
	isAnimated?: boolean;
	isEdit?: boolean;
	isLoading?: boolean;
}

export const ItemForm = ({
	mediaUrl,
	previewUrl,
	isAnimated,
	isEdit = false,
	isLoading = false,
}: ItemFormProps) => {
	return (
		<FormContent
			buttonLabel={isEdit ? 'Update Item' : 'Create Item'}
			isEdit={isEdit}
			isLoading={isLoading}
		>
			<FileForm
				isAnimated={isAnimated}
				mediaUrl={mediaUrl}
				pathname="media"
				label="Upload Media"
			/>
			<FileForm
				isAnimated={isAnimated}
				mediaUrl={previewUrl}
				pathname="preview"
				label="Upload Preview"
			/>
			<FormFields fields={ITEM_FIELDS} />
			<TranslationForm />
		</FormContent>
	);
};
