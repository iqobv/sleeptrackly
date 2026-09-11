'use client';

import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { createPrefixBuilder } from '@/utils/prefixBuilder.util';
import { useFormContext, useWatch } from 'react-hook-form';
import { BedtimeVarianceField } from './BedtimeVarianceField';
import { MetadataFieldProps } from './MetadataFieldProps.types';
import { SleepDurationField } from './SleepDurationField';
import { TimeConsistencyFields } from './TimeConsistencyFields';

export const ChallengeTemplateGenerationMetadata = (
	props: MetadataFieldProps,
) => {
	const { control } = useFormContext<CreateChallengeTemplateDto>();

	const { p } = createPrefixBuilder<CreateChallengeTemplateDto>(props.prefix);

	const type = useWatch({ control, name: p('type') });

	if (!type) return null;

	switch (type) {
		case ChallengeType.SLEEP_DURATION:
			return <SleepDurationField {...props} />;
		case ChallengeType.BEDTIME_VARIANCE:
			return <BedtimeVarianceField {...props} />;
		case ChallengeType.BEDTIME_CONSISTENCY:
			return <TimeConsistencyFields {...props} />;
		case ChallengeType.WAKE_TIME_CONSISTENCY:
			return <TimeConsistencyFields {...props} />;
		default:
			return null;
	}
};
