'use client';

import { PrimitiveArrayField } from '@/components/Challenge/PrimitiveArrayField/PrimitiveArrayField';
import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';

export const BedtimeVarianceField = () => {
	return (
		<PrimitiveArrayField<number, CreateChallengeTemplateDto>
			addButtonLabel="Add Variance"
			defaultValue={60}
			legend="Max Variance Minutes"
			name="generationRules.metadata.maxVarianceMinutes"
			minLength={1}
			placeholder="Variance (minutes)"
			type="number"
		/>
	);
};
