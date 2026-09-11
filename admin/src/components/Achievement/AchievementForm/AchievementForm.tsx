'use client';

import { FileForm } from '@/components/Customization/FileForm/FileForm';
import { FormContent, FormFields } from '@/components/UI';
import { FullAchievement } from '@/types/achievement/achievement.types';
import { Form, type FormProps } from '@shared/form';
import { FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ACHIEVEMENT_FORM_FIELDS } from './achievementFormFields';
import { AchievementFormProducts } from './AchievementFormProducts/AchievementFormProducts';
import { AchievementTranslationForm } from './AchievementTranslationForm/AchievementTranslationForm';

interface AchievementFormProps<D extends FieldValues> extends Omit<
	FormProps<D>,
	'children'
> {
	isCreate?: boolean;
	iconUrl?: string;
	initData?: FullAchievement;
	isLoading?: boolean;
}

export const AchievementForm = <D extends FieldValues>({
	isCreate,
	iconUrl = '',
	initData,
	isLoading,
	...formProps
}: AchievementFormProps<D>) => {
	return (
		<Form<D> {...formProps}>
			{({ formState: { errors } }) => {
				if (errors && errors.root) {
					toast.error(errors.root.message || 'An error occurred');
				}

				return (
					<FormContent
						buttonLabel={isCreate ? 'Create Achievement' : 'Update Achievement'}
						isEdit={!isCreate}
						isLoading={isLoading}
					>
						<FileForm pathname="icon" mediaUrl={iconUrl} />
						<FormFields fields={ACHIEVEMENT_FORM_FIELDS} />
						<AchievementFormProducts initProduct={initData?.rewardProduct} />
						<AchievementTranslationForm />
					</FormContent>
				);
			}}
		</Form>
	);
};
