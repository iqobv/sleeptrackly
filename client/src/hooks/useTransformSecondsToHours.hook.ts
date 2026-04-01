'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function useTransformSecondsToHours(): (seconds: number) => string;
export function useTransformSecondsToHours(seconds: number): string;
export function useTransformSecondsToHours(
	seconds?: number,
): string | ((seconds: number) => string) {
	const transform = (value: number) =>
		dayjs.duration(value, 'seconds').format('H[h] m[m]');

	if (typeof seconds === 'number') {
		return transform(seconds);
	}

	return transform;
}
