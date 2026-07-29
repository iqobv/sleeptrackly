'use client';

import { FormContent, FormFields, TranslationForm } from '@/components/UI';
import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { CHALLENGE_TEMPLATE_FIELDS } from './challengeTemplateFields';
import { ChallengeTemplateGenerationForm } from './ChallengeTemplateGenerationForm';
import { TypeSelector } from './TypeSelector';

interface ChallengeTemplateFormProps {
	children?: React.ReactNode;
	isEditing?: boolean;
	isLoading?: boolean;
}

export const ChallengeTemplateForm = ({
	children,
	isLoading,
	isEditing,
}: ChallengeTemplateFormProps) => {
	return (
		<FormContent
			isLoading={isLoading}
			buttonLabel={isEditing ? 'Update' : 'Create'}
			isEdit={isEditing}
		>
			<FormFields fields={CHALLENGE_TEMPLATE_FIELDS(!isEditing)} />
			<TypeSelector isEditing={isEditing} />
			<ChallengeTemplateGenerationForm />
			<TranslationForm<CreateChallengeTemplateDto>
				fields={(index) => [
					{
						name: `translations.${index}.language`,
						label: 'Language',
						type: 'text',
						placeholder: 'en, fr, es, etc.',
					},
					{
						name: `translations.${index}.title`,
						label: 'Title',
						type: 'text',
						placeholder: 'Challenge Title',
					},
					{
						name: `translations.${index}.description`,
						label: 'Description',
						type: 'textarea',
						placeholder: 'Challenge Description',
					},
				]}
				name="translations"
				defaultValues={[
					{
						language: '',
						title: '',
						description: '',
					},
				]}
			/>
			{children}
		</FormContent>
	);
};
