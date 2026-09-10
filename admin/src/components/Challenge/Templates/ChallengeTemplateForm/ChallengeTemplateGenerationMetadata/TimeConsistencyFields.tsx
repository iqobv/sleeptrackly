'use client';

import { PrimitiveArrayField } from '@/components/Challenge/PrimitiveArrayField/PrimitiveArrayField';
import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { createPrefixBuilder } from '@/utils/prefixBuilder.util';
import { MetadataFieldProps } from './MetadataFieldProps.types';

export const TimeConsistencyFields = ({ prefix = '' }: MetadataFieldProps) => {
	const { p } = createPrefixBuilder<CreateChallengeTemplateDto>(prefix);

	return (
		<>
			<PrimitiveArrayField<number, CreateChallengeTemplateDto>
				addButtonLabel="Add Margin"
				defaultValue={60}
				legend="Margin Minutes"
				name={p('generationRules.metadata.marginMinutes')}
				type="number"
				placeholder="Margin (minutes)"
				minLength={1}
			/>
			<PrimitiveArrayField<string, CreateChallengeTemplateDto>
				addButtonLabel="Add Target Time"
				defaultValue="00:00"
				legend="Target Times"
				name={p('generationRules.metadata.targetTime')}
				type="text"
				placeholder="Target Time (HH:mm)"
				minLength={1}
			/>
		</>
	);
};
