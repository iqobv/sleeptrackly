'use client';

import { FormContent, FormFields, TranslationForm } from '@/components/UI';
import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { createPrefixBuilder } from '@/utils/prefixBuilder.util';
import { TypeSelector } from '../../TypeSelector/TypeSelector';
import { CHALLENGE_TEMPLATE_FIELDS } from './challengeTemplateFields';
import { ChallengeTemplateGenerationForm } from './ChallengeTemplateGenerationForm';

interface ChallengeTemplateFormProps {
	children?: React.ReactNode;
	isEditing?: boolean;
	isLoading?: boolean;
	index?: number;
	isBulk?: boolean;
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
	index,
	isBulk = false,
}: ChallengeTemplateFormProps) => {
	const prefix = typeof index === 'number' ? `templates.${index}.` : '';

	const { p, ap } = createPrefixBuilder<CreateChallengeTemplateDto>(prefix);

	return (
		<FormContent
			isLoading={isLoading}
			buttonLabel={isEditing ? 'Update' : 'Create'}
			isEdit={isEditing}
			hideActions={isBulk}
		>
			<FormFields fields={CHALLENGE_TEMPLATE_FIELDS(!isEditing, prefix)} />
			<TypeSelector<CreateChallengeTemplateDto, ChallengeTemplateMetadataMap>
				metadataName={p('generationRules.metadata')}
				selectName={p('type')}
				isEditing={isEditing}
				defaultMetadataMap={CHALLENGE_TEMPLATE_DEFAULT_METADATA}
			/>
			<ChallengeTemplateGenerationForm prefix={prefix} />
			<TranslationForm<CreateChallengeTemplateDto>
				fields={(i) => [
					{
						name: p(`translations.${i}.language`),
						label: 'Language',
						type: 'text',
						placeholder: 'en, fr, es, etc.',
					},
					{
						name: p(`translations.${i}.title`),
						label: 'Title',
						type: 'text',
						placeholder: 'Challenge Title',
					},
					{
						name: p(`translations.${i}.description`),
						label: 'Description',
						type: 'textarea',
						placeholder: 'Challenge Description',
					},
				]}
				name={ap('translations')}
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
