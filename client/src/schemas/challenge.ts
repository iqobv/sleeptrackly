'use client';

import { z } from 'zod';

export const ChallengeSchema = z.object({
	title: z.string().nonempty({ error: 'Title is required' }),
	description: z.string().nonempty({ error: 'Description is required' }),
});
