import { UpdateChallengeDto } from '@/dto/challenge/challenge.dto';
import { ChallengeField } from '@/types/challenge/challengeField.types';

export const UPDATE_CHALLENGE_FIELDS: ChallengeField<UpdateChallengeDto>[] = [
	{
		name: 'title',
		label: 'Title',
		type: 'text',
		componentType: 'input',
		placeholder: 'Create a title',
	},
	{
		name: 'description',
		label: 'Description',
		type: 'text',
		componentType: 'textarea',
		placeholder: 'Create a description',
	},
];
