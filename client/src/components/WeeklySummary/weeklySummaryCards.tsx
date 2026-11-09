'use client';

import { WeeklySummary } from '@/types/weeklySummary/weeklySummary.types';
import {
	appDayjs,
	formatUtcOffsetToLocalTime,
	transformSecondsToHours,
} from '@shared/utils';
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
		value: transformSecondsToHours(data.totalSleepDuration),
		icon: MdTimelapse,
	},
	{
		label: 'Average Sleep Time',
		value: transformSecondsToHours(data.avgSleepDuration),
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
				<p>{transformSecondsToHours(data.maxSleepDuration)}</p>
				{data.maxSleepDate && (
					<span>on {appDayjs(data.maxSleepDate).format('dddd')}</span>
				)}
			</>
		),
		icon: MdOutlineArrowUpward,
	},
	{
		label: 'Shortest Sleep',
		value: (
			<>
				<p>{transformSecondsToHours(data.minSleepDuration)}</p>
				{data.minSleepDate && (
					<span>on {appDayjs(data.minSleepDate).format('dddd')}</span>
				)}
			</>
		),
		icon: MdArrowDownward,
	},
];
