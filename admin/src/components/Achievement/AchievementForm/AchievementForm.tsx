'use client';

import FileForm from '@/components/Customization/FileForm/FileForm';
import { Checkbox, Form, FormSelect, Input, Select } from '@/components/UI';
import { FormProps } from '@/components/UI/Form/Form.types';
import { BaseAchievementDto } from '@/dto';
import { toast } from 'react-toastify';
import { ACHIEVEMENT_FORM_FIELDS } from './achievementFormFields';
import AchievementFormProducts from './AchievementFormProducts/AchievementFormProducts';
import AchievementTranslationForm from './AchievementTranslationForm/AchievementTranslationForm';

interface AchievementFormProps<D extends BaseAchievementDto> extends Omit<
	FormProps<D>,
	'children'
> {
	isCreate?: boolean;
}

const AchievementForm = <D extends BaseAchievementDto>({
	isCreate,
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
						<FileForm pathname="icon" />
						{ACHIEVEMENT_FORM_FIELDS.map((f) => {
							const renderElement = () => {
								if (f.type === 'select' && f.options) {
									return (
										<FormSelect name={f.name} placeholder={f.placeholder}>
											<Select.Content>
												{f.options.map((option) => (
													<Select.Item key={option.value} value={option.value}>
														{option.label}
													</Select.Item>
												))}
											</Select.Content>
										</FormSelect>
									);
								}

								if (f.type === 'checkbox') {
									return <Checkbox label={f.label} />;
								}

								return <Input type={f.type} placeholder={f.placeholder} />;
							};

							return (
								<Form.Field
									name={f.name}
									label={f.type !== 'checkbox' ? f.label : ''}
									required={f.required}
									key={f.name}
								>
									{renderElement()}
								</Form.Field>
							);
						})}
						<AchievementFormProducts />
						<AchievementTranslationForm<D> />
						<Form.Actions>
							<Form.Reset>Reset</Form.Reset>
							<Form.Submit>{isCreate ? 'Create' : 'Update'}</Form.Submit>
						</Form.Actions>
					</>
				);
			}}
		</Form>
	);
};

export default AchievementForm;
