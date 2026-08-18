'use client';

import { PrimitiveArrayField } from '@/components/Challenge/PrimitiveArrayField/PrimitiveArrayField';
import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';

export const TimeConsistencyFields = () => {
	return (
		<>
			<PrimitiveArrayField<number, CreateChallengeTemplateDto>
				addButtonLabel="Add Margin"
				defaultValue={60}
				legend="Margin Minutes"
				name="generationRules.metadata.marginMinutes"
				type="number"
				placeholder="Margin (minutes)"
				minLength={1}
			/>
			<PrimitiveArrayField<string, CreateChallengeTemplateDto>
				addButtonLabel="Add Target Time"
				defaultValue="00:00"
				legend="Target Times"
				name="generationRules.metadata.targetTime"
				type="text"
				placeholder="Target Time (HH:mm)"
				minLength={1}
			/>
		</>
	);
};
