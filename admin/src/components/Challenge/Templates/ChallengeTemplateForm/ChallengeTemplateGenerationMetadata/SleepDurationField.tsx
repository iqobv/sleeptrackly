'use client';

import { PrimitiveArrayField } from '@/components/Challenge/PrimitiveArrayField/PrimitiveArrayField';
import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { createPrefixBuilder } from '@/utils/prefixBuilder.util';
import { MetadataFieldProps } from './MetadataFieldProps.types';

export const SleepDurationField = ({ prefix = '' }: MetadataFieldProps) => {
	const { p } = createPrefixBuilder<CreateChallengeTemplateDto>(prefix);

	return (
		<PrimitiveArrayField<number, CreateChallengeTemplateDto>
			addButtonLabel="Add Min Duration"
			defaultValue={60}
			legend="Min Duration"
			name={p('generationRules.metadata.minDurationMinutes')}
			type="number"
			placeholder="Min duration (minutes)"
			minLength={1}
		/>
	);
};
