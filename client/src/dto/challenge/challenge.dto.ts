import { CreateChallengeSchema, UpdateSchema } from '@/schemas';
import { z } from 'zod';

export type CreateChallengeDto = z.infer<typeof CreateChallengeSchema>;
export type UpdateChallengeDto = z.infer<typeof UpdateSchema>;
