import { UpdateChallengeDto } from '@/dto';
import { ChallengeField } from '@/types';

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
