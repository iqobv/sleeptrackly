import {
	BedtimeVarianceMetadataDto,
	SleepDurationMetadataDto,
	TimeConsistencyMetadataDto,
} from '@/dto/challenge/challenge.dto';
import { Field } from '@/types/ui/field.types';

export const SLEEP_DURATION_FIELDS: Field<SleepDurationMetadataDto>[] = [
	{
		name: 'minDurationMinutes',
		label: 'Minimum Duration (minutes)',
		type: 'number',
		placeholder: 'Enter minimum duration in minutes',
		autoComplete: 'off',
		required: true,
	},
];

export const BEDTIME_VARIANCE_FIELDS: Field<BedtimeVarianceMetadataDto>[] = [
	{
		name: 'maxVarianceMinutes',
		label: 'Maximum Variance (minutes)',
		type: 'number',
		placeholder: 'Enter maximum variance in minutes',
		autoComplete: 'off',
		required: true,
	},
];

export const TIME_CONSISTENCY_FIELDS: Field<TimeConsistencyMetadataDto>[] = [
	{
		name: 'marginMinutes',
		label: 'Margin (minutes)',
		type: 'number',
		placeholder: 'Enter margin in minutes',
		autoComplete: 'off',
		required: true,
	},
	{
		name: 'targetTime',
		label: 'Target Time (HH:mm)',
		type: 'text',
		placeholder: 'Enter target time in HH:mm format',
		autoComplete: 'off',
		required: true,
	},
];
