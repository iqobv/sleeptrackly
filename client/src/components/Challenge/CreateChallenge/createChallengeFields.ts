import { CreateChallengeDto } from '@/dto/challenge/challenge.dto';
import { ChallengeField } from '@/types/challenge/challengeField.types';
import { ChallengeFrequency } from '@/types/challenge/challengeFrequncy.types';
import { Option } from '@/types/ui/option.types';

const options: Option[] = [
	{
		label: 'Daily',
		value: ChallengeFrequency.DAILY,
	},
	{
		label: 'Weekly',
		value: ChallengeFrequency.WEEKLY,
	},
];

export const CREATE_CHALLENGE_FIELDS: ChallengeField<CreateChallengeDto>[] = [
	{
		name: 'title',
		label: 'Title',
		type: 'text',
		placeholder: 'Create a title',
		componentType: 'input',
	},
	{
		name: 'description',
		label: 'Description',
		placeholder: 'Create a description',
		type: 'text',
		componentType: 'textarea',
	},
	{
		name: 'frequency',
		label: 'Frequency',
		type: 'text',
		componentType: 'list',
		placeholder: 'Select a frequency',
		options,
	},
	{
		name: 'startDate',
		label: 'Start Date',
		type: 'datetime-local',
		placeholder: 'Select a start date',
		componentType: 'input',
	},
	{
		name: 'endDate',
		label: 'End Date',
		type: 'datetime-local',
		placeholder: 'Select an end date',
		componentType: 'input',
	},
	{
		name: 'tasksOptions.value',
		type: 'number',
		label: 'Value',
		placeholder: 'Enter a value',
		componentType: 'input',
	},
	{
		name: 'tasksOptions.increment',
		type: 'number',
		label: 'Increment',
		placeholder: 'Enter an increment',
		componentType: 'input',
	},
	{
		name: 'tasksOptions.description',
		type: 'text',
		label: 'Description',
		placeholder: 'Enter a description',
		componentType: 'input',
	},
];
