import { z } from 'zod';

export const SettingsSecuritySchema = z.object({
	test: z.string().nonempty({ error: 'Test is required' }),
});
