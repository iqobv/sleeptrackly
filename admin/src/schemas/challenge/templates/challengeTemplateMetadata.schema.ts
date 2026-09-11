import { z } from 'zod';
import {
	marginMinutesSchema,
	maxVarianceMinutesSchema,
	minDurationMinutesSchema,
	targetTimeSchema,
} from '../challengeMetadata.schema';

export const sleepDurationMetadataSchema = z.object({
	minDurationMinutes: z
		.array(minDurationMinutesSchema)
		.min(1, 'At least one duration is required'),
});

export const timeConsistencyMetadataSchema = z.object({
	marginMinutes: z
		.array(marginMinutesSchema)
		.min(1, 'At least one margin is required'),
	targetTime: z
		.array(targetTimeSchema)
		.min(1, 'At least one target time is required'),
});

export const bedtimeVarianceMetadataSchema = z.object({
	maxVarianceMinutes: z
		.array(maxVarianceMinutesSchema)
		.min(1, 'At least one variance is required'),
});
