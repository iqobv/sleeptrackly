'use client';

import { deleteItem } from '@/api';
import { PAGES } from '@/config';
import { FieldValues } from 'react-hook-form';
import DeleteButton from '../../DeleteButton/DeleteButton';
import FileForm from '../../FileForm/FileForm';
import FormContent from '../../FormContent/FormContent';
import FormFields from '../../FormFields/FormFields';
import TranslationForm from '../../TranslationForm/TranslationForm';
import { getItemsFields } from './itemFields';

interface ItemFormProps {
	mediaUrl?: string;
	previewUrl?: string;
	isAnimated?: boolean;
	buttonLabel?: string;
	isEdit?: boolean;
	id?: string;
}

const ItemForm = <T extends FieldValues>({
	mediaUrl,
	previewUrl,
	isAnimated,
	buttonLabel = 'Save',
	isEdit = false,
	id,
}: ItemFormProps) => {
	const fields = getItemsFields<T>();

	return (
		<FormContent buttonLabel={buttonLabel} isEdit={isEdit}>
			{isEdit && id && (
				<DeleteButton
					id={id}
					mutationFn={deleteItem}
					onSuccessNavigateTo={PAGES.ITEMS}
				/>
			)}
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
			<FormFields fields={fields} />
			<TranslationForm />
		</FormContent>
	);
};

export default ItemForm;
