import { createChallengeSchema } from '@/schemas/challenge/createChallenge.schema';
import { updateChallengeSchema } from '@/schemas/challenge/updateChallenge.schema';
import { z } from 'zod';

export type CreateChallengeDto = z.infer<typeof createChallengeSchema>;
export type UpdateChallengeDto = z.infer<typeof updateChallengeSchema>;
