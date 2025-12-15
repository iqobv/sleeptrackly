import z from 'zod';
import { emailSchema, newPasswordSchema } from './baseAuth.schema';

const authSchema = emailSchema.extend(newPasswordSchema.shape);

export const RegisterSchema = authSchema.extend({
	username: z
		.string()
		.nonempty({ error: 'Username is required' })
		.min(3, { error: 'Username must be at least 3 characters' }),
});
