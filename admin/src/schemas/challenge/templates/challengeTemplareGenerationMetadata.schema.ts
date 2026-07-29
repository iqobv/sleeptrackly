import { z } from 'zod';

export const sleepDurationMetadataSchema = z.object({
	minDurationMinutes: z
		.array(z.number().int().positive())
		.min(1, 'At least one duration is required'),
});

export const timeConsistencyMetadataSchema =
	z.object({
		marginMinutes: z
			.array(z.number().int().positive())
			.min(1, 'At least one margin is required'),
		targetTime: z
			.array(z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'))
			.min(1, 'At least one target time is required'),
	});

export const bedtimeVarianceMetadataSchema =
	z.object({
		maxVarianceMinutes: z
			.array(z.number().int().positive())
			.min(1, 'At least one variance is required'),
	});
