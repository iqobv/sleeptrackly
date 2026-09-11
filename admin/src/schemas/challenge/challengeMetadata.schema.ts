import { z } from 'zod';

export const minDurationMinutesSchema = z.coerce
	.number()
	.int()
	.positive('Min duration must be a positive integer');

export const marginMinutesSchema = z.coerce
	.number()
	.int()
	.positive('Margin must be a positive integer');

export const targetTimeSchema = z
	.string()
	.regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)');

export const maxVarianceMinutesSchema = z.coerce
	.number()
	.int()
	.positive('Max variance must be a positive integer');

export const sleepDurationMetadataSchema = z.object({
	minDurationMinutes: minDurationMinutesSchema,
});

export const timeConsistencyMetadataSchema = z.object({
	marginMinutes: marginMinutesSchema,
	targetTime: targetTimeSchema,
});

export const bedtimeVarianceMetadataSchema = z.object({
	maxVarianceMinutes: maxVarianceMinutesSchema,
});
