'use client';

import { CreateChallengeDto } from '@/dto/challenge/challenge.dto';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { useFormContext, useWatch } from 'react-hook-form';
import { BedtimeVarianceField } from './MetadataFields/BedtimeVarianceField';
import { SleepDurationField } from './MetadataFields/SleepDurationField';
import { TimeConsistencyFields } from './MetadataFields/TimeConsistencyFields';

export const ChallengeMetadata = () => {
	const { control } = useFormContext<CreateChallengeDto>();
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
