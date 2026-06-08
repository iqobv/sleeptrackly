'use client';

import { WeeklySummary } from '@/types';
import { useTransformSecondsToHours } from '@shared/hooks';
import { formatUtcOffsetToLocalTime } from '@shared/utils';
import dayjs from 'dayjs';
import { IconType } from 'react-icons';
import {
	MdArrowDownward,
	MdInfoOutline,
	MdOutlineArrowUpward,
	MdOutlineBedtime,
	MdOutlineWbSunny,
	MdTimelapse,
} from 'react-icons/md';

interface WeeklySummaryCard {
	label: string;
	value: React.ReactNode;
	icon: IconType;
}

export const WEEKLY_SUMMARY_CARDS = (
	data: WeeklySummary,
): WeeklySummaryCard[] => [
	{
		label: 'Total Sleep Time',
		value: useTransformSecondsToHours(data.totalSleepDuration),
		icon: MdTimelapse,
	},
	{
		label: 'Average Sleep Time',
		value: useTransformSecondsToHours(data.avgSleepDuration),
		icon: MdInfoOutline,
	},
	{
		label: 'Average Bedtime',
		value: formatUtcOffsetToLocalTime(data.avgBedtimeOffset),
		icon: MdOutlineBedtime,
	},
	{
		label: 'Average Wake Time',
		value: formatUtcOffsetToLocalTime(data.avgWakeTimeOffset),
		icon: MdOutlineWbSunny,
	},
	{
		label: 'Longest Sleep',
		value: (
			<>
				<p>{useTransformSecondsToHours(data.maxSleepDuration)}</p>
				{data.maxSleepDate && (
					<span>on {dayjs(data.maxSleepDate).format('dddd')}</span>
				)}
			</>
		),
		icon: MdOutlineArrowUpward,
	},
	{
		label: 'Shortest Sleep',
		value: (
			<>
				<p>{useTransformSecondsToHours(data.minSleepDuration)}</p>
				{data.minSleepDate && (
					<span>on {dayjs(data.minSleepDate).format('dddd')}</span>
				)}
			</>
		),
		icon: MdArrowDownward,
	},
];
