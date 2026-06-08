'use client';

type IsoDate = string | Date;
type FormatLocaleTime = (iso: IsoDate) => string;

export function useFormatLocaleTime(): FormatLocaleTime;
export function useFormatLocaleTime(iso: IsoDate): string;
export function useFormatLocaleTime(iso?: IsoDate): string | FormatLocaleTime {
	const formatTime = (iso: IsoDate) =>
		new Intl.DateTimeFormat(undefined, {
			hour: 'numeric',
			minute: 'numeric',
		}).format(new Date(iso));

	if (typeof iso === 'string' || iso instanceof Date) {
		return formatTime(iso);
	}

	return formatTime;
}
