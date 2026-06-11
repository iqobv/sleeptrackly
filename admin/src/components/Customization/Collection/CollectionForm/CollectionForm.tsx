'use client';

import { FormContent, FormFields } from '@/components/UI';
import { FullCollection } from '@/types';
import { useEffect } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FileForm } from '../../FileForm/FileForm';
import { TranslationForm } from '../../TranslationForm';
import { COLLECTION_FORM_FIELDS } from './collectionFormFields';
import { CollectionFormProduct } from './CollectionFormProduct/CollectionFormProduct';

interface CollectionFormProps {
	isEdit?: boolean;
	initialData?: FullCollection;
	isLoading?: boolean;
}

export const CollectionForm = <T extends FieldValues>({
	isEdit = false,
	initialData,
	isLoading = false,
}: CollectionFormProps) => {
	const {
		formState: { errors },
	} = useFormContext<T>();

	useEffect(() => {
		if (errors.root)
			toast.error(
				errors.root.message ||
					'An error occurred. Please check the form fields.',
			);
	}, [errors]);

	return (
		<FormContent
			buttonLabel={isEdit ? 'Update Collection' : 'Create Collection'}
			isEdit={isEdit}
			isLoading={isLoading}
		>
			<FileForm
				label="Upload Icon Image"
				pathname="icon"
				mediaUrl={initialData?.iconUrl}
			/>
			<CollectionFormProduct initialData={initialData?.products} />
			<FormFields fields={COLLECTION_FORM_FIELDS} />
			<TranslationForm />
		</FormContent>
	);
};
