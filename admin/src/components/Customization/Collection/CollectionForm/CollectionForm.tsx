'use client';

import { FullCollection } from '@/types';
import { FormActions, FormReset, FormSubmit } from '@shared/form';
import { useEffect } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import FileForm from '../../FileForm/FileForm';
import FormFields from '../../FormFields/FormFields';
import { TranslationForm } from '../../TranslationForm';
import { COLLECTION_FORM_FIELDS } from './collectionFormFields';
import { CollectionFormProduct } from './CollectionFormProduct/CollectionFormProduct';

interface CollectionFormProps {
	isEdit?: boolean;
	initialData?: FullCollection;
}

export const CollectionForm = <T extends FieldValues>({
	isEdit = false,
	initialData,
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
		<>
			<FileForm
				label="Upload Icon Image"
				pathname="icon"
				mediaUrl={initialData?.iconUrl}
			/>
			<CollectionFormProduct initialData={initialData?.products} />
			<FormFields fields={COLLECTION_FORM_FIELDS} />
			<TranslationForm />
			<FormActions>
				{isEdit && (
					<FormReset
						disabledOnEmpty
						buttonProps={{
							variant: 'outlined',
						}}
					>
						Reset
					</FormReset>
				)}
				<FormSubmit disabledOnEmpty>
					{isEdit ? 'Update Collection' : 'Create Collection'}
				</FormSubmit>
			</FormActions>
		</>
	);
};
