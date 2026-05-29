'use client';

import { deleteBundle } from '@/api';
import { PAGES } from '@/config';
import { Item } from '@/types';
import { FieldValues } from 'react-hook-form';
import DeleteButton from '../../DeleteButton/DeleteButton';
import FileForm from '../../FileForm/FileForm';
import FormContent from '../../FormContent/FormContent';
import FormFields from '../../FormFields/FormFields';
import { TranslationForm } from '../../TranslationForm';
import BundleItems from '../BundleItems/BundleItems';
import { getBundleFields } from './bundleFilds';

interface BundleFormProps {
	mediaUrl?: string;
	isAnimated?: boolean;
	buttonLabel?: string;
	isEdit?: boolean;
	initialItems?: Item[];
	id?: string;
}

const BundleForm = <T extends FieldValues>({
	mediaUrl,
	isAnimated,
	buttonLabel = 'Save',
	isEdit = false,
	initialItems,
	id,
}: BundleFormProps) => {
	const fields = getBundleFields<T>();

	return (
		<FormContent buttonLabel={buttonLabel} isEdit={isEdit}>
			{isEdit && id && (
				<DeleteButton
					id={id}
					mutationFn={deleteBundle}
					onSuccessNavigateTo={PAGES.BUNDLES}
				/>
			)}
			<FileForm
				isAnimated={isAnimated}
				mediaUrl={mediaUrl}
				label="Upload Image"
				pathname="file"
			/>
			<BundleItems initialItems={initialItems} />
			<FormFields fields={fields} />
			<TranslationForm />
		</FormContent>
	);
};

export default BundleForm;
