import { z } from 'zod';

export const timezoneSchema = z.string().refine(
	(value) => {
		try {
			Intl.DateTimeFormat(undefined, { timeZone: value });
			return true;
		} catch {
			return false;
		}
	},
	{
		error: 'Invalid timezone. Please provide a valid IANA timezone string.',
	},
);

export const syncTimezoneSchema = z.object({
	timezone: timezoneSchema,
});
