'use client';

import { CreateChallengeDto } from '@/dto/challenge/challenge.dto';
import { FormField } from '@shared/form';
import { Input } from '@shared/ui';

export const BedtimeVarianceField = () => {
	return (
		<FormField<CreateChallengeDto>
			name="metadata.maxVarianceMinutes"
			label="Max Variance Minutes"
		>
			<Input placeholder="Variance (minutes)" type="number" />
		</FormField>
	);
};
