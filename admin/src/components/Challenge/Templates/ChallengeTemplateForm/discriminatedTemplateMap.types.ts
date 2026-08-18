import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { ChallengeType } from '@/types/challenge/challengeType.types';

export type TemplateMetadataMap = {
	[K in ChallengeType]: Extract<
		CreateChallengeTemplateDto,
		{ type: K }
	>['generationRules']['metadata'];
};
