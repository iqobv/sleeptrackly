import { getAllChallengeTemplates } from '@/api/challenge/templates/getAllTemplates.api';

export type ChallengeTemplate = Awaited<
	ReturnType<typeof getAllChallengeTemplates>
>['items'][number];
