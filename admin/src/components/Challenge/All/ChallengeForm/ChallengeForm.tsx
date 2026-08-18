'use client';

import { FormContent, FormFields, TranslationForm } from '@/components/UI';
import { FormProduct } from '@/components/UI/FormProduct/FormProduct';
import { CreateChallengeDto } from '@/dto/challenge/challenge.dto';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { Product } from '@/types/customization/product/product.types';
import { TypeSelector } from '../../TypeSelector/TypeSelector';
import { ChallengeMetadata } from './ChallengeMetadata';
import { CHALLENGE_FIELDS } from './challengeFormFields';
import { MetadataDefaultMap } from './discriminatedMap.types';

interface ChallengeFormProps {
	children?: React.ReactNode;
	isEditing?: boolean;
	isLoading?: boolean;
	initProduct?: Product | null;
}

const CHALLENGE_DEFAULT_METADATA: MetadataDefaultMap<
	CreateChallengeDto,
	'metadata'
> = {
	[ChallengeType.SLEEP_DURATION]: { minDurationMinutes: 60 },
	[ChallengeType.BEDTIME_VARIANCE]: { maxVarianceMinutes: 60 },
	[ChallengeType.BEDTIME_CONSISTENCY]: {
		marginMinutes: 60,
		targetTime: '00:00',
	},
	[ChallengeType.WAKE_TIME_CONSISTENCY]: {
		marginMinutes: 60,
		targetTime: '00:00',
	},
};

export const ChallengeForm = ({
	children,
	isEditing,
	isLoading,
	initProduct,
}: ChallengeFormProps) => {
	return (
		<FormContent
			isLoading={isLoading}
			buttonLabel={isEditing ? 'Update' : 'Create'}
			isEdit={isEditing}
		>
			<FormFields fields={CHALLENGE_FIELDS(!isEditing)} />
			<TypeSelector<
				CreateChallengeDto,
				MetadataDefaultMap<CreateChallengeDto, 'metadata'>
			>
				metadataName="metadata"
				selectName="type"
				isEditing={isEditing}
				defaultMetadataMap={CHALLENGE_DEFAULT_METADATA}
			/>
			<ChallengeMetadata />
			<FormProduct<CreateChallengeDto>
				name="rewardProductId"
				initProduct={initProduct}
			/>
			<TranslationForm<CreateChallengeDto>
				defaultValues={[
					{
						language: '',
						title: '',
						description: '',
					},
				]}
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
			/>
			{children}
		</FormContent>
	);
};
