'use client';

import { FormContent, FormFields, TranslationForm } from '@/components/UI';
import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { TypeSelector } from '../../TypeSelector/TypeSelector';
import { CHALLENGE_TEMPLATE_FIELDS } from './challengeTemplateFields';
import { ChallengeTemplateGenerationForm } from './ChallengeTemplateGenerationForm';

interface ChallengeTemplateFormProps {
	children?: React.ReactNode;
	isEditing?: boolean;
	isLoading?: boolean;
}

type ChallengeTemplateMetadataMap = {
	[K in ChallengeType]: Extract<
		CreateChallengeTemplateDto,
		{ type: K }
	>['generationRules']['metadata'];
};

const CHALLENGE_TEMPLATE_DEFAULT_METADATA: ChallengeTemplateMetadataMap = {
	[ChallengeType.SLEEP_DURATION]: { minDurationMinutes: [60] },
	[ChallengeType.BEDTIME_VARIANCE]: { maxVarianceMinutes: [60] },
	[ChallengeType.BEDTIME_CONSISTENCY]: {
		marginMinutes: [60],
		targetTime: ['00:00'],
	},
	[ChallengeType.WAKE_TIME_CONSISTENCY]: {
		marginMinutes: [60],
		targetTime: ['00:00'],
	},
};

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
			<TypeSelector<CreateChallengeTemplateDto, ChallengeTemplateMetadataMap>
				metadataName="generationRules.metadata"
				selectName="type"
				isEditing={isEditing}
				defaultMetadataMap={CHALLENGE_TEMPLATE_DEFAULT_METADATA}
			/>
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
