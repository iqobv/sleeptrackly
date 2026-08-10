import { getAvailableChallenges } from '@/api/challenge/getAvaibleChallenges.api';
import { getChallengeById } from '@/api/challenge/getChallengeById.api';
import { getUserActiveChallenges } from '@/api/challenge/getUserActiveChallenges.api';

export type Challenge = Awaited<
	ReturnType<typeof getAvailableChallenges>
>[number];
export type ChallengeFull = Awaited<ReturnType<typeof getChallengeById>>;

export type ActiveChallenge = Awaited<
	ReturnType<typeof getUserActiveChallenges>
>[number];
