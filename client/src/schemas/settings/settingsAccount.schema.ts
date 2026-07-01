import { z } from 'zod';

export const SettingsAccountSchema = z.object({
	username: z
		.string()
		.nonempty({ error: 'Username is required' })
		.min(3, { error: 'Username must be at least 3 characters' }),
});
