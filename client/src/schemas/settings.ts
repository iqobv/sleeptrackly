import z from 'zod';

export const SettingsSchema = z.object({
	email: z.email().nonempty({ error: 'Email is required' }),
	username: z
		.string()
		.nonempty({ error: 'Username is required' })
		.min(3, { error: 'Username must be at least 3 characters' }),
});
