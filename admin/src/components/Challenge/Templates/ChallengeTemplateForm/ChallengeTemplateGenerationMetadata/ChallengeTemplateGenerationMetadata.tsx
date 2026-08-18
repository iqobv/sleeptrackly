'use client';

import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { useFormContext, useWatch } from 'react-hook-form';
import { BedtimeVarianceField } from './BedtimeVarianceField';
import { SleepDurationField } from './SleepDurationField';
import { TimeConsistencyFields } from './TimeConsistencyFields';

export const ChallengeTemplateGenerationMetadata = () => {
	const { control } = useFormContext<CreateChallengeTemplateDto>();
	const type = useWatch({ control, name: 'type' });

	if (!type) return null;

	switch (type) {
		case ChallengeType.SLEEP_DURATION:
			return <SleepDurationField />;
		case ChallengeType.BEDTIME_VARIANCE:
			return <BedtimeVarianceField />;
		case ChallengeType.BEDTIME_CONSISTENCY:
			return <TimeConsistencyFields />;
		case ChallengeType.WAKE_TIME_CONSISTENCY:
			return <TimeConsistencyFields />;
		default:
			return null;
	}
};
