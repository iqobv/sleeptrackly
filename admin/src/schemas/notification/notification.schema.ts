import z from 'zod';

export const createNotificationSchema = z.object({
	isGlobal: z.boolean(),
	showInApp: z.boolean(),
	isEmail: z.boolean().optional(),
	title: z.string().min(5, 'Title is required'),
	body: z.string().min(10, 'Body is required'),
	redirectUrl: z.string().optional(),
});
