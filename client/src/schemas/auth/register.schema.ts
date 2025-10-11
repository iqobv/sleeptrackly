import z from 'zod';
import { baseAuthSchema } from './baseAuth.schema';

export const RegisterSchema = baseAuthSchema.extend({
	username: z
		.string()
		.nonempty({ error: 'Username is required' })
		.min(3, { error: 'Username must be at least 3 characters' }),
});
