import { z } from 'zod';

export const smtpEnvSchema = z.object({
	MAIL_HOST: z.string().min(1),
	MAIL_PORT: z.coerce.number().int().positive(),
	MAIL_USER: z.string().min(1),
	MAIL_PASSWORD: z.string().min(1),
	MAIL_FROM_NAME: z.string().min(1),
	MAIL_FROM_ADDRESS: z.string().email(),
});

export type SmtpConfig = z.infer<typeof smtpEnvSchema>;
