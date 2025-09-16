import { z } from 'zod';

export const baseAuthSchema = z.object({
	email: z.email().nonempty({ error: 'Email is required' }),
	password: z
		.string()
		.nonempty({ error: 'Password is required' })
		.min(6, { error: 'Password must be at least 6 characters' }),
});
