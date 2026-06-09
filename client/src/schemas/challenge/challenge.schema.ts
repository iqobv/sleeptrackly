'use client';

import { z } from 'zod';

export const challengeSchema = z.object({
	title: z.string().nonempty({ error: 'Title is required' }),
	description: z.string().nonempty({ error: 'Description is required' }),
});
