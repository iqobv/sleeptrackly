import { challengesQuerySchema } from '@/schemas/challenge/challengesQuery.schema';
import { z } from 'zod';

export type ChallengeQueryDto = z.infer<typeof challengesQuerySchema>;
