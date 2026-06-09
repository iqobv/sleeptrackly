import { createChallengeSchema, updateChallengeSchema } from '@/schemas';
import { z } from 'zod';

export type CreateChallengeDto = z.infer<typeof createChallengeSchema>;
export type UpdateChallengeDto = z.infer<typeof updateChallengeSchema>;
