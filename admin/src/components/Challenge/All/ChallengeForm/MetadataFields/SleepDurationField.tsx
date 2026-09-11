'use client';

import { CreateChallengeDto } from '@/dto/challenge/challenge.dto';
import { FormField } from '@shared/form';
import { Input } from '@shared/ui';

export const SleepDurationField = () => {
	return (
		<FormField<CreateChallengeDto>
			name="metadata.minDurationMinutes"
			label="Min Duration"
		>
			<Input placeholder="Min duration (minutes)" type="number" />
		</FormField>
	);
};
