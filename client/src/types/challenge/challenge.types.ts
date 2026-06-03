import { getChallengeById, getChellenges } from '@/api';

export type Challenge = Awaited<ReturnType<typeof getChellenges>>[number];
export type ChallengeFull = Awaited<ReturnType<typeof getChallengeById>>;
export type ChallengeTask = ChallengeFull['tasks'][number];
