'use client';

import { PrimitiveArrayField } from '@/components/Challenge/PrimitiveArrayField/PrimitiveArrayField';
import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { createPrefixBuilder } from '@/utils/prefixBuilder.util';
import { MetadataFieldProps } from './MetadataFieldProps.types';

export const BedtimeVarianceField = ({ prefix = '' }: MetadataFieldProps) => {
	const { p } = createPrefixBuilder<CreateChallengeTemplateDto>(prefix);

	return (
		<PrimitiveArrayField<number, CreateChallengeTemplateDto>
			addButtonLabel="Add Variance"
			defaultValue={60}
			legend="Max Variance Minutes"
			name={p('generationRules.metadata.maxVarianceMinutes')}
			minLength={1}
			placeholder="Variance (minutes)"
			type="number"
		/>
	);
};
