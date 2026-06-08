'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function useTransformSecondsToHours(): (seconds: number) => string;
export function useTransformSecondsToHours(seconds: number): string;
export function useTransformSecondsToHours(
	seconds?: number,
): string | ((seconds: number) => string) {
	const transform = (value: number) => {
		const dur = dayjs.duration(value, 'seconds');

		const totalHours = Math.floor(dur.asHours());
		const minutes = dur.minutes();

		return `${totalHours}h ${minutes}m`;
	};

	if (typeof seconds === 'number') {
		return transform(seconds);
	}

	return transform;
}
