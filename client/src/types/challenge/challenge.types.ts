import { getChallengeById, getChallenges } from '@/api/challenge/challenge.api';
import { getUserActiveChallenges } from '@/api/challenge/getUserActiveChallenges.api';

export type Challenge = Awaited<ReturnType<typeof getChallenges>>[number];
export type ChallengeFull = Awaited<ReturnType<typeof getChallengeById>>;
// export type ChallengeTask = ChallengeFull['tasks'][number];

export type ActiveChallenge = Awaited<
	ReturnType<typeof getUserActiveChallenges>
>[number];
