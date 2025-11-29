import { AUTH_ERROR_MESSAGES } from '@/constants';
import { z } from 'zod';

export const emailSchema = z.object({
	email: z
		.email()
		.refine(
			(email) => {
				const domain = email.split('@')[1];
				return domain === 'gmail.com';
			},
			{ message: AUTH_ERROR_MESSAGES.EMAIL_ERROR_MESSAGE }
		)
		.nonempty({ error: 'Email is required' }),
});

export const passwordSchema = z.object({
	password: z
		.string()
		.nonempty({ error: 'Password is required' })
		.min(8, { error: AUTH_ERROR_MESSAGES.MIN_LENGTH_ERROR_MESSAGE }),
});

export const newPasswordSchema = z.object({
	password: z
		.string()
		.nonempty({ error: 'Password is required' })
		.min(8, { error: AUTH_ERROR_MESSAGES.MIN_LENGTH_ERROR_MESSAGE })
		.refine((password) => /[A-Z]/.test(password), {
			message: AUTH_ERROR_MESSAGES.UPPERCASE_ERROR_MESSAGE,
		})
		.refine((password) => /[a-z]/.test(password), {
			message: AUTH_ERROR_MESSAGES.LOWERCASE_ERROR_MESSAGE,
		})
		.refine((password) => /[0-9]/.test(password), {
			message: AUTH_ERROR_MESSAGES.NUMBER_ERROR_MESSAGE,
		}),
});

export const baseAuthSchema = emailSchema.extend(passwordSchema.shape);
