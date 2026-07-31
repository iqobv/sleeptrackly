import { getChallengeById, getChallenges } from '@/api/challenge/challenge.api';

export type Challenge = Awaited<ReturnType<typeof getChallenges>>[number];
export type ChallengeFull = Awaited<ReturnType<typeof getChallengeById>>;
// export type ChallengeTask = ChallengeFull['tasks'][number];
