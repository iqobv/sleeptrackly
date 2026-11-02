import { z } from 'zod';

export const addFriendSchema = z.object({
	username: z.string().min(1, { message: 'Username is required' }),
});
