import { CreateChallengeSchema, UpdateSchema } from '@/schemas';
import { z } from 'zod';

export interface CreateChallengeDto
	extends z.infer<typeof CreateChallengeSchema> {}

export interface UpdateChallengeDto extends z.infer<typeof UpdateSchema> {}
