import z from 'zod';
import { passwordSchema } from './baseAuth';

export const changePasswordSchema = z.object({
	oldPassword: z.preprocess(
		(val) => (val === '' ? undefined : val),
		z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' })
			.optional()
	),
	newPassword: passwordSchema.shape.password,
});
