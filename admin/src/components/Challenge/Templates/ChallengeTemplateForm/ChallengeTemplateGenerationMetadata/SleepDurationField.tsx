'use client';

import { PrimitiveArrayField } from '@/components/Challenge/PrimitiveArrayField/PrimitiveArrayField';
import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';

export const SleepDurationField = () => {
	return (
		<PrimitiveArrayField<number, CreateChallengeTemplateDto>
			addButtonLabel="Add Min Duration"
			defaultValue={60}
			legend="Min Duration"
			name="generationRules.metadata.minDurationMinutes"
			type="number"
			placeholder="Min duration (minutes)"
			minLength={1}
		/>
	);
};
