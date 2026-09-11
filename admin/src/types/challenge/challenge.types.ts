import { getAllChallenges } from '@/api/challenge/getAllChallenges.api';
import { getAllChallengeTemplates } from '@/api/challenge/templates/getAllTemplates.api';

export type ChallengeTemplate = Awaited<
	ReturnType<typeof getAllChallengeTemplates>
>['items'][number];

export type Challenge = Awaited<
	ReturnType<typeof getAllChallenges>
>['items'][number];
