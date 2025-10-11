import { z } from 'zod';

export const emailSchema = z.object({
	email: z
		.email()
		.refine(
			(email) => {
				const domain = email.split('@')[1];
				return domain === 'gmail.com';
			},
			{ message: 'Only gmail.com addresses are allowed.' },
		)
		.nonempty({ error: 'Email is required' }),
});

export const passwordSchema = z.object({
	password: z
		.string()
		.nonempty({ error: 'Password is required' })
		.min(6, { error: 'Password must be at least 6 characters' }),
});

export const baseAuthSchema = emailSchema.extend(passwordSchema.shape);
