'use client';

import { CreateChallengeDto } from '@/dto/challenge/challenge.dto';
import { FormField } from '@shared/form';
import { Input } from '@shared/ui';

export const TimeConsistencyFields = () => {
	return (
		<>
			<FormField<CreateChallengeDto>
				name="metadata.marginMinutes"
				label="Margin Minutes"
			>
				<Input placeholder="Margin (minutes)" type="number" />
			</FormField>
			<FormField<CreateChallengeDto>
				name="metadata.targetTime"
				label="Target Times"
			>
				<Input placeholder="Target Time (HH:mm)" type="text" />
			</FormField>
		</>
	);
};
