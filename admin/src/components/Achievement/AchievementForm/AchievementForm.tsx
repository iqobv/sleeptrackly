'use client';

import FileForm from '@/components/Customization/FileForm/FileForm';
import {
	Checkbox,
	Form,
	FormActions,
	FormField,
	FormReset,
	FormSelect,
	FormSubmit,
	Input,
	SelectContent,
	SelectItem,
} from '@/components/UI';
import { FormProps } from '@/components/UI/Form/Form.types';
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
}

export const AchievementForm = <D extends FieldValues>({
	isCreate,
	iconUrl = '',
	...formProps
}: AchievementFormProps<D>) => {
	return (
		<Form<D> {...formProps}>
			{({ formState: { errors } }) => {
				if (errors && errors.root) {
					toast.error(errors.root.message || 'An error occurred');
				}

				return (
					<>
						<FileForm pathname="icon" mediaUrl={iconUrl} />
						{ACHIEVEMENT_FORM_FIELDS.map((f) => {
							const renderElement = () => {
								if (f.type === 'select' && f.options) {
									return (
										<FormSelect name={f.name} placeholder={f.placeholder}>
											<SelectContent>
												{f.options.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</FormSelect>
									);
								}

								if (f.type === 'checkbox') {
									return <Checkbox label={f.label} />;
								}

								return <Input type={f.type} placeholder={f.placeholder} />;
							};

							return (
								<FormField
									name={f.name}
									label={f.type !== 'checkbox' ? f.label : ''}
									required={f.required}
									key={f.name}
								>
									{renderElement()}
								</FormField>
							);
						})}
						<AchievementFormProducts />
						<AchievementTranslationForm />
						<FormActions>
							<FormReset>Reset</FormReset>
							<FormSubmit>{isCreate ? 'Create' : 'Update'}</FormSubmit>
						</FormActions>
					</>
				);
			}}
		</Form>
	);
};
